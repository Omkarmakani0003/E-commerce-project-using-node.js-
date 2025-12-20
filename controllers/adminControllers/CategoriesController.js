const { category } = require('../../models/admin/category')

exports.CategoryCreate = (req,res) => {
     res.render('admin/categories/create',{error : req.flash('errors'), success : req.flash('success')}); 
}  

exports.CategoryStore = async(req,res) => {
     const {categoryname, status} = req.body;

     if(!categoryname){
        req.flash('errors',"Category is require")
        return res.redirect('category-create')
     }
     if(!status){
        req.flash('errors',"Status is require")
        return res.redirect('category-create')
     }

     const categories = await category.create({
          category_name : categoryname,
          status : status 
     })

      req.flash('success',"New category create")
      return res.redirect('category-create')
}  
