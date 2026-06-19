const AdminService = require('../services/admin.service');

class Admincontroller {
    constructor() {
        this.adminService = new AdminService();
    }

    login = async (req, res) => {
        try {
            const data = await this.adminService.login(req.body);
            res.json({ message: "Login successful", data });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
}

module.exports = Admincontroller;