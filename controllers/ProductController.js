const {product} = require('../models/admin/product')
const {variation} = require('../models/admin/variation')
const {category} = require('../models/admin/category')

exports.ProductDetail = async(req,res)=>{
    try{
        const slug = req.params.slug
        const categories = await category.find();
        const products = await product.findOne({slug})
        const variations = await variation.findOne({ product_id : products._id})
        res.render('productDetail',{categories,products,variations})
    }catch(error){
        console.log(error.message)
    }
}