const express = require('express');
const router=express.Router();
const model = require('../models');

router.get('/',(req,res)=>{
  model.Teacher.findAll()
  .then(rows=>{
    // res.send(rows);
    res.render('teachers',{data:rows,title:`Halaman Teachers`});
  })
  .catch(err=>{
    res.send(err);
  })
})

module.exports = router;
