const express = require("express");

const { RestaurantController } = require("../../controllers");
const { RestaurantMidddlewares } = require("../../middlewares");
const router = express.Router();

//    /api/v1/airplanes POST
router.post(
  "/",
  RestaurantMidddlewares.validateCreateRequest,
  RestaurantController.create
);
//    /api/v1/airplane GET
router.get("/", RestaurantController.getmenus);
//    /api/v1/airplane/:id
router.get("/:id", RestaurantController.getmenu);

router.patch("/:id/quantity",RestaurantController.update);

module.exports = router;
