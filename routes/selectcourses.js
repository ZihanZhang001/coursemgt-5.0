let selectcourses = require('../models/selectcourses');
let express = require('express');
let router = express.Router();

function getByValue(array, code) {
    var result  = array.filter(function(obj){return obj.code == code;} );
    return result ? result[0] : null; // or undefined
}

router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(selectcourses,null,5));
}

router.findOne = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var selectcourse = getByValue(selectcourses,req.params.code);

    if (selectcourse != null)
        res.send(JSON.stringify(selectcourse,null,5));
    else
        res.send('Record NOT Found!!');

}

router.addRecord = (req, res) => {
    //Add a new donation to our list
    var code = Math.floor((Math.random() * 100000000) + 1); //Randomly generate an id

    var currentSize = selectcourses.length;

    selectcourses.push({"code" : code,"coursecode":req.body.coursecode, "stuid" : req.body.stuid,"time":req.body.time});

    if((currentSize + 1) == selectcourses.length)
        res.json({ message: 'Record Added!'});
    else
        res.json({ message: 'Record NOT Added!'});
}

router.deleteRecord = (req, res) => {
    //Delete the selected donation based on its id
    var record = getByValue(selectcourses,req.params.code);
    var index = selectcourses.indexOf(record);

    var currentSize = selectcourses.length;
    selectcourses.splice(index, 1);

    if((currentSize - 1) == selectcourses.length)
        res.json({ message: 'Record Deleted!'});
    else
        res.json({ message: 'Record NOT Deleted!'});
}

module.exports = router;