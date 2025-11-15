
import { useEffect } from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import NoteCard from '../components/NoteCard'
import useRequireAuth from '../lib/useRequireAuth'
import { fetchNotes } from '../store/slices/notesSlice'
import { logout } from '../store/slices/authSlice'

export default function Home() {
  useRequireAuth() 

  const dispatch = useDispatch()
  const router = useRouter()
  const { items, status, error } = useSelector(state => state.notes)
  const { user } = useSelector(state => state.auth)

  useEffect(() => {
   
    dispatch(fetchNotes())
  }, [dispatch])

  const handleSignOut = () => {
    dispatch(logout())
    router.push('/signin')
  }

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Your Notes</h1>
          {user && <p className="text-sm text-gray-500">Signed in as {user.user_name || user.user_email}</p>}
        </div>

        <div className="flex gap-3">
          <Link href="/notes/new">
            <a className="px-4 py-2 bg-blue-600 text-white rounded hover:opacity-95">Create Note</a>
          </Link>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 border rounded hover:bg-gray-50"
          >
            Sign out
          </button>
        </div>
      </div>

      {status === 'loading' && <p className="text-sm text-gray-600">Loading notes...</p>}
      {status === 'failed' && <p className="text-sm text-red-600">Error: {error}</p>}

      {status === 'succeeded' && items.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No notes yet — create your first note.</p>
          <Link href="/notes/new">
            <a className="px-4 py-2 bg-blue-600 text-white rounded">Create Note</a>
          </Link>
        </div>
      )}

      {status === 'succeeded' && items.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map(note => (
            <NoteCard key={note.note_id} note={note} />
          ))}
        </div>
      )}
    </Layout>
  )
}
