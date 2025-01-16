const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: [true, 'level is required'],
  },
  thumbnail: { type: String, required: [true, 'Course thumbnail is required'] }, // Course displayed image
  content: { type: String, required: [true, 'Content is required'] }, // Markdown or rich-text content
  media: [{ type: String }], // URLs for images or videos
  quiz: [
    {
      question: { type: String, required: true },
      options: [{ type: String, required: true }],
      correctAnswer: { type: Number, required: true }, // Index of the correct option
    },
  ],
  likes: { type: Number},
  duration: { type: String, required: true },
  rewardTokens: { type: Number, default: 0 },
  price: { type: Number, default: 0 },
  enrolledUser: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  isPublished: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

// Virtual property for number of subscribers
CourseSchema.virtual('numberOfSubscriber').get(function () {
  return this.enrolledUser.length
})

// Ensure virtuals are included when converting to JSON or Object
CourseSchema.set('toJSON', { virtuals: true })
CourseSchema.set('toObject', { virtuals: true })

const Course = mongoose.model('Course', CourseSchema)

module.exports = Course
