import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { clearCart, decreaseQty, increaseQty, removeFromCart } from '../slices/cartSlice'

export default function CartPage() {
  const items = useAppSelector(s => s.cart.items)
  const user = useAppSelector(s => s.auth.user)
  const dispatch = useAppDispatch()
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
        <svg className="w-24 h-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 7H6L5 9z" />
        </svg>
        <div className="text-center">
          <h2 className="text-2xl font-light mb-2">YOUR BAG IS EMPTY</h2>
          <p className="text-gray-500 mb-6">Add some items to get started</p>
          <Link to="/" className="bg-black text-white px-8 py-3 text-sm font-medium tracking-wide hover:bg-gray-800 transition-colors">
            CONTINUE SHOPPING
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors mb-6">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          CONTINUE SHOPPING
        </Link>
        <h1 className="text-3xl font-light">SHOPPING BAG ({items.length} ITEM{items.length !== 1 ? 'S' : ''})</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {items.map(item => (
            <div key={item.id} className="flex gap-4 pb-6 border-b border-gray-200">
              <div className="w-24 h-32 bg-gray-50 flex items-center justify-center">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = `https://via.placeholder.com/100x130/f8f9fa/6c757d?text=IMG`
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">{item.title}</h3>
                <p className="text-lg font-medium mb-3">${item.price}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">QTY:</span>
                    <div className="flex items-center border border-gray-300">
                      <button 
                        className="px-3 py-1 hover:bg-gray-100 transition-colors" 
                        onClick={() => dispatch(decreaseQty(item.id))}
                      >
                        -
                      </button>
                      <span className="px-3 py-1 min-w-[40px] text-center">{item.quantity}</span>
                      <button 
                        className="px-3 py-1 hover:bg-gray-100 transition-colors" 
                        onClick={() => dispatch(increaseQty(item.id))}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button 
                    className="text-sm text-gray-500 hover:text-black transition-colors" 
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    REMOVE
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-6 sticky top-4">
            <h3 className="text-lg font-medium mb-4">ORDER SUMMARY</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span>Subtotal ({items.reduce((sum, i) => sum + i.quantity, 0)} items)</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {user ? (
                <Link 
                  to="/checkout" 
                  className="block w-full bg-black text-white py-3 text-center text-sm font-medium tracking-wide hover:bg-gray-800 transition-colors"
                >
                  CHECKOUT
                </Link>
              ) : (
                <Link 
                  to="/login" 
                  className="block w-full bg-black text-white py-3 text-center text-sm font-medium tracking-wide hover:bg-gray-800 transition-colors"
                >
                  SIGN IN TO CHECKOUT
                </Link>
              )}
              <button 
                className="w-full border border-gray-300 py-3 text-sm font-medium tracking-wide hover:border-black hover:text-black transition-colors" 
                onClick={() => dispatch(clearCart())}
              >
                CLEAR BAG
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
