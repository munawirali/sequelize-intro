const express = require('express');
const router=express.Router();
const model = require('../models');

router.get('/',(req,res)=>{
  model.Teacher.findAll({
    order:[['id','ASC']],
    include:[ {model:model.Subject }]
  })
  .then(rows=>{
    // let dataTeachers=rows.map((obj)=>{
    //       if (obj.SubjectId==null){
    //         obj['subject']['subject_name']='unasigned';
    //       }
    //       return obj;
    //     })
        // res.send(rows);
     res.render('teachers',{data:rows,title:`School Applications : View Data Teachers`});
  })
  .catch(err=>{
    res.send(err);
  })
})

router.get('/add',(req,res)=>{
  model.Subject.findAll()
  .then(rows=>{
    res.render('teachersAdd',{data:rows,title:`School Applications : Add Data Teachers`})
  })
  .catch(err=>{
    res.send(err);
  })
})

router.post('/add',(req,res)=>{
  model.Teacher.create({
    first_name:`${req.body.first_name}`,
    last_name:`${req.body.last_name}`,
    email:`${req.body.email}`,
    SubjectId:req.body.SubjectId
  })
  .then(()=>{
    req.redirect('/teachers');
  })
  .catch(err=>{
    res.send(err);
  })
})

router.get('/delete/:id',(req,res)=>{
  model.Teacher.destroy({
    where:{
      id:req.params.id
    }
  })
  .then(()=>{
    res.redirect('/teachers');
  })
  .catch(err=>{
    res.send(err);
  })
})

router.get('/edit/:id',(req,res)=>{//res.send(req.params.id)
  model.Teacher.findById(req.params.id)
  .then((rows)=>{
    // console.log(rows);
    model.Subject.findAll()
    .then((rowsSubject)=>{
      // console.log(rows);
      // console.log(rowsSubject);
      // res.send(rows);
      // res.send(rowsSubject);
      res.render('teachersEdit',{data:rows,dataSubject:rowsSubject,title:'School Applications : Edit Data Teacher'});
    })
  })
  .catch(err=>{
    res.send(err);
  })
})

router.post('/edit/:id',(req,res)=>{
  model.Teacher.update({
    first_name:`${req.body.first_name}`,
    last_name:`${req.body.last_name}`,
    email:`${req.body.email}`,
    SubjectId:req.body.SubjectId
  },{
    where:
    {
      id:req.params.id
    }
  })
  .then(()=>{
    res.redirect('/teachers')
  })
  .catch(err=>{
    res.send(err);
  })
})

module.exports = router;
