const {cart} = require('../models/cart') 
const {category} = require('../models/admin/category')
const {orders} = require('../models/order')
const Razorpay = require("razorpay");
// const crypto = require("crypto");
const { validateWebhookSignature } = require("razorpay/dist/utils/razorpay-utils")
const dotenv = require('dotenv');
dotenv.config()

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

exports.CheckOut = async(req,res) => {
    if(!req.session.cart && !req.session.buynow){
      res.redirect('back')
    }
    let cartItems = req.session.cart || req.session.buynow

    const cartCout = await cart.countDocuments({user_id:req.user._id}) 
    const categories = await category.find()
    
    res.render('checkout',{user:req.user,categories,route: req.path || '',cartcount : cartCout,cartItems,key:process.env.RAZORPAY_KEY_ID})
}

exports.placeOrder = async(req,res)=>{

    try{
      
// const data = req.body.order[0].items.map((item) => {
//   return {product_id:item.product_id._id,variation:item.variation} 
// });
      let total = 0;
      const items = req.body.order.flatMap(order =>
        order.items.map(item => {
          const quantity = Number(item.quantity || order.quantity || 1);
          const price = Number(order.total || 0);
          const shipping = Number(item.product_id.shipping_price || 0);

          total += quantity * price + shipping;

          return {
            product_id: item.product_id._id,
            variation: item.variation || {},
            quantity,
            price
          };
        })
      );
        

      const Orders = await orders.create({
       user_id : req.user._id,
       items : items,
       total : total,
       shipping_address : req.user.address +' '+ req.user.city +' '+ req.user.state
     })
     return false
       const options = {
        amount: req.body.amount * 100, 
        currency: "INR",
        receipt: "receipt_" + Date.now()
    };

   const order = await razorpay.orders.create(options);
   if(order){
     delete req.session.checkout
     delete req.session.buynow
   }
   
   res.json(order);
    
    }catch(error){
        console.log(error.message)
        res.status(500).send({err:error.message})

    }
}

exports.PaymentVarify = async(req, res) => {
  try{
  console.log('okok')
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
  } = req.body;

  const sign = razorpay_order_id + "|" + razorpay_payment_id;
  const validate = validateWebhookSignature(sign, razorpay_signature, process.env.RAZORPAY_KEY_SECRET)

  if(validate){
       res.status(200).json({status : 'ok'})
       console.log('payment verify succesfully')
  }else{
       res.status(400).json({status : 'failed'})
       console.log('payment verify failed')
  }
  }catch(error){
      res.status(500).send({err:error.message})
  }
  
};