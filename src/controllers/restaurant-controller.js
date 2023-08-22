const { StatusCodes }= require('http-status-codes');

const { RestaurantService } = require('../services/index');

const { SuccessResponse, ErrorResponse } = require('../utils/common');




async function create(req,res)
{
     try {
        const airplane = await RestaurantService.createMenu({
            FoodMenu: req.body.FoodMenu,
            Capacity: req.body.Capacity,
            Price:req.body.Price
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



module.exports   =
{
    create,
    getmenus,
    getmenu,
    
}