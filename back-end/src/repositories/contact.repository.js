const { Contact } = require('../database/models');

class ContactRepository {

  async createContact(data) {
    return await Contact.create(data);
  }

  async getAllContacts() {
    return await Contact.findAll({
      order: [['createdAt', 'DESC']]
    });
  }

  async deleteContact(id) {
    return await Contact.destroy({ where: { id } });
  }
}

module.exports = ContactRepository;