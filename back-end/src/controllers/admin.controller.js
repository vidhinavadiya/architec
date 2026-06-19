const AdminService = require('../services/admin.service');
const { successResponse, serverError } = require('../helpers/response');

class Admincontroller {
    constructor() {
        this.adminService = new AdminService();
    }

    login = async (req) => {
        try {
            const result = await this.adminService.login(req.body);
            return successResponse({
                success: true,
                message: 'Login Successfully',
                data: result
            });
        } catch (error) {
            return serverError({
                success: false,
                message: error.message
            });
        }
    };
}

module.exports = Admincontroller;