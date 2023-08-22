const CrudRepository = require('./crud-repository');

const {Restaurant_Menu }= require('../models');


class RestaurantRepository extends CrudRepository
{
     constructor()
     {
        super(Restaurant_Menu);
     }
}

module.exports = RestaurantRepository;