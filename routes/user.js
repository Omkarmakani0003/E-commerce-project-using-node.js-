const express = require('express');
const router = express.Router();
const homeController  = require("../controllers/homeController")
const ProductController = require("../controllers/ProductController")
const RegisterController = require("../controllers/RegisterController")
const LoginController = require("../controllers/LoginController")
const {UserValidation} = require("../middleware/validators/UserValidation")

router.get('/user-register',RegisterController.RegisterForm)
router.post('/register',UserValidation,RegisterController.Register)
router.get('/otp',RegisterController.OtpVarify)

router.get('/login',LoginController.LoginForm)

router.get('/',homeController.HomePage)
router.get('/product-detail/:slug',ProductController.ProductDetail)



module.exports = router;
