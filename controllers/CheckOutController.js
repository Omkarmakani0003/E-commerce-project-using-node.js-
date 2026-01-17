const {cart} = require('../models/cart') 
const {category} = require('../models/admin/category')


exports.CheckOut = async(req,res) => {
    const cartCout = await cart.countDocuments({user_id:req.user._id}) 
    const categories = await category.find()
    const cartItems = req.session.checkout || req.session.buynow
    res.render('checkout',{user:req.user,categories,route: req.path || '',cartcount : cartCout,cartItems})
}