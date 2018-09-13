const jwt=require('jsonwebtoken')
const User=require('../model/user.js')
require('dotenv').config()

module.exports={
    auth:(req,res,next)=>{
        let token=req.headers.token

        if(!token){
            res.status(403).json({error:'Please login first'})
        }

        jwt.verify(token,process.env.salt,(err,decoded)=>{
            if(err){
                res.status(500).json(err)
            }
            else{
                User.findById(decoded.id).then(user=>{
                    if(user){
                        req.decoded=decoded;
                        res.status(402).json({user:'user '+decoded.name+' berhasil login'})
                        next(decoded);
                    }
                    else{
                        res.status(401).json({error:'Please provide valid token'})
                    }
                })
                .catch(err=>{
                    res.status(500).json(err)
                })
            }
        })
    }
}