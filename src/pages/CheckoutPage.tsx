import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { clearCart } from '../slices/cartSlice'

export default function CheckoutPage() {
  const items = useAppSelector(s => s.cart.items)
  const user = useAppSelector(s => s.auth.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)
  
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const shipping = 0
  const total = subtotal + shipping

  const handleCheckout = async () => {
    setIsProcessing(true)
    
    // 결제 처리 시뮬레이션 (2초 대기)
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // 장바구니 비우기
    dispatch(clearCart())
    
    // 성공 페이지로 이동
    navigate('/checkout-success')
    setIsProcessing(false)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
        <svg className="w-24 h-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 7H6L5 9z" />
        </svg>
        <div className="text-center">
          <h2 className="text-2xl font-light mb-2">NO ITEMS TO CHECKOUT</h2>
          <p className="text-gray-500 mb-6">Add some items to your bag first</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-black text-white px-8 py-3 text-sm font-medium tracking-wide hover:bg-gray-800 transition-colors"
          >
            CONTINUE SHOPPING
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <button 
          onClick={() => navigate('/cart')}
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors mb-6"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          BACK TO BAG
        </button>
        <h1 className="text-3xl font-light">CHECKOUT</h1>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* 배송 정보 폼 */}
        <div>
          <h2 className="text-xl font-medium mb-6">DELIVERY DETAILS</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">EMAIL</label>
              <input 
                type="email" 
                value={user?.email || ''} 
                disabled
                className="w-full px-3 py-3 border border-gray-300 bg-gray-50 text-gray-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">FIRST NAME</label>
                <input type="text" className="w-full px-3 py-3 border border-gray-300 focus:border-black focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">LAST NAME</label>
                <input type="text" className="w-full px-3 py-3 border border-gray-300 focus:border-black focus:outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ADDRESS</label>
              <input type="text" className="w-full px-3 py-3 border border-gray-300 focus:border-black focus:outline-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CITY</label>
                <input type="text" className="w-full px-3 py-3 border border-gray-300 focus:border-black focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ZIP CODE</label>
                <input type="text" className="w-full px-3 py-3 border border-gray-300 focus:border-black focus:outline-none" />
              </div>
            </div>
          </div>

          <h2 className="text-xl font-medium mb-6 mt-8">PAYMENT METHOD</h2>
          <div className="space-y-4">
            <div className="border border-gray-300 p-4">
              <label className="flex items-center gap-3">
                <input type="radio" name="payment" defaultChecked className="w-4 h-4" />
                <span className="font-medium">Credit Card (Demo)</span>
              </label>
              <p className="text-sm text-gray-500 mt-2">This is a demo checkout - no real payment will be processed</p>
            </div>
          </div>
        </div>

        {/* 주문 요약 */}
        <div>
          <div className="bg-gray-50 p-6 sticky top-4">
            <h2 className="text-xl font-medium mb-6">ORDER SUMMARY</h2>
            
            <div className="space-y-4 mb-6">
              {items.map(item => (
                <div key={item.id} className="flex gap-3">
                  <div className="w-16 h-20 bg-white flex items-center justify-center">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.src = `https://via.placeholder.com/64x80/f8f9fa/6c757d?text=IMG`
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium line-clamp-2">{item.title}</h4>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-t pt-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between font-medium text-lg border-t pt-3">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full mt-6 bg-black text-white py-4 text-sm font-medium tracking-wide hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isProcessing ? 'PROCESSING...' : `PLACE ORDER - $${total.toFixed(2)}`}
            </button>
            
            <p className="text-xs text-gray-500 text-center mt-4">
              This is a demo store. No real payment will be processed.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}