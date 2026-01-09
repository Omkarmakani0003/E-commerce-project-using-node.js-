const mongoose = require("mongoose");

const cart = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    items:{
        type: Array,
    },
    quantity :{
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);


module.exports.cart = mongoose.model("cart", cart);
