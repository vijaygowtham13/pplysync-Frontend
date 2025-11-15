
'use client'

import axios from 'axios'

const instance = axios.create({
  
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
  },
})

console.log('API baseURL =', instance.defaults.baseURL)

instance.interceptors.request.use((config) => {
  const url = config.url || ''

  
  const isAuthUrl = url.startsWith('/api/auth/')

  if (!isAuthUrl && typeof window !== 'undefined') {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }

  console.log('Request ->', config.method?.toUpperCase(), config.baseURL + url)
  return config
})

instance.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token')
    if (token && token !== 'null' && token !== 'undefined') {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})


export default instance
