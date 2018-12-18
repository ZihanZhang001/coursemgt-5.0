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
router.addUser = (req, res) => {
    var user = new User();
    user.name = req.body.name;
    user.pass = req.body.pass;
    user.nickName = req.body.nickName;
    user.save(function(err) {
        if (err)
            res.json({ message: 'User NOT Added!', errmsg : err } );
        else
            res.json({ message: 'User Successfully Added!', data: user });
    });
}
module.exports = router;
