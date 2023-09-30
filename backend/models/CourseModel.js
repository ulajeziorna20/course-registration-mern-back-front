const mongoose = require('mongoose');

const Course = new mongoose.Schema(
  {
    name: String,
    course: String,
    city: String
  },
  { timestamps: true }


)
module.exports = mongoose.model('CourseModel', Course)