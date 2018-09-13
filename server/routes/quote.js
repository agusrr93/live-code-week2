const router=require('express').Router()
const {auth}=require('../helper/auth.js')
const Quote=require('../model/quotes.js')


router.post('/',auth,function(req,res,decoded){
    const newQuote = new Quote({
        content: req.body.content,
        creator:decoded._id
      });
       newQuote
        .save()
        .then(quote => {
          res.status(200).json({
            message: `${quote.content} has been insert into Database`
          })
        })
        .catch(err => {
          res.status(500).json({ message: err });
     })
})

router.get('/',function(req,res){
    Quote 
      .find({})
      .then(quote => {
        res.status(200).json({ quote });
      })
      .catch(err => {
        res.status(500).json({ message: err });
      })
})

router.delete('/:id',function(req,res){
    Quote
      .deleteOne({_id: req.params.id})
      .then(deleted => {
        if(deleted) {
          res.status(200).json({
            message: `Quote has been deleted`
          })
        } else {
          res.status(400).json({
            message: `Quote not found`
          })
        }
      })
      .catch(err => {
        console.log('error');
        
        res.status(500).json({ message: err });
      })
})

module.exports=router;