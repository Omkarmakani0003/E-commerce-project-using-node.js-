const {category} = require('../models/admin/category')

exports.LoginForm = async(req,res) => {
   const categories = await category.find();
   res.render('login',{categories})
}