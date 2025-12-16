var express = require('express');
var router = express.Router();
var { dashboard } = require("../controllers/adminControllers/DashboardController")
var { create } = require("../controllers/adminControllers/ProductController")

// Dashboard routes
router.get('/dashboard',dashboard)

//Product routes
router.get('/prouct-create',create)

module.exports = router;
