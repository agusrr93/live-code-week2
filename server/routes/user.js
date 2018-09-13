const router=require('express').Router()
const User=require('../model/user.js')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

router.post('/register',function(req,res){
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });
         newUser
          .save()
          .then(User => {
            res.status(200).json({
              message: `${User.name} has been insert into Customers`
            })
          })
          .catch(err => {
            res.status(500).json({ message: err });
          })
})

router.post('/login',function(req,res){
    // let hashed=bcrypt.hashSync(req.body.password,req.body.email,'inidulu')

    User.findOne({email:req.body.email,password:req.body.password})
    .then(user=>{
        let obj={
            id:user._id,
            name:user.name,
            email:user.email
        }

        jwt.sign(obj,'inidulu',(err,token)=>{
            if(err){
                res.status(500).json({error:err.message})
            }
            else{
                res.status(200).json({message:'login berhasil',token:token})
            }
        })
    }).catch(err=>{
        res.status(500).json({error:err.message})
    })
})



module.exports=router;