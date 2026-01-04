const express = require('express');
const router = express.Router();
const homeController  = require("../controllers/homeController")
const ProductController = require("../controllers/ProductController")

router.get('/',homeController.HomePage)
router.get('/product-detail/:slug',ProductController.ProductDetail)

module.exports = router;
