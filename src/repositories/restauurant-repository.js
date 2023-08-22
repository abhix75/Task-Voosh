const CrudRepository = require('./crud-repository');

const {Restaurant_Menu }= require('../models');
const db = require('../models')
const {addedRowLockOnFlights}=require('./queries')
class RestaurantRepository extends CrudRepository
{
     constructor()
     {
        super(Restaurant_Menu);
     }
     async updateRemainingfood(menuId,quantity,dec = true){
      console.log("quantity",quantity)
      const transaction = await db.sequelize.transaction();
      try {
          await db.sequelize.query(addedRowLockOnFlights(menuId));
          const flight = await Restaurant_Menu.findByPk(menuId);
          console.log("dec",typeof(dec));
          if(+(dec)) {
            console.log("quantity",quantity)
              await flight.decrement('Capacity', {by: quantity},{transaction:transaction});
          } else {
              await flight.increment('Capacity', {by: quantity},{transaction:transaction});
          }
          await transaction.commit();
          return flight;
      } catch (error) {
          await transaction.rollback();
          throw error;
      }

  
  }
     
}

module.exports = RestaurantRepository;