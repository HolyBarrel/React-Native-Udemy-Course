import express from 'express'
import "./db"
import Note, { NoteDocument } from './models/note'
import { create, update,remove, readAll, readOne } from './controllers/note'
import NoteRouter from './routers/note'

// Note app with CRUD operations

const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

app.use("/note", NoteRouter)

app.listen(8000, () => {console.log('Server listening on port 8000')})
