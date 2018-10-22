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
mongoose.connect('mongodb://localhost:27017/coursesdb');

let db = mongoose.connection;

db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});

db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ]');
});

module.exports = router;