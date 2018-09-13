const express=require('express')
const app=express()

const path=require('path')
const mongoose=require('mongoose')

require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

mongoose.connect('mongodb://localhost/quoteGenerator')
mongoose.connect('mongodb://localhost/quoteGenerator',{useNewUrlParser:true})

const db=mongoose.connection
db.on('error',console.error.bind(console,'connection error: '));

const userRouter=require('./routes/user')
const quoteRouter=require('./routes/quote')

app.use('/users',userRouter)
app.use('/quotes',quoteRouter)

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});

