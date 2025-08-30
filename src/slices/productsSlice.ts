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
  items: Product[]
  categories: string[]
  status: 'idle' | 'loading' | 'failed'
  categoryFilter: string
}

const initialState: State = { items: [], categories: [], status: 'idle', categoryFilter: 'all' }

const slice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCategoryFilter(state, action) {
      state.categoryFilter = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, (s) => { s.status = 'loading' })
      .addCase(fetchProducts.fulfilled, (s, a) => { s.status = 'idle'; s.items = a.payload })
      .addCase(fetchProducts.rejected, (s) => { s.status = 'failed' })
      .addCase(fetchCategories.fulfilled, (s, a) => { s.categories = a.payload })
  }
})

export const { setCategoryFilter } = slice.actions
export default slice.reducer
