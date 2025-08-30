import { Route, Routes, Navigate } from 'react-router-dom'
import Header from './components/Header'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import LoginPage from './pages/LoginPage'
import CheckoutPage from './pages/CheckoutPage'
import CheckoutSuccessPage from './pages/CheckoutSuccessPage'
import { useAppSelector } from './store/hooks'

function PrivateRoute({ children }: { children: JSX.Element }) {
  const user = useAppSelector(s => s.auth.user)
  return user ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <div>
      <Header />
      <main className="container py-6">
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/checkout" element={
            <PrivateRoute>
              <CheckoutPage />
            </PrivateRoute>
          } />
          <Route path="/checkout-success" element={
            <PrivateRoute>
              <CheckoutSuccessPage />
            </PrivateRoute>
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  )
}
