
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../lib/axiosClient'


export const fetchNotes = createAsyncThunk(
  'notes/fetchNotes',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/api/notes/')
      return res.data
    } catch (err) {
      console.error(
        'Fetch notes error ->',
        err.response?.status,
        err.response?.data || err.message
      )
      return rejectWithValue(err.response?.data || { message: err.message })
    }
  }
)

// CREATE note
export const createNote = createAsyncThunk(
  'notes/createNote',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post('/api/notes/', payload)
      return res.data
    } catch (err) {
      console.error(
        'Create note error ->',
        err.response?.status,
        err.response?.data || err.message
      )
      return rejectWithValue(err.response?.data || { message: err.message })
    }
  }
)


export const updateNote = createAsyncThunk(
  'notes/updateNote',
  async ({ note_id, ...body }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`/api/notes/${note_id}/`, body)
      return res.data
    } catch (err) {
      console.error(
        'Update note error ->',
        err.response?.status,
        err.response?.data || err.message
      )
      return rejectWithValue(err.response?.data || { message: err.message })
    }
  }
)


export const deleteNote = createAsyncThunk(
  'notes/deleteNote',
  async (note_id, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/notes/${note_id}/`)
      return note_id
    } catch (err) {
      console.error(
        'Delete note error ->',
        err.response?.status,
        err.response?.data || err.message
      )
      return rejectWithValue(err.response?.data || { message: err.message })
    }
  }
)

const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchNotes.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = 'failed'
        const payload = action.payload
        state.error =
          payload?.detail ||
          payload?.message ||
          JSON.stringify(payload) ||
          action.error?.message
      })

      // CREATE
      .addCase(createNote.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // prepend new note
        state.items.unshift(action.payload)
      })
      .addCase(createNote.rejected, (state, action) => {
        state.status = 'failed'
        const payload = action.payload
        state.error =
          payload?.detail ||
          payload?.message ||
          JSON.stringify(payload) ||
          action.error?.message
      })

      // UPDATE
      .addCase(updateNote.fulfilled, (state, action) => {
        const updated = action.payload
        state.items = state.items.map((n) =>
          n.note_id === updated.note_id ? updated : n
        )
      })
      .addCase(updateNote.rejected, (state, action) => {
        const payload = action.payload
        state.error =
          payload?.detail ||
          payload?.message ||
          JSON.stringify(payload) ||
          action.error?.message
      })

      // DELETE
      .addCase(deleteNote.fulfilled, (state, action) => {
        const id = action.payload
        state.items = state.items.filter((n) => n.note_id !== id)
      })
      .addCase(deleteNote.rejected, (state, action) => {
        const payload = action.payload
        state.error =
          payload?.detail ||
          payload?.message ||
          JSON.stringify(payload) ||
          action.error?.message
      })
  },
})

export default notesSlice.reducer
