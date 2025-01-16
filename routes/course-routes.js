const express = require('express')
const router = express.Router()
const {createCourse, allCourse, updateCourse,  deleteCourse, viewCourseDetail, enrollCourse, getCourseQuiz, submitCourseQuiz, likeCourse, publishCourse, courseStats, searchCourse } = require('../controller/course');
const isAdmin = require('../middleware/admin-middleware');
const authMiddleware = require('../middleware/auth-middleware');


// course routes 

router.post('/create', authMiddleware, isAdmin, createCourse) // create course by admin
router.get('', authMiddleware, allCourse) // fetch all course
router.put('/update/:id',authMiddleware, isAdmin, updateCourse) // update course
router.delete('/delete/:id',authMiddleware, isAdmin, deleteCourse) //delete course
router.get('/:id', authMiddleware, viewCourseDetail) //view single course details 
router.post('/:id/enroll', authMiddleware, enrollCourse) 
router.get('/:id/quiz', authMiddleware, getCourseQuiz)
router.post('/:id/quiz', authMiddleware, submitCourseQuiz)
router.post('/:id/like', authMiddleware, likeCourse)
router.patch('/:id/publish', authMiddleware, publishCourse)
router.get('/:id/stats', authMiddleware, courseStats)
router.get('/search?query=...', authMiddleware, searchCourse)



module.exports = router;

