'use client'

import React from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import NoteEditor from '../../components/NoteEditor'
import { createNote } from '../../store/slices/notesSlice'

export default function NewNotePage() {
  const dispatch: any = useDispatch()  
  const router = useRouter()

  const handleSave = async (note: any) => {  
    // @ts-ignore 
    const result = await dispatch(createNote(note))
    // @ts-ignore 
    if (result?.meta?.requestStatus === 'fulfilled') {
      router.push('/notes')
    } else {
      alert('Error creating note: ' + JSON.stringify(result.payload || result.error))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-semibold mb-4">Create New Note</h1>
        {/* @ts-ignore */}
        <NoteEditor onSave={handleSave} />
      </div>
    </div>
  )
}
