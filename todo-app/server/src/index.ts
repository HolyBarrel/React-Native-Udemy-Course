import express from 'express'
import "./db"
import Note, { NoteDocument } from './models/note'

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

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
    })

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

app.listen(8000, () => {
    console.log('Server listening on port 8000')
    })
