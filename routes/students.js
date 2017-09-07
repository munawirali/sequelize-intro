const express = require('express');
const router=express.Router();
const model = require('../models');

router.get('/',(req,res)=>{
  model.Students.findAll()
  .then(rows=>{
    // res.send(rows);
    res.render('students',{data:rows,title:`Halaman Students`});
  })
  .catch(err=>{
    res.send(err);
  })
})

router.get('/add',(req,res)=>{
  res.render('studentAdd',{title:`Add Student Data`,pesanError:''});
})

// router.post('/add',(req,res)=>{
//   model.Students.create({
//     first_name:`${req.body.first_name}`,
//     last_name:`${req.body.last_name}`,
//     email:`${req.body.email}`
//   })
//   .then(()=>{
//     // res.send(rows);
//     // res.render('students',{data:rows,title:`Halaman Students`});
//     res.redirect('/students');
//   })
//   .catch(err=>{
//     res.send(err);
//   })
// })

router.post('/add',(req,res)=>{

  model.Students.create({
    first_name:`${req.body.first_name}`,
    last_name:`${req.body.last_name}`,
    email:`${req.body.email}`
  })
  .then(()=>{
    // res.send(rows);
    // res.render('students',{data:rows,title:`Halaman Students`});
    res.redirect('/students');
  })
  .catch(err =>{
    // res.send(err);
    let pesanError='';
    // if (err.errors[0].message='Validation isEmail on email failed') {
    //   pesanError='Format Email Anda Salah!'
    // } else
    // if (err.errors[0].message='Validation isUnique on email failed') {
    //   pesanError='Email anda sudah terdaftar!';
    // } else pesanError=err;

    // res.render('studentAdd',{title:`Add Student Data`,pesanError:'Email anda tidak valid!'});
    res.render('studentAdd',{title:`Add Student Data`,pesanError:err.errors[0].message});
    // res.redirect('/students/add',pesanError);
    // res.redirect('/students/add');
  })
})

router.get('/edit/:id',(req,res)=>{
  model.Students.findById(req.params.id)
  .then(rows=>{
    // res.send(rows);
    res.render('studentEdit',{data:rows,title:`Halaman Edit Students`,pesanError:''});
  })
  .catch(err=>{
    res.send(err);
  })
})

router.post('/edit/:id',(req,res)=>{
  model.Students.update({
    first_name:`${req.body.first_name}`,
    last_name:`${req.body.last_name}`,
    email:`${req.body.email}`
  },{
    where:{
      id:req.params.id
    }
  })
  .then(rows=>{
    // res.send(rows);
    // res.render('students',{data:rows,title:`Halaman Students`});
    res.redirect('/students');
  })
  .catch(err=>{
    // let pesanError='';
    res.send(err);    
  })
})

router.get('/delete/:id',(req,res)=>{
  model.Students.destroy({
    where: {
      id:req.params.id
    }
  })
  .then(()=>{
    res.redirect('/students');
  })
  .catch(err=>{
    res.send(err);
  })
})

module.exports = router;
