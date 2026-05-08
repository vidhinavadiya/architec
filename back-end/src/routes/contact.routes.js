const express = require('express');
const router = express.Router();

const ContactController = require('../controllers/contact.controller');
const contactController = new ContactController();

const authMiddleware = require('../middlewares/auth.middleware');

// USER → Send Message
router.post('/send', contactController.createContact);

// ADMIN → View all messages
router.get('/all', authMiddleware, contactController.getAllContacts);

// ADMIN → Delete message
router.delete('/delete/:id', authMiddleware, contactController.deleteContact);

module.exports = router;