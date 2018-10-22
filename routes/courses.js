let mongoose = require('mongoose');
let course = require('../models/courses');
let express = require('express');
let router = express.Router();
var Course = require('../models/courses');
function getByValue(array, code) {
    var result  = array.filter(function(obj){return obj.code == code;} );
    return result ? result[0] : null; // or undefined
}
function getTotalSize(array) {
    let totalSize = 0;
    array.forEach(function(obj) { totalSize += obj.size; });
    return totalSize;
}
router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');
    Course.find(function(err, courses) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(courses,null,5));
    });
}
router.findOne = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Course.find({ "_id" : req.params.id },function(err, course) {
        if (err)
            res.json({ message: 'Course NOT Found!', errmsg : err } );
        else
            res.send(JSON.stringify(course,null,5));
    });

}
router.addCourse = (req, res) => {
    //Add a new donation to our list
    var code = Math.floor((Math.random() * 100000) + 1); //Randomly generate an id
    // parameters to store
    // id (for id)
    // req.body.paymenttype (for paymenttype)
    // req.body.amount (for amount)
    // 0 (for upvotes)
    var currentSize = course.length;

    course.push({"code" : code,"name":req.body.name, "type" : req.body.type, "size" : req.body.size, "lecturer" : req.body.lecturer,"room": req.body.room,"time":req.body.time});

    if((currentSize + 1) == course.length)
        res.json({ message: 'Course Added!'});
    else
        res.json({ message: 'Course NOT Added!'});
}
router.incrementSize = (req, res) => {
    // Find the relevant donation based on params id passed in
    // Add 1 to upvotes property of the selected donation based on its id
    var cours = getByValue(course,req.params.code);

    if (cours != null) {
        cours.size += 1;
        res.json({status : 200, message : 'Add size Successful' , cours : cours });
    }
    else
        res.send('Course NOT Found - Add size NOT Successful!!');

}
router.deleteCourse = (req, res) => {
    //Delete the selected donation based on its id
    var cours = getByValue(course,req.params.code);
    var index = course.indexOf(cours);

    var currentSize = course.length;
    course.splice(index, 1);

    if((currentSize - 1) == course.length)
        res.json({ message: 'Course Deleted!'});
    else
        res.json({ message: 'Course NOT Deleted!'});
}
router.findTotalSize = (req, res) => {

    let size = getTotalSize(course);
    res.json({totalsize : size});
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