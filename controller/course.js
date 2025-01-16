const { response } = require('express')
const Course = require('../model/course')
const User = require('../model/user')

const allCourse = async (req, res) => {
 try {
  const course = await Course.find({})
  if(course) {
    return res.status(200).json({
      success: true,
      message: 'Courses fetched successfully',
      data: course,
    })
 } else{
  res.status(300).json({
    success: false,
    message: 'Couldn\'t find courses',
  })
 }
 } catch (error) {
  console.error(error)
  res.status(500).json({
    success: false,
    message: 'Something went wrong'
  })
 }
}
const createCourse = async (req, res) => {
 try {
    const formData = req.body;
    const newCourse = await Course.create(formData)
    if(newCourse){
     res.status(201).json({
      success: true,
      message: 'Course added successfully',
      data: newCourse,
     })
    } 
  } catch (error) {
   console.error(error)
   res.status(500).json({
     success: false,
     message: 'An error occurred while adding course.',
   })
  }
}
const  updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id
    const formData = req.body
    const updatedCourse = await Course.findByIdAndUpdate(courseId, formData, {
      new: true,
    })
    if (!updateCourse) {
      return res.status(404).json({
        success: false,
        message: "Couldn't update course",
      })
    } else {
      return res.status(201).json({
        success: true,
        message: 'Course updated successfully',
        data: updatedCourse,
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occur'
    })
  }
}
const  deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id
  const deletedCourse = await Course.findByIdAndDelete(courseId);
    if(!deletedCourse){
      res.status(404).json({
        success: false,
        message: 'couldn\'t find the course'
      })
    } else {
      res.status(201).json({
        success: true,
        message: 'Course deleted successfully',
        data: deletedCourse
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occur"
    })
  }
}
const  enrollCourse = async (req, res) => {
   try {
    const courseId = req.params.id;
    const userId = req.userInfo.id; // Retrieved from authentication middleware

    // find the course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    //  Checking if user is already enrolled
    if (course.enrolledUser.includes(userId)) {
      return res.status(400).json({ message: 'You are already enrolled in this course.' });
    }

    // Enroll the user
    course.enrolledUser.push(userId);
    await course.save();

    // update user's subscribed courses 
   const enrolled = await User.findByIdAndUpdate(userId, {
      $addToSet: { subscribedCourses: courseId },
    })

    // Step 5: Return success response
    return res.status(200).json({
      message: 'Successfully enrolled in the course!',
      data: enrolled
    });

  } catch (error) {
    console.error('Error enrolling to course:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
}
const  viewCourseDetail = async (req, res) => {
  try {
    const courseId = req.params.id
    const courseDetail = await Course.findById(courseId)
    if (!courseDetail) {
      res.status(404).json({
        success: false,
        message: "Couldn't find the course",
      })
    } else {
      return res.status(200).json({
        success: true,
        message: 'Course fetched successfully',
        data: courseDetail,
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong'
    })
  }
}
const  getCourseQuiz = (req, res) => {

}
const  submitCourseQuiz = (req, res) => {

}
const likeCourse = (req, res) => {

}
const publishCourse = (req, res) => {

}
const searchCourse = (req, res) => {

}
const courseStats = (req, res) => {

}



module.exports = {allCourse, createCourse, updateCourse, deleteCourse, viewCourseDetail, getCourseQuiz, likeCourse, submitCourseQuiz, publishCourse, searchCourse, courseStats, enrollCourse}