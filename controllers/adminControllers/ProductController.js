const {category} = require('../../models/admin/category')
const {subcategory} = require('../../models/admin/subcategory')
const multer = require('multer');
const slugify = require('slugify')
const { validationResult } = require("express-validator");
const {product} = require('../../models/admin/product')
const {variation} = require('../../models/admin/variation')

exports.ProductCreate = async(req,res) => {
     try{
        const categories = await category.find()
        res.render('admin/product/create',{categories, error: req.flash("errors"), oldInput: req.flash("oldInput")}); 
     }catch(error){
         console.error(error)
     }  
}

exports.DisplaySubCategory = async(req,res) => {
     try{
          const id = req.params.id
          if(!id){
          return false;
          }
          const subcategories = await subcategory.find({categoryid:id})
          if(!subcategories){
          res.status(200).json({success:false,data:'Data not found'})  
          }
          res.status(200).json({success:true,data:subcategories})
     }catch(error){
          res.status(500).json({success:false,data:'Bad request'})  
     }  
} 

exports.ProuctAdd = async(req,res) => {
    
     try{
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
           req.flash("oldInput", req.body);
           errors.array().forEach((e) => {
           req.flash("errors", e);
           
        });
         return res.redirect("/admin/prouct-create");
        }

        const slug = await slugify(req.body.product_name,{
           lower: true,
           trim: true,
           strict : true
        })

        const url = req.files.map((e)=>{ return e.path })
        const public_id = req.files.map((e)=>{ return e.filename })

        const products = await product.create({
            product_name: req.body.product_name,
            slug: slug,
            category_id: req.body.category_id,
            subcategory_id: req.body.subcategory_id,
            price : req.body.price,
            discount: req.body.discount,
            stock: req.body.stock,
            shipping_price: req.body.shipping_price,
            brand_name :req.body.brand_name,
            sku :req.body.sku,
            condition: req.body.condition,
            tags: req.body.tags,
            status: req.body.status,
            images: {'url':url,'public_id':public_id},
            description: req.body.description
        })
 
        if(req.body.variation_type && req.body.variations){

         const result = req.body.variation_type.reduce((obj, key, index) => {
            obj[key] = [req.body.variations[index]];
            return obj;
         }, {});

           await variation.create({
               variation: result,
               product_id : products._id,
               status:req.body.status
           })
        }

        res.redirect('/admin/products')
      
     }catch(error){
        console.log(error)
     }
}

exports.ProductList = async(req,res) => {
      const products = await product.find();
      const categories = await category.find();
      res.render('admin/product/index',{products,categories, error: req.flash("errors"), success: req.flash("success")})
}

exports.ProductView = async(req,res) => {
      const slug = req.params.slug;
      const products = await product.findOne({slug});
      let subcategories = '';
      const categories = await category.findById(products.category_id);
      if(products.subcategory_id){
         subcategories = await subcategory.findById(products.subcategory_id);
      }
      const variations = await variation.findOne({product_id :products._id})
      const variation_data = variations.variation
      res.render('admin/product/view',{products, categories, subcategories,variation_data, error: req.flash("errors"), success: req.flash("success")})
}




