
'use client'

import React, { useState } from 'react'

export default function NoteEditor({ onSave, existingNote }) {
  const [note, setNote] = useState(
    existingNote || { note_title: '', note_content: '' }
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!note.note_title.trim()) {
      alert('Title cannot be empty')
      return
    }
    onSave(note)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-black">
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input
          type="text"
          value={note.note_title}
          onChange={(e) => setNote({ ...note, note_title: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 text-black bg-white"
          placeholder="Enter note title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Content</label>
        <textarea
          value={note.note_content}
          onChange={(e) => setNote({ ...note, note_content: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 h-40 resize-none text-black bg-white"
          placeholder="Write your note here..."
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Note
      </button>
    </form>
  )
}
