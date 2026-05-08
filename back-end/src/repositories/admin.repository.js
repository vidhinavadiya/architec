const { Admin } = require('../database/models');

class AdminRepository {

    // async create(data) {
    //     return await Admin.create(data);
    // }

    async findByEmail(email) {
        return await Admin.findOne({ where: { email } });
    }
//     async countAdmins() {
//     return await Admin.count();
// }
}

module.exports = AdminRepository;