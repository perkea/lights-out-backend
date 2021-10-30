const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {rating:Number
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
