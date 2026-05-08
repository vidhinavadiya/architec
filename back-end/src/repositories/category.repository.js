const { Category } = require('../database/models');

class CategoryRepository {
  create = async (data) => {
    return await Category.create(data);
  };

  findAll = async () => {
    return await Category.findAll({ order: [['createdAt', 'DESC']] });
  };

  findById = async (id) => {
    return await Category.findByPk(id);
  };

  update = async (id, data) => {
    return await Category.update(data, { where: { id } });
  };

  delete = async (id) => {
    return await Category.destroy({ where: { id } });
  };
}

module.exports = CategoryRepository;