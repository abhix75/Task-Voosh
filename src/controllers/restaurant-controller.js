const { StatusCodes }= require('http-status-codes');

const { RestaurantService } = require('../services/index');

const { SuccessResponse, ErrorResponse } = require('../utils/common');




async function create(req,res)
{
     try {
        const airplane = await RestaurantService.createMenu({
            
            FoodMenu: req.body.FoodMenu,
            Capacity: req.body.Capacity,
            Price:req.body.Price,
            MenuID: req.body.MenuID,
        });
        SuccessResponse.data = airplane;
        return res
                 .status(StatusCodes.CREATED)
                 .json(SuccessResponse)
    } catch (error)
     {
        ErrorResponse.error=error;
        return res
                 .status(error.statusCodes)
                 .json(ErrorResponse)
     }
}
async function getmenus(req,res)
{
    try {
        const menu = await RestaurantService.getMenus();
        SuccessResponse.data=menu;
        return res 
                 .status(StatusCodes.OK)
                 .json(SuccessResponse)
                 
    } catch (error) {
        ErrorResponse.error=error;
        return res 
                 .status(error.statusCodes)
                 .json(ErrorResponse)
    }
}
async function getmenu(req,res)
{
    try {
        const menu = await RestaurantService.getMenu(req.params.id);
        SuccessResponse.data=menu;
        return res 
                 .status(StatusCodes.OK)
                 .json(SuccessResponse)
                 
    } catch (error) {
        ErrorResponse.error=error;
        return res 
                 .status(error.statusCodes)
                 .json(ErrorResponse)
    }
}
async function update(req, res) {
    try {
        console.log("inside update seats");
        console.log(req.body);
        const response = await RestaurantService.updatefood({
            menuId: req.params.id,
            quantity: req.body.quantity, 
            dec: req.body.dec
        });
        SuccessResponse.data = response;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}


module.exports   =
{
    create,
    getmenus,
    getmenu,
    update

    
}