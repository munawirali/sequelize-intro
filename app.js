const express = require('express');
const app = express();
const session = require('express-session');

const index=require('./routes/index');
const login=require('./routes/login');
const users=require('./routes/users');
const teachers=require('./routes/teachers');
const subjects=require('./routes/subjects');
const students=require('./routes/students');

app.set(`view engine`,`ejs`);
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(session({
  secret:'kitfox-2017',
  cookies:{},
  resave: false,
  proxy: true,
  saveUninitialized: true
}))

app.use('/login',login);

app.use('/',(req,res,next)=>{
  if (req.session.hasLogin) {
    next();
  }else {
    res.redirect('/login');
  }
},index);

app.use('/users',(req,res,next)=>{
  if (req.session.hasLogin) {
    next();
  } else {
    res.redirect('/login');
  }
},users);

app.use('/teachers',(req,res,next)=>{
  if (req.session.hasLogin) {
    next();
  }else {
    res.redirect('/login');
  }
},teachers);

app.use('/subjects',(req,res,next)=>{
  if (req.session.hasLogin) {
    next();
  }else {
    res.redirect('/login');
  }
},subjects);

app.use('/students',students);

app.listen(process.env.PORT || 1300,()=>{
  console.log(`My 1st Sequelize Listening on port 1300`);
})
