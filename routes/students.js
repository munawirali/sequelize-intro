const express = require('express');
const router=express.Router();
const model = require('../models');

router.get('/',(req,res)=>{
  model.Students.findAll({
    order:[['first_name','ASC']]
  })
  .then(rows=>{
    // res.send(rows);
    res.render('students',{data:rows,title:`School Applications : View Data Students`});
  })
  .catch(err=>{
    res.send(err);
  })
})

router.get('/add',(req,res)=>{
  let temp={
    first_name:``,
    last_name:``,
    email:``
    }
  res.render('studentAdd',{title:`School Applications : Add Data Students`,data:temp,pesanError:''});
})

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
    let temp={
      first_name:`${req.body.first_name}`,
      last_name:`${req.body.last_name}`,
      email:`${req.body.email}`
      }
    if (err.errors[0].message=='Validation isEmail on email failed') {
      res.render('studentAdd',{title:`School Applications : Add Data Students`,data:temp,pesanError:'Your Email is not valid!'});
    } else
    if (err.errors[0].message=='email must be unique'){
      // res.send(err);
      res.render('studentAdd',{title:`School Applications : Add Data Students`,data:temp,pesanError:'Your Email address already in use!'});
    } else {
      res.render('studentAdd',{title:`School Applications : Add Data Students`,data:temp,pesanError:'Errors Unhandled!'});
    }
  })
})

// let editRoute(route,data,message)=>{
//   router.get(route,(req,res)=>{
//     model.Students.findById(req.params.id)
//     .then(rows=>{
//       // res.send(rows);
//       res.render('studentEdit',{data:rows,title:`School Applications : Edit Data Students`,pesanError:message});
//     })
//     .catch(err=>{
//       res.send(err);
//     })
//   })
// }

router.get('/edit/:id',(req,res)=>{
  model.Students.findById(req.params.id)
  .then(rows=>{
    // res.send(rows);
    res.render('studentEdit',{data:rows,title:`School Applications : Edit Data Students`,pesanError:''});
  })
  .catch(err=>{
    res.send(err);
  })
})

router.post('/edit/:id',(req,res,next)=>{
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
    // res.send(err);
    let temp={
      id:req.params.id,
      first_name:`${req.body.first_name}`,
      last_name:`${req.body.last_name}`,
      email:`${req.body.email}`
      }
    if (err.errors[0].message=='Validation isEmail on email failed') {
      res.render('studentEdit',{title:`School Applications : Edit Data Students`,data:temp,pesanError:'Your Email is not valid!'});
      console.log('email not valid');
      // router.get(`/edit/${req.params.id}`);
    } else
    if (err.errors[0].message=='email must be unique'){
      // res.send(err);
      res.render('studentEdit',{title:`School Applications : Edit Data Students`,data:temp,pesanError:'Your Email address already in use!'});
    } else {
      res.render('studentEdit',{title:`School Applications : Edit Data Students`,data:temp,pesanError:'Errors Unhandled!'});
    }
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

router.get('/:id/addsubject',(req,res)=>{
  model.Students.findById(req.params.id)
  .then(rows=>{
    model.Subject.findAll()
    .then((rowsSubject)=>{
      res.render('studentAddSubject',{data:rows,dataSubject:rowsSubject,title:`School Applications : Add Subject Students`})
    })
  })
  .catch(err=>{
    res.send(err);
  })
})

router.post('/:id/addsubject',(req,res)=>{
  model.SubjectStudent.create({
    StudentId:req.params.id,
    SubjectId:req.body.SubjectId
  })
  .then(()=>{
    res.redirect('/students');
  })
  .catch(err=>{
    res.send(err);
  })
})

module.exports = router;
