'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomeRedirect() {
  const router = useRouter()

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

    if (token) {
      router.push('/notes')
    } else {
      router.push('/signup')
    }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      Redirecting...
    </div>
  )
}
