import express from 'express'
import "./db"
import Note, { NoteDocument } from './models/note'

// Note app with CRUD operations

const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

// app.use((req, res, next) =>   //This is a middleware function
// {
//     //can manipulate the request here
//     //read data and add that to req.body
//     req.on('data', (data) => {
//         req.body = JSON.parse(data)
//         next()
//         }
//     )
// })

// app.get('/', (req, res) => {
//     res.send('<h1>Hello World</h1>')
//     })

app.post(
    '/', 
    (req, res) => {
        // need data to create a new todo
        console.log(req.body)
        res.json({ message: 'Todo Created' })
    })

interface IncomingNote {
    title: string
    description?: string
}


app.post(
    '/create',
    async (req, res) => {
        // const newNote =  new Note<NoteDocument>({
        //     title: (req.body as IncomingNote).title,
        //     description: (req.body as IncomingNote).description}
        //     )

        // await newNote.save()

        //STREAMLINED ALTERNATIVE
        await Note.create<NoteDocument>(req.body as IncomingNote)

        res.json({ message: 'Listening to create' })
    })

    app.patch(
        '/:noteId',
         async (req, res) => {
             const { noteId } = req.params
            //     const note = await Note.findById(noteId)

            const { title, description } = req.body as IncomingNote
        
            //     if (title) note.title = title
            //     if (description) note.description = description
        
            const note = await Note.findByIdAndUpdate(noteId, {title, description}, {new: true})

            if(!note) return res.json({ message: 'Note not found' })
    
            res.json({ note })
        })

app.delete(
    '/:noteId',
        async (req, res) => {
            const { noteId } = req.params
            const removedNote = await Note.findByIdAndDelete(noteId)

            if(!removedNote) return res.json({ error: 'Note not removed' })

            res.json({ message: 'Note removed' })
    })

app.get('/', async (req, res) => {
    const notes = await Note.find()

    if (notes.length == 0) return res.json({ message: 'No notes found' })

    res.json({ notes })
    })

app.get('/:id', async (req, res) => {
    const { id } = req.params
    const note = await Note.findById(id)

    if (!note) return res.json({ message: 'No note found' })
    
    res.json({ note })
    })

app.listen(8000, () => {
    console.log('Server listening on port 8000')
    })
