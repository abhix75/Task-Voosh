const express = require('express');
const{AuthRequestMiddleWares}=require('../../middlewares')

const { InfoController } = require('../../controllers');
const userRoutes= require('./user-routes.js')
const MenuRoutes= require('./restaurant-routes')
const router = express.Router();

router.get('/info',AuthRequestMiddleWares.checkAuth,InfoController.info);
router.use('/user', userRoutes);
router.use('/menu', MenuRoutes);

module.exports = router;