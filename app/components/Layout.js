// components/Layout.js
export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white shadow rounded-2xl p-6">
        {children}
      </div>
    </div>
  )
}
