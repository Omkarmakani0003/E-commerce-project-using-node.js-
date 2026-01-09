const {product} = require('../models/admin/product')
const {variation} = require('../models/admin/variation')
const {category} = require('../models/admin/category')

exports.ProductDetail = async(req,res)=>{
    try{
        const slug = req.params.slug
        const categories = await category.find();
        const products = await product.findOne({slug})
        const variations = await variation.findOne({ product_id : products._id})
        res.render('productDetail',{user:req.user,categories,products,variations})
    }catch(error){
        console.log(error.message)
    }
}

exports.Search = async(req,res)=>{
    try{
        const search = req.query.search
        const Category =  await category.findOne({category_name : { $regex: search, $options: 'i'}})

        let query ={ $or: [
                {product_name : { $regex: search, $options: 'i'}},
                
                {description : { $regex: search, $options: 'i'}},
                {tags : { $regex: search, $options: 'i'}},   
            ]
        }

        if(Category){
          query.$or.push({category_id : Category._id})
        }
 
        const products = await product.find(query)

        const variations = await variation.findOne({ product_id : products._id})
        const categories = await category.find() 

        res.render('category',{user:req.user, categories, products, variations, currentCategoryId : '',search : search})
    }catch(error){
        console.log(error.message)
    }
}