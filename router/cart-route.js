const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart-controller");

router.get("/:userId", cartController.getCart);
router.post("/create/:userId", cartController.createCart);
router.put("/update/:userId", cartController.updateCart);

module.exports = router;
