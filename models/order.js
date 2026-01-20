const mongoose = require("mongoose");

const order = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },

        variation: {
          type: Object, // e.g. { size: "M", color: "Red" }
          default: {},
        },

        quantity: {
          type: Number,
          required: true,
          min: 1,
        },

        price: {
          type: Number,
          required: true,
        },
      },
    ],

    total: {
      type: Number,
      required: true,
      min: 0,
    },

    shipping_address: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },

    payment_method: {
      type: String,
      enum: ["cod", "card", "upi", "paypal"],
    },

    payment_status: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
  },
  { timestamps: true }
);



module.exports.orders = mongoose.model("order", order);
