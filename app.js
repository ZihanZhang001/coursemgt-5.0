var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const course = require("./routes/courses");
const students = require("./routes/students");


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.get('/courses/size', course.findTotalSize);
app.get('/courses', course.findAll);
app.get('/courses/:code', course.findOne);
app.post('/courses',course.addCourse);
app.put('/courses/:code/size', course.incrementSize);
app.delete('/courses/:code', course.deleteCourse);

app.get('/students', students.findAll);
app.get('/students/:id', students.findOne);
app.get('/students/name/:name', students.findOneByname);
app.post('/students',students.addStudent);
app.put('/students/:id/age', students.incrementAge);
app.delete('/students/:id', students.deleteStudent);



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
});

module.exports = app;
