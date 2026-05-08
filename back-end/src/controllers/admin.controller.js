const AdminService = require('../services/admin.service');
const adminService = new AdminService();

// exports.register = async (req, res) => {
//     try {
//         const data = await adminService.register(req.body);
//         res.json({ message: "Admin created", data });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

exports.login = async (req, res) => {
    try {
        const data = await adminService.login(req.body);
        res.json({ message: "Login successful", data });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};