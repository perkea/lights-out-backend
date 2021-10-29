const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {Rating:{
      Type:Number,
  },
  review:{
    type:String  
  }},
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
