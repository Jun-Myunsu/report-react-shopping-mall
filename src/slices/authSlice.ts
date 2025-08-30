import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '../firebase'

export const login = createAsyncThunk('auth/login', async (payload: { email: string, password: string }) => {
  const { user } = await signInWithEmailAndPassword(auth, payload.email, payload.password)
  return { uid: user.uid, email: user.email }
})

export const register = createAsyncThunk('auth/register', async (payload: { email: string, password: string }) => {
  const { user } = await createUserWithEmailAndPassword(auth, payload.email, payload.password)
  return { uid: user.uid, email: user.email }
})

export const logout = createAsyncThunk('auth/logout', async () => {
  await signOut(auth)
})

type AuthState = {
  user: { uid: string, email: string | null } | null
  status: 'idle' | 'loading' | 'failed'
  error?: string
  ready: boolean
}

const initialState: AuthState = { user: null, status: 'idle', ready: false }

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload
      state.ready = true
    }
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, (s) => { s.status = 'loading'; s.error = undefined })
      .addCase(login.fulfilled, (s, a) => { s.status = 'idle'; s.user = a.payload })
      .addCase(login.rejected, (s, a) => { s.status = 'failed'; s.error = a.error.message })
      .addCase(register.pending, (s) => { s.status = 'loading'; s.error = undefined })
      .addCase(register.fulfilled, (s, a) => { s.status = 'idle'; s.user = a.payload })
      .addCase(register.rejected, (s, a) => { s.status = 'failed'; s.error = a.error.message })
      .addCase(logout.fulfilled, (s) => { s.user = null })
  }
})

export const { setUser } = slice.actions
export default slice.reducer

// Init auth state listener once when app loads
export const initAuthListener = () => (dispatch: any) => {
  onAuthStateChanged(auth, (user: User | null) => {
    if (user) dispatch(setUser({ uid: user.uid, email: user.email }))
    else dispatch(setUser(null))
  })
}
