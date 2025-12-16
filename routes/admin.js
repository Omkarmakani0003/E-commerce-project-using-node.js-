var express = require('express');
var router = express.Router();
var { dashboard } = require("../controllers/adminControllers/dashboard")

router.get('/dashboard',dashboard)

module.exports = router;
