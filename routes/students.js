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

    var student = getByValue(students,req.params.id);

    if (student != null)
        res.send(JSON.stringify(student,null,5));
    else
        res.send('Student NOT Found!!');

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
    //Add a new donation to our list
    var id = Math.floor((Math.random() * 10000000) + 1); //Randomly generate an id
    // parameters to store
    // id (for id)
    // req.body.paymenttype (for paymenttype)
    // req.body.amount (for amount)
    // 0 (for upvotes)
    var currentSize = students.length;

    students.push({"id" : id,"name":req.body.name, "gender" : req.body.gender,"age":req.body.age, "college" : req.body.college,"course":req.body.course});

    if((currentSize + 1) == students.length)
        res.json({ message: 'Student Added!'});
    else
        res.json({ message: 'Student NOT Added!'});
}
router.incrementAge = (req, res) => {
    // Find the relevant donation based on params id passed in
    // Add 1 to upvotes property of the selected donation based on its id
    var student = getByValue(students,req.params.id);

    if (student != null) {
        student.age += 1;
        res.json({status : 200, message : 'Add age Successful' , student : student });
    }
    else
        res.send('Student NOT Found - Add age NOT Successful!!');

}
router.deleteStudent = (req, res) => {
    //Delete the selected donation based on its id
    var student = getByValue(students,req.params.id);
    var index = students.indexOf(student);

    var currentSize = students.length;
    students.splice(index, 1);

    if((currentSize - 1) == students.length)
        res.json({ message: 'Students Deleted!'});
    else
        res.json({ message: 'Students NOT Deleted!'});
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