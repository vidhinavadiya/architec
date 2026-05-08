const SubCategoryService = require('../services/subcategory.service');
const subCategoryService = new SubCategoryService();

class SubCategoryController {

  create = async (req, res) => {
    try {
      const { title, description, categoryId } = req.body;

      const image = req.file ? req.file.filename : null;

      const data = await subCategoryService.createSubCategory({
        title,
        description,
        categoryId,
        image
      });

      res.status(201).json({ success: true, data });

    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false });
    }
  };

  getAll = async (req, res) => {
    const data = await subCategoryService.getAllSubCategories();
    res.json({ success: true, data });
  };

  getByCategory = async (req, res) => {
    const data = await subCategoryService.getByCategory(req.params.categoryId);
    res.json({ success: true, data });
  };

  update = async (req, res) => {
    const { title, description, categoryId } = req.body;

    const data = {
      title,
      description,
      categoryId
    };

    if (req.file) {
      data.image = req.file.filename;
    }

    await subCategoryService.updateSubCategory(req.params.id, data);

    res.json({ success: true, message: 'Updated' });
  };

  delete = async (req, res) => {
    await subCategoryService.deleteSubCategory(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  };
}

module.exports = SubCategoryController;