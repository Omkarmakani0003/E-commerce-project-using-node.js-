const express = require('express');
const router = express.Router();
const {loginform, login, dashboard} = require("../controllers/adminControllers/DashboardController")
const  ProductController  = require("../controllers/adminControllers/ProductController")
const upload = require("../middleware/ProductImagesUploader")

const{ CategoryValidator, SubCategoryValidator } = require('../middleware/validators/categoryValidators')
const{ ProductValidator } = require('../middleware/validators/ProductValidation')
const CategoryController = require("../controllers/adminControllers/CategoriesController")
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
router.get('/',dashboard)

//Product routes
router.get('/prouct-create',ProductController.ProductCreate)
router.get('/displaysubcetegory/:id',ProductController.DisplaySubCategory)
router.post('/prouct-store',upload.array('images[]',5),ProductValidator,ProductController.ProuctAdd)
router.get('/products',ProductController.ProductList)
router.get('/product-detail/:slug',ProductController.ProductView)

//Categories routes
router.get('/category-create',CategoryController.CategoryCreate)
router.post('/category-store',CategoryValidator,CategoryController.CategoryStore)
router.get('/categories',CategoryController.CategoryList)
router.get('/category-edit/:id',CategoryController.CategoryEdit)
router.post('/category-update/:id',CategoryValidator,CategoryController.CategoryUpdate)
router.delete('/category-delete/:id',CategoryValidator,CategoryController.CategoryDelete)

//Subcategories routes
router.get('/subcategories-create',CategoryController.SubCategoryCreate)
router.post('/subcategories-store',SubCategoryValidator,CategoryController.SubCategoryStore)
router.get('/subcategories',CategoryController.SubCategoryList)
router.get('/subcategories-edit/:id',CategoryController.SubCategoryEdit)
router.post('/subcategories-update/:id',SubCategoryValidator,CategoryController.SubCategoryUpdate)
router.delete('/subcategories-delete/:id',CategoryController.SubCategoryDelete)

module.exports = router;
