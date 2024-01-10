import mongoose from 'mongoose'

mongoose.set('strictQuery', true)

mongoose.connect('mongodb://localhost:27017/todo-app')
.then(() => {
    console.log('Connected to MongoDB')
    })
.catch((error) => {    //catches any errors
    console.log(error)
})
