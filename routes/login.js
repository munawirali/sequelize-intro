const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/',(req,res)=> {
  if (!req.session.hasLogin) {
    let temp={
      username:``,
      password:``
    }
    // res.send(temp);
    res.render('login',{user:temp,pesanError:'',title:`School Applications`});
  } else {
    res.redirect('/');
  }
});

router.post('/',(req,res)=>{
  // console.log(req.body);
  models.User.findAll({
    where:{username:req.body.username}
  })
  .then(user=>{
    // console.log(user[0].username+'..........'+req.body.username);
    if (user[0].username===req.body.username && user[0].password===req.body.password) { //console.log('tess');
        req.session.hasLogin = true;
        req.session.user = {
        user:user[0].username,
        role:user[0].role,
        loginTime:new Date()
      }
      // res.render('index',{title:`School Applications`});
      res.redirect('/');
    }
  })
  .catch(err=>{
    // res.send(err);
    let temp={
      username:req.body.username,
      password:req.body.password
    }
    res.render('login',{user:temp,pesanError:'username or password invalid!',title:`School Applications`});
  })
})

router.get('/logout',(req,res)=>{
  req.session.destroy();
  res.redirect('/login');
})

module.exports = router;
