'use client'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter, usePathname } from 'next/navigation'
import NoteEditor from '../../components/NoteEditor'
import { updateNote, deleteNote, fetchNotes } from '../../store/slices/notesSlice'

export default function NoteDetailPage() {
  const dispatch: any = useDispatch()
  const router = useRouter()
  const pathname = usePathname()

  // Extract note_id 
  const noteId = pathname.split('/').pop()

  const notes = useSelector((s: any) => s.notes.items)
  const [note, setNote] = useState<any>(null)

  // Load notes
  useEffect(() => {
    if (!notes || notes.length === 0) {
      dispatch(fetchNotes())
    } else {
      const found = notes.find((n: any) => n.note_id === noteId)
      setNote(found || null)
    }
  }, [notes, noteId, dispatch])

  // Save changes
  const handleSave = async (updated: any) => {
    // @ts-ignore 
    const result = await dispatch(updateNote({ note_id: noteId, ...updated }))
    // @ts-ignore
    if (result?.meta?.requestStatus === 'fulfilled') {
      router.push('/notes')
    } else {
      alert('Error updating note')
    }
  }

  
  const handleDelete = async () => {
    const confirmed = confirm('Delete this note?')
    if (!confirmed) return
    // @ts-ignore
    const result = await dispatch(deleteNote(noteId))
    if (result?.meta?.requestStatus === 'fulfilled') {
      router.push('/notes')
    } else {
      alert('Error deleting note')
    }
  }

 
  if (!note)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading note...</p>
      </div>
    )

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Note</h2>
          <button
            onClick={handleDelete}
            className="text-red-600 hover:underline"
          >
            Delete
          </button>
        </div>

        {/* @ts-ignore – JS component */}
        <NoteEditor existingNote={note} onSave={handleSave} />
      </div>
    </div>
  )
}
