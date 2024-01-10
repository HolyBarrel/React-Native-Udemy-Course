import { RequestHandler } from 'express'
import Note, { NoteDocument }  from '../models/note'

export interface IncomingNote {
    title: string
    description?: string
}

export const create: RequestHandler = async (req, res) => {
    await Note.create<NoteDocument>(req.body as IncomingNote)

    res.json({ message: 'Listening to create' })
}

export const update: RequestHandler = async (req, res) => {
    const { noteId } = req.params
   //     const note = await Note.findById(noteId)

   const { title, description } = req.body as IncomingNote

   //     if (title) note.title = title
   //     if (description) note.description = description

   const note = await Note.findByIdAndUpdate(noteId, {title, description}, {new: true})

   if(!note) return res.json({ message: 'Note not found' })

   res.json({ note })
}

export const remove: RequestHandler = async (req, res) => {
    const { noteId } = req.params
    const removedNote = await Note.findByIdAndDelete(noteId)

    if(!removedNote) return res.json({ error: 'Note not removed' })

    res.json({ message: 'Note removed' })
}


export const readAll: RequestHandler = async (req, res) => {
    const notes = await Note.find()

    if (notes.length == 0) return res.json({ message: 'No notes found' })

    res.json({ notes })
}

export const readOne: RequestHandler = async (req, res) => {
    const { id } = req.params

    const note = await Note.findById(id)

    if (!note) return res.json({ message: 'No note found' })
    
    res.json({ note })
}
