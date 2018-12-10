var express = require('express');
var router = express.Router();

var User = require('../models/users')

router.validate = (req, res) => {
    User.findOne({name: req.body.name, pass: req.body.pass}, (err, user) => {
        if (err) {
            console.log(err)
        }
        res.json(user)
    })
}

module.exports = router;
