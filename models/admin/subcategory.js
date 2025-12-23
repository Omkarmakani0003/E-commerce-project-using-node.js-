const mongoose = require('mongoose')

const subcategory = new mongoose.Schema({
    subcategory_name:{
        type : String,
        require : true
    },
    categoryid:{
        type : mongoose.Schema.Types.ObjectId,
        require : true
    },
    status:{
        type : Boolean,
        require : true
    },
    
}) 
module.exports.subcategory = mongoose.model('subcategories',subcategory)

