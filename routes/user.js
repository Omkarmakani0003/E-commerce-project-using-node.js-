const express = require('express');
const router = express.Router();
const homeController  = require("../controllers/homeController")
const ProductController = require("../controllers/ProductController")
const RegisterController = require("../controllers/RegisterController")
const LoginController = require("../controllers/LoginController")

router.get('/register',RegisterController.RegisterForm)

router.get('/login',LoginController.LoginForm)

router.get('/',homeController.HomePage)
router.get('/product-detail/:slug',ProductController.ProductDetail)



module.exports = router;
