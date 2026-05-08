const ContactRepository = require('../repositories/contact.repository');
const nodemailer = require('nodemailer');

class ContactService {
  constructor() {
    this.contactRepo = new ContactRepository();
  }

  async createContact(data) {

    // 1. Save to DB
    const contact = await this.contactRepo.createContact(data);

    // 2. Send Email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
    });

    await transporter.sendMail({
      from: data.email,
      to: 'vidhinavadiya4@gmail.com',
      subject: `New Contact: ${data.subject}`,
      text: `
        Name: ${data.name}
        Email: ${data.email}
        Message: ${data.message}
      `
    });

    return contact;
  }

  async getAllContacts() {
    return await this.contactRepo.getAllContacts();
  }

  async deleteContact(id) {
    return await this.contactRepo.deleteContact(id);
  }
}

module.exports = ContactService;