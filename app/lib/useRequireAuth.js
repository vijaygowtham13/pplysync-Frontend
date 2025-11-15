
'use client'

import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

export default function useRequireAuth() {
  const { token } = useSelector((s) => s.auth)
  const router = useRouter()

  useEffect(() => {
    
    if (!token) {
      router.replace('/signin')
    }
  }, [token, router])
}
