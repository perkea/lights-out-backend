const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
    },
    comment: {
      type: String,
    },
    movieId: {
      type: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
