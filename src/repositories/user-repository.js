const CrudRepository = require('./crud-repository');

const {User} = require('../models');

class UserRepository extends CrudRepository {

    constructor(){
        super(User);
    }

    async getUserBynumber(number) {
        const user = await User.findOne({where: { number:number}});
        return user;
    }
}

module.exports = UserRepository;