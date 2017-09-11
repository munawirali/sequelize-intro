const express = require('express');
const router=express.Router();
const model = require('../models');
const scoreLeter=require('../helper/scoreLeter');

router.get('/',(req,res)=>{
  model.Subject.findAll({
    order:[['id','ASC']],
    include:[{model:model.Teacher}]
  })
  .then(rows=>{
    // res.send(rows);
    res.render('subjects',{data:rows,title:`School Applications : View Data Subjects`});
  })
  .catch(err=>{
    res.send(err);
  })
})
// router.get('/:id/enrolledstudents',(req,res)=>{
//   model.Subject.findAll({
//     where:{
//       id:req.params.id
//     },
//     include:[{
//       model:model.ConjStudentSubject,
//       include:[{
//         model:model.Students
//       }]
//     }],
//     order:[[model.ConjStudentSubject,model.Students,'first_name','ASC']]
//   })
//   .then(rows=>{
//     // res.send(rows[0]);
//     res.render('enrolledStudents',{data:rows,title:`School Applications : Enroll Students to Subjects`})
//
//   })
//   .catch(err=>{
//     res.send(err);
//   })
// })
router.get('/:id/enrolledstudents',(req,res)=>{
  model.Subject.findAll({
    where:{
      id:req.params.id
    },
    include:[{
      model:model.Students}]
    // order:[[model.ConjStudentSubject,model.Students,'first_name','ASC']]
  })
  .then(rows=>{
    // res.send(rows);
    if (rows[0].Students.length>0) {
      let c=0;
      rows[0].Students.map(rowStudents=>{
        rowStudents['scoreLeter']=scoreLeter(rowStudents.SubjectStudent.score);console.log('-----'+scoreLeter(rowStudents.SubjectStudent.score));
        console.log();
        c++
        if (c>=rows[0].Students.length) {
          // res.send(rowStudents)
          res.render('enrolledStudents',{data:rows[0],title:`School Applications : Enroll Students to Subjects`})
        }
      })
    } else {res.redirect('/subjects')}

    // res.render('enrolledStudents',{data:rows,title:`School Applications : Enroll Students to Subjects`})

  })
  .catch(err=>{
    res.send(err);
  })
})
router.get('/:StudentId:SubjectId/givescore',(req,res)=>{
  model.SubjectStudent.findAll({
    where:{
      StudentId:req.params.StudentId,SubjectId:req.params.SubjectId
  },
    include:[{model:model.Students},{model:model.Subject}],
  })
  .then(rows=>{
    res.send(rows);
    // res.render('subjectsGiveScore',{data:rows,title:`School Applications : Give Score`})
  })
})
router.post('/:StudentId:SubjectId/givescore',(req,res)=>{
  // res.send(req.params.id);
  model.SubjectStudent.update({
    score:req.body.score
  },{
    where:{
      StudentId:req.params.StudentId
    }
  })
  .then(()=>{
    // res.redirect(`/subjects/${req.params.SubjectId}/enrolledstudents`);
    // model.Subject.findAll({
    //   where:{
    //     id:req.params.id
    //   },
    //   include:[{
    //       model:model.Students
    //   }],
    //   order:[[model.SubjectStudent,model.Students,'first_name','ASC']]
    // })
    // .then(rows=>{
    //   // res.send(rows[0]);
    //   res.render('enrolledStudents',{data:rows,title:`School Applications : Data Subjects`})
    //
    // })
    // .catch(err=>{
    //   res.send(err);
    // })

  })
  .catch(err=>{
    res.send(err);
  })
})

module.exports = router;
