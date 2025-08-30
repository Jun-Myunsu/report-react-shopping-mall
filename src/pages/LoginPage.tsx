import { FormEvent, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { login, register } from '../slices/authSlice'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const [email, setEmail] = useState('test10@example.com')
  const [password, setPassword] = useState('password123')
  const dispatch = useAppDispatch()
  const nav = useNavigate()
  const { status, error } = useAppSelector(s => s.auth)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const res = await dispatch(login({ email, password }))
    if ((res as any).error) return
    nav('/')
  }

  const onRegister = async () => {
    const res = await dispatch(register({ email, password }))
    if (!(res as any).error) nav('/')
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <form onSubmit={onSubmit} className="w-full max-w-md bg-white p-8 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-center mb-6">로그인</h1>
        <label className="block text-sm mb-1">이메일</label>
        <input className="w-full border rounded px-3 py-2 mb-3" value={email} onChange={e => setEmail(e.target.value)} />
        <label className="block text-sm mb-1">비밀번호</label>
        <input type="password" className="w-full border rounded px-3 py-2 mb-4" value={password} onChange={e => setPassword(e.target.value)} />
        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
        <button disabled={status==='loading'} className="w-full bg-gray-700 text-white py-2 rounded disabled:opacity-60">
          {status==='loading' ? '로그인 중...' : '로그인'}
        </button>
        <p className="text-center mt-4 text-sm">
          계정이 없습니까?{' '}
          <button type="button" className="underline" onClick={onRegister}>가입하기</button>
        </p>
      </form>
    </div>
  )
}
