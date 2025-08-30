import { configureStore } from '@reduxjs/toolkit'
import auth from '../slices/authSlice'
import products from '../slices/productsSlice'
import cart from '../slices/cartSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

const PERSIST_KEY = 'shop-cart-v1'

const preloadedCart = (() => {
  try {
    const raw = localStorage.getItem(PERSIST_KEY)
    return raw ? JSON.parse(raw) : undefined
  } catch { return undefined }
})()

export const store = configureStore({
  reducer: { auth, products, cart },
  preloadedState: preloadedCart ? { cart: preloadedCart } : undefined
})

store.subscribe(() => {
  const state = store.getState()
  localStorage.setItem(PERSIST_KEY, JSON.stringify(state.cart))
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
