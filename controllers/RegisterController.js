const {category} = require('../models/admin/category')

exports.RegisterForm = async(req,res) => {
   const categories = await category.find();
   res.render('register',{categories})
}