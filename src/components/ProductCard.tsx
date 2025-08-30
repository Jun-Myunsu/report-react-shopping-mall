import { Link } from 'react-router-dom'
import type { Product } from '../types'
import { useAppDispatch } from '../store/hooks'
import { addToCart } from '../slices/cartSlice'

export default function ProductCard({ p }: { p: Product }) {
  const dispatch = useAppDispatch()
  
  return (
    <div className="group cursor-pointer">
      <Link to={`/product/${p.id}`} className="block">
        <div className="relative overflow-hidden bg-gray-50 mb-3 h-80 flex items-center justify-center">
          <img 
            src={p.image} 
            alt={p.title} 
            className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105" 
            onError={(e) => {
              if (e.currentTarget.src.includes('placeholder')) return
              e.currentTarget.style.transform = 'none'
              e.currentTarget.classList.remove('group-hover:scale-105')
              e.currentTarget.src = `https://via.placeholder.com/300x400/f8f9fa/6c757d?text=${encodeURIComponent(p.category)}`
            }}
          />
        </div>
        <div className="space-y-1 h-16 flex flex-col justify-between">
          <h3 className="text-sm font-normal text-gray-900 line-clamp-2 leading-tight">{p.title}</h3>
          <p className="text-lg font-medium text-black">${p.price}</p>
        </div>
      </Link>
      <button
        onClick={() => dispatch(addToCart(p))}
        className="mt-3 w-full bg-black text-white py-3 text-sm font-medium tracking-wide hover:bg-gray-800 transition-colors duration-200"
      >
        ADD TO BAG
      </button>
    </div>
  )
}
