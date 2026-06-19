const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const Admincontroller = require('../controllers/admin.controller');
const adminController = new Admincontroller();

router.post('/login', adminController.login);

module.exports = router;