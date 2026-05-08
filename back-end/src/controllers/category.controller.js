const CategoryService = require('../services/category.service');
const categoryService = new CategoryService();

class CategoryController {
createCategory = async (req, res) => {
  try {
    const { title, description } = req.body;

    const image = req.file ? req.file.filename : null;

    const category = await categoryService.createCategory({
      title,
      description,
      image
    });

    res.status(201).json({ success: true, category });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

  getAllCategories = async (req, res) => {
    try {
      const categories = await categoryService.getAllCategories();
      res.json({ success: true, categories });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };

  getCategoryById = async (req, res) => {
    try {
      const category = await categoryService.getCategoryById(req.params.id);
      if (!category) return res.status(404).json({ success: false, message: 'Category not found' });
      res.json({ success: true, category });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };

updateCategory = async (req, res) => {
  try {
    const { title, description } = req.body;

    const data = {
      title,
      description
    };

    if (req.file) {
      data.image = req.file.filename;
    }

    await categoryService.updateCategory(req.params.id, data);

    res.json({ success: true, message: 'Category updated successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

  deleteCategory = async (req, res) => {
    try {
      await categoryService.deleteCategory(req.params.id);
      res.json({ success: true, message: 'Category deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };
}

module.exports = CategoryController;