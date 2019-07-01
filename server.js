const express = require('express');
const content = require('./Modals/ReadFile');
const path = require('path');
var session = require('express-session');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
const logger = require('morgan');
const db= require('./util/database');
const bodyParser= require('body-parser');
const indexData= require('./routes/dashboard');
const errorRouter= require('./routes/admin');

var app = express();
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.set('view engine','ejs');
app.set('views','Views');
app.use(session({
    secret:'secret',
    saveUninitialized: true,
    resave: true
  }));
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});
app.use(indexData);
app.use(errorRouter);
db.execute('select * from users')
.then(result=>{
   // console.log(result[0]);
})
.catch(err=>{
    console.log(err)
});

app.set('port', (process.env.PORT || 3000));

// Run Server
app.listen(app.get('port'), function(){
  console.log('Server started on port: '+app.get('port'));
});
