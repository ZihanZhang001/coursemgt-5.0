let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
var Teacher = require('../models/teachers');

router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');
    Teacher.find(function(err, teachers) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(teachers,null,5));
    });
}
router.findOne = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Teacher.find({ "_id" : req.params.id },function(err, teacher) {
        if (err)
            res.json({ message: 'Teacher NOT Found!', errmsg : err } );
        else
            res.send(JSON.stringify(teacher,null,5));
    });
}
router.addTeacher = (req, res) => {

    var teacher = new Teacher();
    teacher.name = req.body.name;
    teacher.gender = req.body.gender;
    teacher.courses_id = req.body.courses_id;
    teacher.save(function(err) {
        if (err)
            res.json({ message: 'Teacher NOT Added!', errmsg : err } );
        else
            res.json({ message: 'Teacher Successfully Added!', data: teacher });
    });
}
router.deleteTeacher = (req, res) => {
    //Delete the selected donation based on its id
    Teacher.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.json({ message: 'Teacher NOT DELETED!', errmsg : err } );
        else
            res.json({ message: 'Teacher Successfully Deleted!'});
    });
}
// mongoose.connect('mongodb://localhost:27017/coursesdb');
//
// let db = mongoose.connection;
//
// db.on('error', function (err) {
//     console.log('Unable to Connect to [ ' + db.name + ' ]', err);
// });
//
// db.once('open', function () {
//     console.log('Successfully Connected to [ ' + db.name + ' ]');
// });
var config = require('../_config');
var app = express();
// *** mongoose *** ///
mongoose.connect(config.mongoURI[app.settings.env], function(err, res) {
    if(err) {
        console.log('Error connecting to the database. ' + err);
    } else {
        console.log('Connected to Database: ' + config.mongoURI[app.settings.env]);
    }
});
module.exports = router;