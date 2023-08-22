function addedRowLockOnFlights(menuId){
 return `SELECT * FROM restaurant_menus WHERE restaurant_menus.id=${menuId} FOR UPDATE;`
}

module.exports ={
    addedRowLockOnFlights
}