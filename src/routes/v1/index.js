const express = require('express');
// const{AuthRequestMiddleWares}=require('../../middlewares')

const { InfoController } = require('../../controllers');
const userRoutes= require('./user-routes.js')
const router = express.Router();

router.get('/info',InfoController.info);
router.use('/user', userRoutes);

module.exports = router;