import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Product } from "../types";
import { useAppDispatch } from "../store/hooks";
import { addToCart } from "../slices/cartSlice";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [p, setP] = useState<Product | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await res.json();
      setP(data);
    })();
  }, [id]);

  if (!p) return <p className="text-center">로딩 중...</p>;

  return (
    <div className="space-y-12">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          BACK TO PRODUCTS
        </Link>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="flex items-center justify-center">
          <img
            src={p.image}
            alt={p.title}
            className="max-h-[420px] object-contain"
            onError={(e) => {
              e.currentTarget.src = `https://via.placeholder.com/400x400/f8f9fa/6c757d?text=${encodeURIComponent(p.category)}`
            }}
          />
        </div>
        <div>
          <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">{p.category}</p>
          <h1 className="text-3xl font-light mb-4">{p.title}</h1>
          <div className="text-2xl font-medium mb-6">${p.price}</div>
          <p className="text-gray-700 mb-8 leading-relaxed">{p.description}</p>
          <div className="flex gap-3">
            <button
              className="bg-black text-white px-8 py-3 text-sm font-medium tracking-wide hover:bg-gray-800 transition-colors flex-1"
              onClick={() => dispatch(addToCart(p))}
            >
              ADD TO BAG
            </button>
            <Link to="/cart" className="border border-gray-300 px-8 py-3 text-sm font-medium tracking-wide hover:border-black hover:text-black transition-colors text-center flex-1">
              VIEW BAG
            </Link>
          </div>
        </div>
      </div>
      
      {/* 상세 정보 섹션 */}
      <div className="border-t pt-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-lg font-medium mb-4">PRODUCT DETAILS</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex justify-between">
                <span className="font-medium">Category:</span>
                <span className="capitalize">{p.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Product ID:</span>
                <span>#{p.id}</span>
              </div>
              {p.rating && (
                <>
                  <div className="flex justify-between">
                    <span className="font-medium">Rating:</span>
                    <span>{p.rating.rate}/5 ⭐</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Reviews:</span>
                    <span>{p.rating.count} reviews</span>
                  </div>
                </>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">SHIPPING & RETURNS</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <p>• Free standard shipping on orders over $50</p>
              <p>• Express shipping available</p>
              <p>• 30-day return policy</p>
              <p>• Free returns and exchanges</p>
              <p>• Customer service: 24/7 support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
