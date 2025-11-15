import '../app/globals.css'
import React from 'react'
import Providers from './providers'

export const metadata = {
  title: 'Notes App',
  description: 'Notes taking app'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Providers is a client component that contains the Redux Provider */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
