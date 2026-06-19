const { Admin } = require('../database/models');

class AdminRepository {

    async findByEmail(email) {
        return await Admin.findOne({ where: { email } });
    }
    
}

module.exports = AdminRepository;