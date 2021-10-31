const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
    },
    review: {
      type: String,
    },
    movieId: {
      type: String,
    },

    // movieId: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "Movie",
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
