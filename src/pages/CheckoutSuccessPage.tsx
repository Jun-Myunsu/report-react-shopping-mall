import { useNavigate } from 'react-router-dom'

export default function CheckoutSuccessPage() {
  const navigate = useNavigate()

  return (
    <div className="text-center py-20">
      <div className="text-6xl mb-6">✅</div>
      <h1 className="text-3xl font-semibold mb-4 text-green-600">결제 완료!</h1>
      <p className="text-gray-600 mb-8">주문이 성공적으로 처리되었습니다.</p>
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => navigate('/')}
          className="bg-purple-700 text-white px-6 py-2 rounded hover:bg-purple-800"
        >
          쇼핑 계속하기
        </button>
      </div>
    </div>
  )
}