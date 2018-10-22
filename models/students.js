let mongoose = require('mongoose');

let StudentsSchema = new mongoose.Schema({
        name: String,
        gender: String,
        age: Number,
        college: String,
        courses_id:[{type: mongoose.Schema.ObjectId, ref:'Courses'}]
    },
    { collection: 'students' });

module.exports = mongoose.model('Students', StudentsSchema);