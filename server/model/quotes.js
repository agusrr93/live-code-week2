const mongoose=require('mongoose')

const quoteSchema=new mongoose.Schema({
    content:String,
    creator:String
})

const Quote=mongoose.model('Quote',quoteSchema)

module.exports=Quote;