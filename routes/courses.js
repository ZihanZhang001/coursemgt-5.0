let mongoose = require('mongoose');
let express = require('express');
let router = express.Router();
var Course = require('../models/courses');

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
    var course = new Course();
    course.name = req.body.name;
    course.type = req.body.type;
    course.size = req.body.size;
    course.room = req.body.room;
    course.time = req.body.time;
    course.save(function(err) {
        if (err)
            res.json({ message: 'Course NOT Added!', errmsg : err } );
        else
            res.json({ message: 'Course Successfully Added!', data: course });
    });
}
router.incrementSize = (req, res) => {

    Course.findById(req.params.id, function(err,course) {
        if (err) {
            res.status(404);
            res.json({message: 'Course NOT Found!', errmsg: err});
        }
        else {
            course.size += 1;
            course.save(function (err) {
                if (err)
                    res.json({ message: 'Course NOT Increment size!', errmsg : err } );
                else
                    res.json({ message: 'Course Successfully Increment size!', data: course });
            });
        }
    });
}

router.deleteCourse = (req, res) => {
    //Delete the selected donation based on its id
    Course.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.status(404);
            res.json({message: 'Course NOT DELETED!', errmsg: err});
        }
        else
            res.json({ message: 'Course Successfully Deleted!'});
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
// var mongodbUri ='mongodb://coursesdb:a123456@ds139883.mlab.com:39883/coursesdb';
// mongoose.connect(mongodbUri);
module.exports = router;