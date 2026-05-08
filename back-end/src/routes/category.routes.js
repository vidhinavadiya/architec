const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/category.controller');
const categoryController = new CategoryController();

const authMiddleware = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload/category_image.middleware');

// CREATE (Admin only + image upload)
router.post(
  '/create',
  authMiddleware,
  upload.single('image'),
  categoryController.createCategory
);

// UPDATE
router.put(
  '/update/:id',
  authMiddleware,
  upload.single('image'),
  categoryController.updateCategory
);

// DELETE
router.delete('/delete/:id', authMiddleware, categoryController.deleteCategory);

// PUBLIC
router.get('/all', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);

module.exports = router;