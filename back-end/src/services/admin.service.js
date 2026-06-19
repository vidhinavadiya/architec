const AdminRepository = require('../repositories/admin.repository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AdminService {

    constructor() {
        this.adminRepository = new AdminRepository();
    }

    // Login
    async login(data) {
        const { email, password } = data;

        const admin = await this.adminRepository.findByEmail(email);
        if (!admin) throw new Error('Admin not found');

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) throw new Error('Invalid password');

        const token = jwt.sign(
            { id: admin.id, email: admin.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        return { admin, token };
    }
}

module.exports = AdminService;