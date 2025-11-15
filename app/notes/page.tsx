'use client'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { fetchNotes, createNote } from '../store/slices/notesSlice'
import { logout } from '../store/slices/authSlice'
import NoteCard from '../components/NoteCard'
import useRequireAuth from '../lib/useRequireAuth'
import NoteEditor from '../components/NoteEditor'

export default function NotesPage() {
  useRequireAuth() 

  const dispatch: any = useDispatch()
  const router = useRouter()
  const { items, status, error } = useSelector((s: any) => s.notes)
  const { user } = useSelector((s: any) => s.auth)

  const [isNewModalOpen, setIsNewModalOpen] = useState(false)

  
  useEffect(() => {
    dispatch(fetchNotes())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logout())
    router.push('/signin')
  }

  const handleOpenNewModal = () => {
    setIsNewModalOpen(true)
  }

  const handleCloseNewModal = () => {
    setIsNewModalOpen(false)
  }

  const handleCreateNote = async (note: any) => {
    const result = await dispatch(createNote(note))
    if (result?.meta?.requestStatus === 'fulfilled') {
      setIsNewModalOpen(false) 
    } else {
      const payload = result.payload || result.error
      console.error('Create note failed ->', payload)
      alert(
        'Error creating note: ' +
          (payload?.detail || payload?.message || JSON.stringify(payload))
      )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6 relative">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-orange-400">Your Notes</h1>
            {user && (
              <p className="text-sm text-green-600">
                Signed in as {user.user_name || user.user_email}
              </p>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleOpenNewModal}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:opacity-90"
            >
              + New Note
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border rounded hover:bg-gray-50 text-black"
            >
              Logout
            </button>
          </div>
        </div>

       
        {status === 'loading' && <p>Loading notes...</p>}
        {status === 'failed' && <p className="text-red-600">{error}</p>}
        {status === 'succeeded' && items.length === 0 && (
          <div className="text-center py-8 text-red-600">
            No notes yet. Click “New Note” to create one!
          </div>
        )}
        {status === 'succeeded' && items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((note: any) => (
              <NoteCard key={note.note_id} note={note} />
            ))}
          </div>
        )}

      
        {isNewModalOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-black">Create New Note</h2>
                <button
                  onClick={handleCloseNewModal}
                  className="text-gray-500 hover:text-gray-800"
                >
                  ✕
                </button>
              </div>
             
              {/* @ts-ignore */}
              <NoteEditor onSave={handleCreateNote} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
