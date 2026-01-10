const {product} = require('../models/admin/product')
const {variation} = require('../models/admin/variation')
const {category} = require('../models/admin/category')


exports.AllCategory = async(req,res)=>{
    try{
        const categories = await category.find() 
        const products = await product.find()
        const variations = await variation.findOne({ product_id : products._id})
        res.render('category',{user:req.user, categories, products, variations, currentCategoryId : '',route: req.path || ''})
    }catch(error){
        console.log(error.message)
    }
}

exports.Category = async(req,res)=>{
    try{
        const id = req.params.id
        const categories = await category.find() 
        const products = await product.find({category_id:id})
        const variations = await variation.findOne({ product_id : products._id})
        res.render('category',{user:req.user, categories, products, variations, currentCategoryId : id})
    }catch(error){
        console.log(error.message)
    }
}