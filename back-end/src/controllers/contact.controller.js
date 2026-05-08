const ContactService = require('../services/contact.service');

class ContactController {
  constructor() {
    this.contactService = new ContactService();
  }

  createContact = async (req, res) => {
    try {
      const contact = await this.contactService.createContact(req.body);
      res.status(201).json({
        success: true,
        message: "Message sent successfully",
        data: contact
      });
    } catch (error) {
  res.status(400).json({
    success: false,
    message: error.message
  });
}
  };

  getAllContacts = async (req, res) => {
    try {
      const contacts = await this.contactService.getAllContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  deleteContact = async (req, res) => {
    try {
      await this.contactService.deleteContact(req.params.id);
      res.json({ message: "Deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

module.exports = ContactController;