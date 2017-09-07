const express = require('express');
const router=express.Router();
const model = require('../models');

router.get('/',(req,res)=>{
  model.Subject.findAll()
  .then(rows=>{
    // res.send(rows);
    res.render('subjects',{data:rows,title:`Halaman Subject`});
  })
  .catch(err=>{
    res.send(err);
  })
})

module.exports = router;
