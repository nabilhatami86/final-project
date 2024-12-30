const router = require("express").Router();
const courierController = require("./controller");

router.post("/courier", courierController.createCourier);
router.get("/courier", courierController.show);

module.exports = router;
