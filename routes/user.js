const express = require('express');
const router = express.Router();
const homeController  = require("../controllers/homeController")
const ProductController = require("../controllers/ProductController")
const CategoryController = require("../controllers/CategoryController")
const RegisterController = require("../controllers/RegisterController")
const LoginController = require("../controllers/LoginController")
const CartController = require('../controllers/CartController')
const CheckOut = require('../controllers/CheckOutController')
const {UserValidation} = require("../middleware/validators/UserValidation")
const {CheckUserAuth} = require('../middleware/authentication')
const {UserAttech} = require('../middleware/UserAttech') 


router.get('/login',LoginController.LoginForm)
router.post('/login',LoginController.login)

router.use(UserAttech)
router.get('/user-register',RegisterController.RegisterForm)
router.post('/register',UserValidation,RegisterController.Register)
router.get('/otp',RegisterController.OtpVarify)
router.get('/resendotp/:email',RegisterController.resendOtp)
router.post('/verify/:email',RegisterController.Varify)
router.get('/category/:id',CategoryController.Category)
router.get('/category',CategoryController.AllCategory)
router.get('/get-category-wise-products',CategoryController.GetCategoryWiseProducts)
router.get('/search',ProductController.Search)
router.get('/',homeController.HomePage)
router.get('/product-detail/:slug',ProductController.ProductDetail)



router.use(CheckUserAuth)
router.get('/logout',LoginController.logout)

router.post('/add-to-cart',CartController.AddToCart)
router.get('/cart',CartController.DisplayCart)
router.post('/cart-quantity',CartController.CartUpdate)
router.delete('/cart-remove/:id',CartController.CartRemove)
router.get('/checkout',CheckOut.CheckOut)



module.exports = router;
