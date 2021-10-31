const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema(
  {
    image: {
      type: String,
    },
    overview: {
      type: String,
    },
    rate: {
      type: Number,
      required: [true, "Please rate the movie"],
      min: [0, "Must be 0 or greater"],
      max: [5, "5 or less"],
    },
    review: {
      type: String,
    },
    managedBy:String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
