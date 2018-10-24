var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const courses = require("./routes/courses");
const students = require("./routes/students");
const teachers = require("./routes/teachers");


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

if (process.env.NODE_ENV != 'test') {
    app.use(logger('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.get('/courses', courses.findAll);
app.get('/courses/:id', courses.findOne);
app.post('/courses',courses.addCourse);
app.put('/courses/:id/size', courses.incrementSize);
app.delete('/courses/:id', courses.deleteCourse);

app.get('/students', students.findAll);
app.get('/students/:id', students.findOne);
app.get('/students/fuzzystudent/:keyword', students.fuzzystudent);
app.get('/students/courses/:id',students.getcourses);
app.post('/students',students.addStudent);
app.put('/students/:id/age', students.incrementAge);
app.delete('/students/:id', students.deleteStudent);
//
app.get('/teachers', teachers.findAll);
app.get('/teachers/:id', teachers.findOne);
app.get('/teachers/courses/:id',teachers.getcourses);
app.post('/teachers',teachers.addTeacher);
app.delete('/teachers/:id', teachers.deleteTeacher);

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
