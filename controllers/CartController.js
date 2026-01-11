const {cart} =require('../models/cart')
const {category} = require('../models/admin/category')

exports.AddToCart = async(req,res) => {
    const {productId,quantity,price,variations} = req.body
    const userId = req.user._id
    
    const Cart = await cart.create({
         user_id : userId,
         items : [{ product_id : productId, variation : variations }],
         quantity : quantity,
         total : quantity * price
    })

   const cartCout = await cart.countDocuments() 
   
   return res.status(200).json({success:true,Cart,cartCout})
}

exports.DisplayCart = async(req,res) => {
     const categories = await category.find();
     const cartCout = await cart.countDocuments() 
     const cartItems = await cart.find({ user_id : req.user._id }).populate('items.product_id')
     // console.log(cartItems[0].items[0].product_id.images[0].url[0])
     res.render('cart',{user:req.user,categories, error: req.flash('errors'),route: req.path || '',cartcount : cartCout,cartItems})
}