const mongoose = require('mongoose')

const Course = new mongoose.Schema({
 title: {
  type: String,
  required: [true, 'Course title is required']
 },
 description: {
  type: String,
  required: [true, 'Description is required']
 },
 
})