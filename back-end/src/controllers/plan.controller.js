const planService = require('../services/plan.service');
const planRepository = require('../repositories/plan.repository');

class PlanController {

    async create(req, res) {
  try {

    const body = req.body;

    // icon
if (req.files && req.files.icon && req.files.icon.length > 0) {
  body.icon = req.files.icon[0].filename;
}

    // sections array banayenge
    body.sections = [];

    // images add karo
if (req.files && req.files.section_images) {
        req.files.section_images.forEach(file => {
        body.sections.push({
          type: 'image',
          content: file.filename
        });
      });
    }

    // text add karo
    if (req.body.section_text) {

      // agar multiple text aaye to array hoga
      const texts = Array.isArray(req.body.section_text)
        ? req.body.section_text
        : [req.body.section_text];

      texts.forEach(txt => {
        body.sections.push({
          type: 'text',
          content: txt
        });
      });
    }

    const plan = await planService.createPlan(body);

    res.json({ success: true, plan });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

  async getAll(req, res) {
    const data = await planService.getPlans();
    res.json(data);
  }

  async update(req, res) {
  try {

    const body = req.body;

    // icon update
    if (req.files.icon) {
      body.icon = req.files.icon[0].filename;
    }

    body.sections = [];

    // images
    if (req.files.section_images) {
      req.files.section_images.forEach(file => {
        body.sections.push({
          type: 'image',
          content: file.filename
        });
      });
    }

    // text
    if (req.body.section_text) {
      const texts = Array.isArray(req.body.section_text)
        ? req.body.section_text
        : [req.body.section_text];

      texts.forEach(txt => {
        body.sections.push({
          type: 'text',
          content: txt
        });
      });
    }

    await planService.updatePlan(req.params.id, body);

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

  async delete(req, res) {
    await planService.deletePlan(req.params.id);
    res.json({ success: true });
  }

  async getBySubcategory(req, res) {
  try {
    const subId = req.params.subcategory_id;

    const plans = await planRepository.getBySubcategory(subId);

    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
}

module.exports = new PlanController();