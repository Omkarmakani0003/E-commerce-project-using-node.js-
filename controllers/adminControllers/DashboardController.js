const bcrypt = require('bcrypt')
const {admin} = require('../../models/admin/adminModel')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config()

exports.loginform = (req,res) => {
   res.render('admin/login',{error : req.flash('errors')});
}

exports.login = async(req,res) => {
     try{
          const {email,password} = req.body;
    
          if(!email || !password){
             req.flash('errors',"Email and password are required")
             return res.redirect('/admin/login')
          }
          const isExist = await admin.findOne({email})
          
          if(!isExist){
             req.flash('errors',"Email or password incorrect")
             return res.redirect('/admin/login')
          }

           const password_verify = await bcrypt.compare(password,isExist.password)
           
           if(!password_verify){
             req.flash('errors',"Email or password incorrect")
             return res.redirect('/admin/login')
           }
           const playload = {
               id: isExist._id,
               name : isExist.name,
               email : isExist.email
           }

           const token = jwt.sign(playload,process.env.JWTSECRET,{expiresIn:'1d'})
           res.cookie('admin_token',token,{ httpOnly: true })
           
           req.flash('success',"Admin login successfully")
           return res.redirect('/admin/')

     }catch (e){
          console.log(e)
     }
}

exports.dashboard = (req,res) => {
     res.render('admin/dashboard',{success : req.flash('success'),error : req.flash('errors')}); 
}  
