let mongoose = require('mongoose');

let CoursesSchema = new mongoose.Schema({
        name: String,
        type: String,
        size: Number,
        room: String,
        time: Number,
    },
    { collection: 'courses' });

module.exports = mongoose.model('Courses', CoursesSchema);