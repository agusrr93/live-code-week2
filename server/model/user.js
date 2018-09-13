const mongoose=require('mongoose')
const validate=require('mongoose-validator')
const uniqueValidator=require('mongoose-unique-validator')
// const bcrypt=require('bcrypt')

const nameValidator=[
    validate({
        validator:'isLength',
        arguments:[3,50],
        message:'Name should be beetween {ARGS[0]} and {ARGS[1]} characters length'
    })
]

const passValidator=[
    validate({
        validator:'isLength',
        arguments:[6,16],
        message: 'Pasword must be beetween {ARGS[0]} and {ARGS[1]} characters length'
    })
]

const userSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true,
        validate:nameValidator
    },
    email:{
        type:String,
        unique:true,required:true
    },
    password:{
        type:String,required:true,validate:passValidator
    }
})

userSchema.plugin(uniqueValidator)
// userSchema.pre('save',function(next){
//     this.password=bcrypt.hashSync(this.password,this.email,'inidulu')
//     next()
// })

const User=mongoose.model('User',userSchema)

module.exports=User