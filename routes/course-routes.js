const express = require('express')
const router = express.Router()
const {createCourse, allCourse, updateCourse,  deleteCourse, viewCourseDetail, enrollCourse, getCourseQuiz, submitCourseQuiz, likeCourse, publishCourse, courseStats, searchCourse } = require('../controller/course');
const isAdmin = require('../middleware/admin-middleware');


// course routes 

router.post('/create', isAdmin, createCourse) // create course by admin
router.get('', allCourse) // fetch all course
router.post('/update/:id', updateCourse)
router.post('/delete/:id', deleteCourse)
router.post('/:id', viewCourseDetail)
router.post('/:id/enroll', enrollCourse)
router.get('/:id/quiz', getCourseQuiz)
router.post('/:id/quiz', submitCourseQuiz)
router.post('/:id/like', likeCourse)
router.patch('/:id/publish', publishCourse)
router.get('/:id/stats', courseStats)
router.get('/search?query=...', searchCourse)



module.exports = router;

