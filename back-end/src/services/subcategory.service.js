const SubCategoryRepository = require('../repositories/subcategory.repository');

class SubCategoryService {
  constructor() {
    this.subCategoryRepository = new SubCategoryRepository();
  }

  createSubCategory = async (data) => {
    return await this.subCategoryRepository.create(data);
  };

  getAllSubCategories = async () => {
    return await this.subCategoryRepository.findAll();
  };

  getSubCategoryById = async (id) => {
    return await this.subCategoryRepository.findById(id);
  };

  getByCategory = async (categoryId) => {
    return await this.subCategoryRepository.findByCategory(categoryId);
  };

  updateSubCategory = async (id, data) => {
    return await this.subCategoryRepository.update(id, data);
  };

  deleteSubCategory = async (id) => {
    return await this.subCategoryRepository.delete(id);
  };
}

module.exports = SubCategoryService;