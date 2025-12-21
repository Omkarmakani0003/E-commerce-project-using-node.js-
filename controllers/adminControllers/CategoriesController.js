const { category } = require('../../models/admin/category')
const { validationResult } = require('express-validator')

exports.CategoryCreate = (req,res) => {
     res.render('admin/categories/create',{error : req.flash('errors'), success : req.flash('success')}); 
}  

exports.CategoryStore = async(req,res) => {
 
     const errors = validationResult(req)

     if(!errors.isEmpty()){
       errors.array().forEach(e=>{
          req.flash("errors", e)
       })
       return res.redirect('category-create')
     } 

     const {category_name, status} = req.body;

     const categories = await category.create({
          category_name : category_name,
          status : status 
     })

     req.flash('success',"New category create")
     return res.redirect('category-create')
}  

exports.CategoryList = async(req,res) => {
      const categories = await category.find()
      return res.render('admin/categories/index',{categories})
}
