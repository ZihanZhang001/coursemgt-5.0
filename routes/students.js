let mongoose = require('mongoose');
var Student = require('../models/students');
let express = require('express');
let router = express.Router();


function getByName(array, name) {
    var result  = array.filter(function(obj){return obj.name.toUpperCase() === name.toUpperCase();} );
    return result ? result[0] : null; // or undefined
}
router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');
    Student.find(function(err, students) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(students,null,5));
    });
}
router.findOne = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Student.find({ "_id" : req.params.id },function(err, student) {
        if (err)
            res.json({ message: 'Student NOT Found!', errmsg : err } );
        else
            res.send(JSON.stringify(student,null,5));
    });

}
router.findOneByname = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var student = getByName(students,req.params.name);

    if (student != null)
        res.send(JSON.stringify(student,null,5));
    else
        res.send('Student NOT Found!!');

}
router.addStudent = (req, res) => {
    var student = new Student();
    student.name = req.body.name;
    student.gender = req.body.gender;
    student.age = req.body.age;
    student.college = req.body.college;
    student.courses_id =req.body. courses_id;
    student.save(function(err) {
        if (err)
            res.json({ message: 'Student NOT Added!', errmsg : err } );
        else
            res.json({ message: 'Student Successfully Added!', data: student });
    });
}
router.incrementAge = (req, res) => {

    Student.findById(req.params.id, function(err,student) {
        if (err)
            res.json({ message: 'Student NOT Found!', errmsg : err } );
        else {
            student.age += 1;
            student.save(function (err) {
                if (err)
                    res.json({ message: 'Student NOT Increment size!', errmsg : err } );
                else
                    res.json({ message: 'Student Successfully Increment size!', data: student });
            });
        }
    });
}
router.deleteStudent = (req, res) => {
    //Delete the selected donation based on its id
    Student.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.json({ message: 'Student NOT DELETED!', errmsg : err } );
        else
            res.json({ message: 'Student Successfully Deleted!'});
    });
}

router.fuzzystudent = (req,res) => {
    res.setHeader('Content-Type', 'application/json');
    const keyword = req.params.keyword;
    const reg=new RegExp(keyword,'i');
    Student.find({name:{$regex:reg}},function(err,student){
        if(err)
            res.send(err);
        else
            res.json(student,null,5);
    });
}
mongoose.connect('mongodb://localhost:27017/coursesdb');

let db = mongoose.connection;

db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});

db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ]');
});
module.exports = router;
module.exports = router;