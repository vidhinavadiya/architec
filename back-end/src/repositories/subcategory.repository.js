const { SubCategory, Category } = require('../database/models');

class SubCategoryRepository {

  create = async (data) => {
    return await SubCategory.create(data);
  };

  findAll = async () => {
    return await SubCategory.findAll({
      include: [{ model: Category, as: 'category' }],
      order: [['createdAt', 'DESC']]
    });
  };

  findById = async (id) => {
    return await SubCategory.findByPk(id, {
      include: [{ model: Category, as: 'category' }]
    });
  };

  findByCategory = async (categoryId) => {
    return await SubCategory.findAll({
      where: { categoryId }
    });
  };

  update = async (id, data) => {
    return await SubCategory.update(data, { where: { id } });
  };

  delete = async (id) => {
    return await SubCategory.destroy({ where: { id } });
  };
}

module.exports = SubCategoryRepository;