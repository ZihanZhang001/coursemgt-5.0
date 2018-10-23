let mongoose = require('mongoose');

let TeachersSchema = new mongoose.Schema({
        name: String,
        gender: String,
        courses_id:[{type: mongoose.Schema.ObjectId, ref:'Courses'}]
    },
    { collection: 'teachers' });

module.exports = mongoose.model('Teachers', TeachersSchema);