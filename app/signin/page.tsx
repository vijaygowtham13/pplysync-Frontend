'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { signin } from '../store/slices/authSlice'

export default function SigninPage() {
  const dispatch: any = useDispatch()
  const router = useRouter()
  const auth = useSelector((s: any) => s.auth)
  const [form, setForm] = useState({ user_email: '', password: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})

  
  useEffect(() => {
    if (auth?.token) {
      router.push('/notes')
    }
  }, [auth?.token, router])

  const validate = () => {
    const e: Record<string, string> = {}
    if (!/^\S+@\S+\.\S+$/.test(form.user_email)) e.user_email = 'Valid email required'
    if (!form.password) e.password = 'Password required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validate()) return
    // @ts-ignore
    const result = await dispatch(signin(form))
    if (result.meta.requestStatus === 'fulfilled') {
      router.push('/notes')
    } else {
      console.error('Signin failed ->', result.payload || result.error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4 text-black">Sign in</h2>

        <form onSubmit={onSubmit} className="space-y-4 text-black">
          <div>
            <label className="block text-sm">Email</label>
            <input
              value={form.user_email}
              onChange={(e) => setForm({ ...form, user_email: e.target.value })}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.user_email && (
              <p className="text-xs text-red-600 mt-1">{errors.user_email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.password && (
              <p className="text-xs text-red-600 mt-1">{errors.password}</p>
            )}
          </div>

          <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded">
            {auth?.status === 'loading' ? 'Signing in...' : 'Sign in'}
          </button>

          {auth?.error && (
            <p className="text-sm text-red-600 mt-2">
              {typeof auth.error === 'string'
                ? auth.error
                : JSON.stringify(auth.error)}
            </p>
          )}

          <p className="text-sm mt-2">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-blue-600">
              Create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
