var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv=require('dotenv')
var indexRouter = require('./routes/posts');
var usersRouter = require('./routes/users');
const connection =require('./DB/connection')
var app = express();
var http = require('http');

const server = http.createServer(app);

// db.connect((err)=>{
//   if(err){
//     console.log("errrr");
//   }else{
//     console.log("DB CONNECTED");
//   }
// })
connection()
// view engine setup
dotenv.config()
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/posts', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');


  server.listen(30000)
});

module.exports = app;
