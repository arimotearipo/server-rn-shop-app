const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart-controller");

router.get("/:userId", cartController.getCart);
router.put("/update/:userId", cartController.updateCart);

module.exports = router;
