var express = require('express');
var router = express.Router();
var {loginform, login, dashboard} = require("../controllers/adminControllers/DashboardController")
var { ProductCreate } = require("../controllers/adminControllers/ProductController")

var{CategoryValidator } = require('../middleware/validators/categoryValidators')
var { CategoryCreate, CategoryStore, CategoryList, CategoryEdit, CategoryUpdate} = require("../controllers/adminControllers/CategoriesController")

const {CheckAuthentication} = require('../middleware/authentication')


// check admin is already logged in or not
const Isloggein = (req,res,next) =>{
    if(req.cookies.token){
        return res.redirect('dashboard')
    }
    next()
}
//Admin auth route
router.get('/login',Isloggein,loginform)
router.post('/login',Isloggein,login)


// Dashboard routes
router.use(CheckAuthentication)
router.get('/dashboard',dashboard)

//Product routes
router.get('/prouct-create',ProductCreate)


//categories routes
router.get('/category-create',CategoryCreate)
router.post('/category-store',CategoryValidator,CategoryStore)
router.get('/categories',CategoryList)
router.get('/category-edit/:id',CategoryEdit)
router.post('/category-update/:id',CategoryValidator,CategoryUpdate)


module.exports = router;
