import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { CartItem, Product } from '../types'

type State = {
  items: CartItem[]
}
const initialState: State = { items: [] }

const slice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const p = action.payload
      const existing = state.items.find(i => i.id === p.id)
      if (existing) existing.quantity += 1
      else state.items.push({ id: p.id, title: p.title, price: p.price, image: p.image, quantity: 1 })
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter(i => i.id !== action.payload)
    },
    increaseQty(state, action: PayloadAction<number>) {
      const it = state.items.find(i => i.id === action.payload); if (it) it.quantity += 1
    },
    decreaseQty(state, action: PayloadAction<number>) {
      const it = state.items.find(i => i.id === action.payload); if (!it) return
      it.quantity -= 1; if (it.quantity <= 0) state.items = state.items.filter(i => i.id !== action.payload)
    },
    clearCart(state) { state.items = [] }
  }
})

export const { addToCart, removeFromCart, increaseQty, decreaseQty, clearCart } = slice.actions
export default slice.reducer
