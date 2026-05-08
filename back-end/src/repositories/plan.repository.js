const { Plan, PlanSection } = require('../database/models');

class PlanRepository {

  async createPlan(data) {
    return await Plan.create(data);
  }

  async bulkCreateSections(sections) {
    return await PlanSection.bulkCreate(sections);
  }

  async getAll() {
    return await Plan.findAll({
      include: [{ model: PlanSection, as: 'sections' }]
    });
  }

  async findById(id) {
    return await Plan.findByPk(id, {
      include: [{ model: PlanSection, as: 'sections' }]
    });
  }

  async updatePlan(id, data) {
    return await Plan.update(data, { where: { id } });
  }
  async getSectionsByPlanId(plan_id) {
  return await PlanSection.findAll({
    where: { plan_id },
    order: [['order_no', 'ASC']]
  });
}

  async deleteSections(plan_id) {
    return await PlanSection.destroy({ where: { plan_id } });
  }

  async deletePlan(id) {
    return await Plan.destroy({ where: { id } });
  }

  async getBySubcategory(subcategory_id) {
  return await Plan.findAll({
    where: { subcategory_id },
    include: [
      {
        model: PlanSection,
        as: 'sections'
      }
    ],
    order: [['createdAt', 'DESC']]
  });
}
}

module.exports = new PlanRepository();