const express = require("express");

const { UserController } = require("../../controllers");
const { AuthRequestMiddleWares } = require("../../middlewares");

const router = express.Router();

router.post("/signup", AuthRequestMiddleWares.ValidateAuthRequest,UserController.signup);

router.post("/signin",UserController.signin);


router.post("/isAuthenticated",AuthRequestMiddleWares.checkAuth,UserController.signin);
module.exports = router;
