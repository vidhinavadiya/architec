const express = require('express');
const router = express.Router();

const SubCategoryController = require('../controllers/subcategory.controller');
const controller = new SubCategoryController();

const authMiddleware = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');

// ADMIN
router.post('/create', authMiddleware,
    (req,res,next)=>{
      req.uploadFolder = 'subCategories';
      next();
  }, 
    upload.single('image'), controller.create);
router.put('/update/:id', authMiddleware,
      (req,res,next)=>{
      req.uploadFolder = 'subCategories';
      next();
  }, 
    upload.single('image'), controller.update);
router.delete('/delete/:id', authMiddleware, controller.delete);

// PUBLIC
router.get('/all', controller.getAll);
router.get('/category/:categoryId', controller.getByCategory);

module.exports = router;