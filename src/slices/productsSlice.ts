import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { Product } from '../types'

const BASE = 'https://fakestoreapi.com'

export const fetchProducts = createAsyncThunk<Product[], { category?: string } | undefined>(
  'products/fetchAll',
  async (arg) => {
    const url = arg?.category && arg.category !== 'all'
      ? `${BASE}/products/category/${encodeURIComponent(arg.category)}`
      : `${BASE}/products`
    const res = await fetch(url)
    if (!res.ok) throw new Error('상품을 불러오지 못했습니다.')
    return await res.json() as Product[]
  }
)

export const fetchCategories = createAsyncThunk<string[]>(
  'products/fetchCategories',
  async () => {
    const res = await fetch(`${BASE}/products/categories`)
    if (!res.ok) throw new Error('카테고리를 불러오지 못했습니다.')
    return await res.json() as string[]
  }
)

type State = {
  allItems: Product[]
  items: Product[]
  categories: string[]
  status: 'idle' | 'loading' | 'failed'
  categoryFilter: string
}

const initialState: State = { allItems: [], items: [], categories: [], status: 'idle', categoryFilter: 'all' }

const slice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCategoryFilter(state, action) {
      state.categoryFilter = action.payload
      // 클라이언트 사이드 필터링
      if (action.payload === 'all') {
        state.items = state.allItems
      } else {
        state.items = state.allItems.filter(item => item.category === action.payload)
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, (s) => { s.status = 'loading' })
      .addCase(fetchProducts.fulfilled, (s, a) => { 
        s.status = 'idle'
        s.allItems = a.payload
        // 현재 필터에 따라 items 설정
        if (s.categoryFilter === 'all') {
          s.items = a.payload
        } else {
          s.items = a.payload.filter(item => item.category === s.categoryFilter)
        }
      })
      .addCase(fetchProducts.rejected, (s) => { s.status = 'failed' })
      .addCase(fetchCategories.fulfilled, (s, a) => { s.categories = a.payload })
  }
})

export const { setCategoryFilter } = slice.actions
export default slice.reducer
