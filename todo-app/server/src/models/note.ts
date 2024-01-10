import { Schema, model } from 'mongoose'

const note = {
    title: "This is a title",
    description: "This is a description",
}

export interface NoteDocument  {
    title: string
    description?: string
}

const noteSchema =  new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    }
})

export default model<NoteDocument>("Note", noteSchema)
