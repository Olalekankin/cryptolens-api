const express = require('express');
const router = express.Router();
const {dashboard} = require('../controller/protected-routes')
const authMiddleware = require('../middleware/auth-middleware')
const isAdmin = require('../middleware/admin-middleware')

router.get('/dashboard', authMiddleware, dashboard);
router.get('/admin/dashboard', authMiddleware, isAdmin, dashboard);


module.exports = router;