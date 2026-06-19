const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const Admincontroller = require('../controllers/admin.controller');
const adminController = new Admincontroller();

router.post('/login',
    async (req,res) => {
        let result = await adminController.login(req);
        res.status(result.status).send(result);
    }
);

module.exports = router;