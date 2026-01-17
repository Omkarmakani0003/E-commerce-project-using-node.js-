const { user } = require('../models/users')
const {cart} = require('../models/cart') 
const {category} = require('../models/admin/category')
const { validationResult } = require("express-validator");

exports.profile = async(req,res) => {
    const cartCout = await cart.countDocuments({user_id:req.user._id}) 
    const categories = await category.find()
    return res.render('profile',{user:req.user,categories,success:req.flash('success'),route: req.path || '',cartcount : cartCout})
}

exports.UserUpdate = async(req,res) => {
   
   try{
      const errors = validationResult(req);

      console.log(errors)
      if (!errors.isEmpty()) {
         req.flash("oldInput", req.body);
         errors.array().forEach((e) => {
            req.flash("errors", e);
         });
        return res.redirect("back");
      }
 
      const User = await user.findById(req.user._id);
      User.contact = req.body.contact,
      User.city = req.body.city,
      User.state = req.body.state,
      User.address = req.body.address,
      User.save()
      req.flash("success", {message:"profile update successfully "})
      return res.redirect("back"); 

   }catch(error){
      console.error(error.message)
   } 
}