import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchCategories, fetchProducts, setCategoryFilter } from '../slices/productsSlice'
import ProductCard from '../components/ProductCard'
import { initAuthListener } from '../slices/authSlice'

export default function ProductsPage() {
  const dispatch = useAppDispatch()
  const { items, status, categories, categoryFilter } = useAppSelector(s => s.products)

  useEffect(() => {
    dispatch(initAuthListener() as any)
    dispatch(fetchCategories())
    dispatch(fetchProducts())
  }, [dispatch])

  const applyFilter = (cat: string) => {
    dispatch(setCategoryFilter(cat))
    dispatch(fetchProducts({ category: cat }))
  }

  return (
    <div>
      <h1 className="text-4xl font-light text-center mb-8 tracking-wide text-gray-900">PRODUCTS</h1>

      <div className="flex flex-wrap gap-2 justify-center mb-8">
        <button 
          onClick={() => applyFilter('all')} 
          className={`px-6 py-2 text-sm font-medium tracking-wide transition-all duration-200 ${
            categoryFilter==='all' 
              ? 'bg-black text-white' 
              : 'bg-white text-gray-700 border border-gray-300 hover:border-black hover:text-black'
          }`}
        >
          ALL
        </button>
        {categories.map(c => (
          <button 
            key={c} 
            onClick={() => applyFilter(c)} 
            className={`px-6 py-2 text-sm font-medium tracking-wide transition-all duration-200 uppercase ${
              categoryFilter===c 
                ? 'bg-black text-white' 
                : 'bg-white text-gray-700 border border-gray-300 hover:border-black hover:text-black'
            }`}
          >
            {c.replace("'", "")}
          </button>
        ))}
      </div>

      {status === 'loading' && <p className="text-center">로딩 중...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map(p => <ProductCard key={p.id} p={p} />)}
      </div>
    </div>
  )
}
