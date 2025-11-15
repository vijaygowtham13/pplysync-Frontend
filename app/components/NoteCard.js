
import React from 'react'

export default function NoteCard({ note }) {
  return (
    <div className="border border-blue-600 rounded-lg p-4 hover:shadow transition">
      <h3 className="font-semibold text-lg mb-2 text-black">{note.note_title}</h3>
      <p className="text-sm text-gray-700 line-clamp-3">{note.note_content}</p>

      <div className="flex justify-end mt-3 gap-2 text-sm">
       
      </div>
    </div>
  )
}
