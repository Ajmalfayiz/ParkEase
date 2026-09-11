const mongoose = require("mongoose");

const spotSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "spot name is required"],
      trim: true,
    },

    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "spot description is required"],
    },

    price: {
      type: Number,
      required: [true, "spot price is required"],
      min: 0,
    },

    category: {
      type: [String],
      required: [true, "spot category is required"],
      validate: {
        validator: (categories) => categories.length > 0,
        message: "spot category is required",
      },
    },

    image: {
      type: String,
      default: "",
    },

    stock: {
      type: Number,
      required: [true, "spot stock is required"],
      default: 0,
      min: 0,
    },

    latitude: {
      type: Number,
      default: null,
    },

    longitude: {
      type: Number,
      default: null,
    },

    hasEv: {
      type: Boolean,
      default: false,
    },

    isCovered: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("spot", spotSchema);