const { StatusCodes }= require('http-status-codes');

const { UserService} = require('../services/index');
const User = require('../models/user');
const { SuccessResponse, ErrorResponse } = require('../utils/common');




async function signup(req,res)
{
     try {
        console.log("req.body ",req.body)
        const user = await UserService.create({
            name: req.body.name,
            phone_number:req.body.phone_number,
            password: req.body.password,
         
        });
        SuccessResponse.data = user;
        return res
                 .status(StatusCodes.CREATED)
                 .json(SuccessResponse)
    } catch (error)
     {
        console.log(error)
        ErrorResponse.error=error;
        return res
                 .status(error.statusCodes)
                 .json(ErrorResponse)
     }
 }


 module.exports={
    signup,
   
 }