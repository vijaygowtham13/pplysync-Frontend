
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../lib/axiosClient'


export const signup = createAsyncThunk(
  'auth/signup',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post('/api/auth/signup/', payload)
      return res.data
    } catch (err) {
      console.error(
        'Signup error ->',
        err.response?.status,
        err.response?.data || err.message
      )
      return rejectWithValue(err.response?.data || { message: err.message })
    }
  }
)

// SIGNIN
export const signin = createAsyncThunk(
  'auth/signin',
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axios.post('/api/auth/signin/', credentials)
      return res.data
    } catch (err) {
      console.error(
        'Signin error ->',
        err.response?.status,
        err.response?.data || err.message
      )
      return rejectWithValue(err.response?.data || { message: err.message })
    }
  }
)

// initial state, reading from localStorage if available
const getInitialToken = () => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('token')
}
const getInitialUser = () => {
  if (typeof window === 'undefined') return null
  try {
    return JSON.parse(localStorage.getItem('user')) || null
  } catch {
    return null
  }
}

const initialState = {
  token: getInitialToken(),
  user: getInitialUser(),
  status: 'idle',
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null
      state.user = null
      state.status = 'idle'
      state.error = null
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    },
    setCredentials(state, action) {
      state.token = action.payload.token
      state.user = action.payload.user
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', action.payload.token)
        localStorage.setItem('user', JSON.stringify(action.payload.user))
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // SIGNIN
      .addCase(signin.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.token = action.payload.token
        state.user = action.payload.user
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', action.payload.token)
          localStorage.setItem('user', JSON.stringify(action.payload.user))
        }
      })
      .addCase(signin.rejected, (state, action) => {
        state.status = 'failed'
        const payload = action.payload
        state.error =
          payload?.detail ||
          payload?.message ||
          JSON.stringify(payload) ||
          action.error?.message
      })

      // SIGNUP
      .addCase(signup.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // auto-login if token returned
        if (action.payload?.token) {
          state.token = action.payload.token
          state.user = action.payload.user
          if (typeof window !== 'undefined') {
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('user', JSON.stringify(action.payload.user))
          }
        }
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'failed'
        const payload = action.payload
        state.error =
          payload?.detail ||
          payload?.message ||
          JSON.stringify(payload) ||
          action.error?.message
      })
  },
})

export const { logout, setCredentials } = authSlice.actions
export default authSlice.reducer
