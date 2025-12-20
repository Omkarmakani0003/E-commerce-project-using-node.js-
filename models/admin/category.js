const mongoose = require('mongoose')

const category = new mongoose.Schema({
    category_name:{
        type : String,
        require : true
    },
    status:{
        type : Boolean,
        require : true
    },
}) 
module.exports.category = mongoose.model('category',category)

