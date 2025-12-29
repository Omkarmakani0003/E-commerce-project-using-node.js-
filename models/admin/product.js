const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    price: {
      type: Number,
      required: true,
    },

    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },

    subcategory_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subcategories",
      required: true,
    },

    discount: {
      type: Number,
      default: 0,
    },

    shipping_price: {
      type: Number,
      default: 0,
    },

    brand_name: {
      type: String,
      required: true,
    },

    sku: {
      type: String,
      required: true,
      unique: true,
    },

    stock: {
      type: Number,
      required: true,
    },

    condition: {
      type: String,
      enum: ["new", "used", "refurbished"],
      required: true,
    },
    tags: {
      type: String,
      required: true,
    },
    images: [
      {
        public_id: {
          type: Array,
          required: true,
        },
        url: {
          type: Array,
          required: true,
        },
      },
    ],

    description: {
      type: String,
      required: true,
    },

    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports.product = mongoose.model("Product", productSchema);
