const {StatusCodes}=require("http-status-codes")
const { UserRepository} = require('../repositories');
const AppError = require('../utils/error/app-error');
const {Auth,Enums}=require('../utils/common');
const userRepository = new UserRepository();



async function create(data)
{
    try {
        const user = await userRepository.create(data);
        return user;

    } catch (error) {
          console.log(error);
        if(error.name == 'SequelizeValidationError'|| error.name == 'SequelizeUniqueConstraintError')
        {
            let explanation =[];
            console.log(error);
            error.errors.forEach((err)=>{
                explanation.push(err.message);
            });
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        
        throw new AppError("cannot create new user object",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function signin(data) {
    try {
        const user = await userRepository.getUserBynumber(data.phone_number);
        if(!user){
            throw new AppError('No User Found For This Number',StatusCodes.NOT_FOUND);
        }
        const passwordMatch=Auth.checkPassword(data.password,user.password);
        console.log("Password Match",passwordMatch);
        if(!passwordMatch){
            throw new AppError("INVALID PASSWORD",StatusCodes.BAD_REQUEST);
        }

        const jwt = Auth.createToken({id:user.id,phone_number:user.phone_number});
        return jwt;
    } catch (error) {
          if(error instanceof AppError) throw error;
          console.log(error);
          throw new AppError('Something went wrong',StatusCodes.INTERNAL_SERVER_ERROR);

    }
}


async function isAuthenticated(token){
    try {
        if(!token){
            throw new AppError('Missing GWT token',StatusCodes.BAD_REQUEST);
        }
        const response = Auth.verifyToken(token);
        const user = await userRepository.get(response.id);
        if(!user){
            throw new AppError('No user Found',StatusCodes.NOT_FOUND);
        }
        return user.id;
    } catch (error) {
        if(error instanceof AppError) throw error;
        if(error.name=='JsonWebTokenError'){
            throw new AppError('Invalid JWT token',StatusCodes.BAD_REQUEST);
        }
        if(error.name == 'TokenExpiredError') {
            throw new AppError('JWT token expired', StatusCodes.BAD_REQUEST);
        }
        console.log(error);
        throw new AppError('Something went wrong',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}



module.exports={
    create,
    signin,
    isAuthenticated
}