const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema(
  {
    id: Number,
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reviews",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
