const planRepository = require('../repositories/plan.repository');

class PlanService {

  async createPlan(data) {
    const { sections, ...planData } = data;

    const plan = await planRepository.createPlan(planData);

const formattedSections = (sections || []).map((sec, index) => ({
        plan_id: plan.id,
      type: sec.type,
      content: sec.content,
      order_no: index + 1
    }));

    await planRepository.bulkCreateSections(formattedSections);

    return plan;
  }

  async getPlans() {
    return await planRepository.getAll();
  }
async updatePlan(id, data) {

  const { sections, ...planData } = data;

  // update basic plan
  await planRepository.updatePlan(id, planData);

  // old sections lo
  const oldSections = await planRepository.getSectionsByPlanId(id);

  let finalSections = [];

  if (sections && sections.length > 0) {

    sections.forEach((sec, index) => {

      // agar new content hai to use karo
      if (sec.content) {
        finalSections.push({
          plan_id: id,
          type: sec.type,
          content: sec.content,
          order_no: index + 1
        });
      } 
      
      // agar empty hai to old data use karo
      else if (oldSections[index]) {
        finalSections.push({
          plan_id: id,
          type: oldSections[index].type,
          content: oldSections[index].content,
          order_no: index + 1
        });
      }

    });

  } else {
    // agar sections nahi aaye to purana hi rakho
    finalSections = oldSections.map((sec, index) => ({
      plan_id: id,
      type: sec.type,
      content: sec.content,
      order_no: index + 1
    }));
  }

  // delete old
  await planRepository.deleteSections(id);

  // insert new merged
  await planRepository.bulkCreateSections(finalSections);
}

  async deletePlan(id) {
    await planRepository.deleteSections(id);
    await planRepository.deletePlan(id);
  }
}

module.exports = new PlanService();