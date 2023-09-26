const express = require("express");
const router = express.Router();
const productController = require("../controllers/product-controller");

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProduct);
router.post("/add", productController.addProduct);
router.delete("/delete/:id", productController.deleteProduct);
router.patch("/update/:id", productController.updateProduct);

module.exports = router;
