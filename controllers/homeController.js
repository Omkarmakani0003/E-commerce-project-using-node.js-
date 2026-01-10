var express = require('express');
const {category} = require('../models/admin/category')
const {subcategory} = require('../models/admin/subcategory')
const {product} = require('../models/admin/product')

exports.HomePage = async(req,res) => {
     try{
         const categories = await category.find(); 
         const productCount = await Promise.all(
            categories.map(async(category)=>{
             return await product.countDocuments({category_id:category._id})
            })
         )
         const products = await product.find()
         res.render('index',{user: req.user,categories,productCount,products,success:req.flash('success'),search:'',route: req.path || ''}); 
     }catch(error){
          console.log(error.message)
     }
   
}  
