const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const authMiddleware = require('../middlewares/auth.middleware');


// if (process.env.ALLOW_ADMIN_REGISTER === 'true') {
//     router.post('/register', adminController.register);

// }

router.post('/login', adminController.login);

module.exports = router;