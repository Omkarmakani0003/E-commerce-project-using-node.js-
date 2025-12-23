const { category } = require('../../models/admin/category')
const { subcategory } = require('../../models/admin/subcategory')
const { validationResult } = require('express-validator')


// Main category 
exports.CategoryCreate = (req,res) => {
     res.render('admin/categories/create',{error : req.flash('errors'), success : req.flash('success')}); 
}  

exports.CategoryStore = async(req,res) => {
 
     const errors = validationResult(req)

     if(!errors.isEmpty()){
       errors.array().forEach(e=>{
          req.flash("errors", e)
       })
       return res.redirect('/admin/category-create')
     } 

     const {category_name, status} = req.body;

     const categories = await category.create({
          category_name : category_name,
          status : status 
     })

     req.flash('success',"New category create")
     return res.redirect('/admin/category-create')
}  

exports.CategoryList = async(req,res) => {
      const categories = await category.find()
      return res.render('admin/categories/index',{categories})
}

exports.CategoryEdit = async(req,res) => {
     const categories = await category.findById(req.params.id)
     return res.render('admin/categories/update',{error : req.flash('errors'), success : req.flash('success'),categories})
}

exports.CategoryUpdate = async(req,res) => {

     const errors = validationResult(req)
     
     if(!errors.isEmpty()){
       errors.array().forEach(e=>{
          req.flash("errors", e)
       })
       return res.redirect(`/admin/category-edit/${req.params.id}`)
     } 

     const {category_name, status} = req.body;

      await category.findByIdAndUpdate(
        req.params.id,
        {
            category_name,
            status
        },
        { new: true }
    );

     req.flash('success',"Category update successfully")
     return res.redirect(`/admin/categories`)
}

exports.CategoryDelete = async(req,res) => {
      if(!req.params.id) return
      try{
          await category.findByIdAndDelete(req.params.id)
          return res.status(200).json({success:true,message:"Category delete successfully"})
      }catch(error){
          return res.status(401).json({success:false,message:'Category delete faild'})
      }
}

// Sub category 

exports.SubCategoryCreate = async(req,res) => {
    const categories = await category.find()
    res.render('admin/sub-categories/create',{error : req.flash('errors'), success : req.flash('success'),categories}); 
}

exports.SubCategoryStore = async(req,res) => {
 
     const errors = validationResult(req)

     if(!errors.isEmpty()){
       errors.array().forEach(e=>{
          req.flash("errors", e)
       })
       return res.redirect('/admin/subcategories-create')
     } 

     const {subcategory_name,categoryId, status} = req.body;

     const subcategories = await subcategory.create({
          subcategory_name : subcategory_name,
          categoryid : categoryId,
          status : status 
     })

     req.flash('success',"New subcategory create")
     return res.redirect('/admin/subcategories-create')
} 


