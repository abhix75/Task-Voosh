const {StatusCodes}=require("http-status-codes")
const {  RestaurantRepository} = require('../repositories');
const AppError = require('../utils/error/app-error');



const restaurantRepository = new RestaurantRepository();

async function createMenu(data)
{
    try {
        const menu = await restaurantRepository.create(data);
        return menu;

    } catch (error) {
    
        {
    
            if(error.name == 'SequelizeValidationError')
            {
                //console.log(error);
                let explanation =[];
                error.errors.forEach((err)=>{
                    explanation.push(err.message);
                    explanation.push(err.value);

                });
                console.log(explanation);
    
                throw new AppError(explanation,StatusCodes.BAD_REQUEST);
            }
            
            throw new AppError("cannot create new Airplane object",StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}
async function getMenus()
{
    try {
        const menu = await restaurantRepository.getAll();
        return menu;
    } catch (error) {
       throw new AppError("Not Able to get All the Airplane objects",StatusCodes.INTERNAL_SERVER_ERROR); 
    }
}
async function getMenu(id)
{
    try {
        const menu = await restaurantRepository.get(id);
        return menu;
    } catch (error) {
        if(error.statusCodes==StatusCodes.NOT_FOUND)
        {
            throw new AppError("THE AEROPLANE YTHAT YOU HAVE REQUESTED IS NOT PRESENT",error.statusCodes)
        }
       throw new AppError("Not Able to get  the Airplane objects",StatusCodes.INTERNAL_SERVER_ERROR); 
    }
}


module.exports=
{
    createMenu,
    getMenus,
    getMenu,
    
}
