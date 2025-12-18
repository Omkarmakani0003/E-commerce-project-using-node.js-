var express = require('express');
var router = express.Router();
var {loginform, login, dashboard} = require("../controllers/adminControllers/DashboardController")
var { create } = require("../controllers/adminControllers/ProductController")
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
router.get('/prouct-create',create)

module.exports = router;
