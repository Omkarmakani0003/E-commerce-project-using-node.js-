const {orders} = require('../../models/order')

exports.orders = async(req,res) => {
    const order = await orders.find();
    return res.render('admin/orders',{order})
}

