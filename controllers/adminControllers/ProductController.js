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
           await variation.create({
               variation: {
                   [req.body.variation_type] :req.body.variations,
               },
               product_id : products._id,
               status:req.body.status
           })
        }

        console.log(products)

     }catch(error){
        console.log(error)
     }
     
   
}


