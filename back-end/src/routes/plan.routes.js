const express = require('express');
const router = express.Router();
const controller = require('../controllers/plan.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload/plan_image.middleware');


// Admin only
router.post('/create', authMiddleware,
      upload.fields([
    { name: 'icon', maxCount: 1 },
    { name: 'section_images', maxCount: 20 }
  ]), controller.create);
router.put('/update/:id', authMiddleware,
      upload.fields([
    { name: 'icon', maxCount: 1 },
    { name: 'section_images', maxCount: 20 }
  ]), controller.update);
router.delete('/delete/:id', authMiddleware, controller.delete);

// Public
router.get('/all', controller.getAll);
router.get('/subcategory/:subcategory_id', controller.getBySubcategory);
module.exports = router;