const {admin} = require('../models/admin/adminModel')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config()

exports.CheckAuthentication = async(req,res,next) =>{
    const token = req.cookies.token
    if(!token){
        return res.redirect('login')
    }
    try{
        const check = await jwt.verify(token,process.env.JWTSECRET)
        if(!check){
            req.flash('errors',"check feild")
            return res.status(401).redirect('login')
        }
        const admins = await admin.findById(check.id)
        if(!admins){
            req.flash('errors',"admin not found")
            return res.status(401).redirect('login')
        }
        req.admin = admins
        next()
    }catch(error){
        if(error.message){
            res.clearCookie('token');
            return res.redirect('login')
        }
    }
}