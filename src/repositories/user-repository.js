const CrudRepository = require('./crud-repository');

const {User} = require('../models');

class UserRepository extends CrudRepository {

    constructor(){
        super(User);
    }

    async getUserBynumber(phone_number) {
        const user = await User.findOne({where: { phone_number:phone_number}});
        return user;
    }
}

module.exports = UserRepository;