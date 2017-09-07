const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const index=require('./routes/index');
const teachers=require('./routes/teachers');
const subjects=require('./routes/subjects');
const students=require('./routes/students');

app.set(`view engine`,`ejs`);
app.use(bodyParser.urlencoded({extender:true}));
app.use(bodyParser.json());

app.use('/',index);
app.use('/teachers',teachers);
app.use('/subjects',subjects);
app.use('/students',students);

app.listen(1300,()=>{
  console.log(`My 1st Sequelize Listening on port 1300`);
})
