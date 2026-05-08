const CategoryRepository = require('../repositories/category.repository');

class CategoryService {
  constructor() {
    this.categoryRepository = new CategoryRepository();
  }

  createCategory = async (data) => {
    return await this.categoryRepository.create(data);
  };

  getAllCategories = async () => {
    return await this.categoryRepository.findAll();
  };

  getCategoryById = async (id) => {
    return await this.categoryRepository.findById(id);
  };

  updateCategory = async (id, data) => {
    return await this.categoryRepository.update(id, data);
  };

  deleteCategory = async (id) => {
    return await this.categoryRepository.delete(id);
  };
}

module.exports = CategoryService;