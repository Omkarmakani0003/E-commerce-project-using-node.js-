const mongoose = require('mongoose')

const user = new mongoose.Schema({
    name:{
        type : String,
        require : true
    },
    email:{
        type : String,
        require : true,
    },
    address:{
        type : String,
    },
    is_varify:{
        type : Boolean,
        require : true,
        default : false
    },
    password:{
        type : String,
        require : true
    },
},
  {timestamps: true}
) 
module.exports.user = mongoose.model('user',user)

