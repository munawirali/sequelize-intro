const express = require('express');
const router=express.Router();
const model = require('../models');

router.get('/',(req,res)=>{
  model.Subject.findAll({
    order:[['id','ASC']],
    include:[{model:model.Teacher}]
  })
  .then(rows=>{
    // res.send(rows);
    res.render('subjects',{data:rows,title:`School Applications : Data Subjects`});
  })
  .catch(err=>{
    res.send(err);
  })
})
// /subjects/1/enrolledstudents
// where: {
//   id: `${req.params.id}`
// },
// include: [
//   {model: models.Conjunction,
//     include: [{model: models.Student}],
//   }
// ],
// order: [[models.Conjunction, models.Student, 'first_name']]
// })
router.get('/:id/enrolledstudents',(req,res)=>{
  model.Subject.findAll({
    where:{
      id:req.params.id
    },
    include:[{
      model:model.ConjStudentSubject,
      include:[{
        model:model.Students
      }]
    }],
    order:[[model.ConjStudentSubject,model.Students,'first_name','ASC']]
  })
  .then(rows=>{
    // res.send(rows[0]);
    res.render('enrolledStudents',{data:rows,title:`School Applications : Data Subjects`})

  })
  .catch(err=>{
    res.send(err);
  })
})
router.get('/:id/givescore',(req,res)=>{
  model.ConjStudentSubject.findAll({
    where:{
      id:req.params.id
    },
    include:[{model:model.Students},{model:model.Subject}],
  })
  .then(rows=>{
    // res.send(rows);
    res.render('subjectsGiveScore',{data:rows,title:`School Applications : Give Score`})
  })
})
router.post('/:id/givescore',(req,res)=>{
  // res.send(req.params.id);
  model.ConjStudentSubject.update({
    score:req.body.score
  },{
    where:{
      id:req.params.id
    }
  })
  .then(rows=>{
    res.redirect(`/subjects/${req.params.id}/enrolledstudents`);
  })
  .catch(err=>{
    res.send(err);
  })
})

module.exports = router;
