const {category} = require('../models/admin/category')
const { user } = require('../models/users')
const { validationResult } = require("express-validator");
const bcrypt = require('bcrypt')
const { mailSender } = require('../utils/mailSender') 

exports.RegisterForm = async(req,res) => {
   const categories = await category.find();
   res.render('register',{categories, error: req.flash("errors"), oldInput: req.flash("oldInput")})
}

exports.Register = async(req,res) => {
   
   try{
      
      const errors = await validationResult(req);
      if (!errors.isEmpty()) {
         req.flash("oldInput", req.body);
         errors.array().forEach((e) => {
            req.flash("errors", e);
         });
         return res.redirect("/user-register");
      }
 
      const User = await user.find({ email : req.body.email });

      if(User && User.length > 0){
         req.flash("oldInput", req.body);
         req.flash("errors", {path:"email",msg:'Email is already taken'})
         return res.redirect("/user-register");
      }
      const HashPassword = await bcrypt.hash(req.body.password,10)
      const register = await user.create({
         name : req.body.fullName,
         email : req.body.email,
         password : HashPassword,
         is_varify : false,
      })

      if(register){
         const otp = Math.floor(Math.random() * 1999)
         const data = {
            'email' : register.email ,
            'subject' : 'OTP for user varification',
            'otp' : otp
         }
         const send = await mailSender(data)

         if(send){
            req.flash("success", {message:"Otp sent successfully"})
         }

         return res.redirect("/otp");
      }

   }catch(error){
      console.error(error.message)
   }
   
}

exports.OtpVarify = async(req,res) => {
    const categories = await category.find();
    res.render('otpverify',{categories, error: req.flash("errors"), success: req.flash("success")})
}

exports.Varify = async(req,res) => {
    const categories = await category.find();
    res.render('otpverify',{categories, error: req.flash("errors"), success: req.flash("success")})
}