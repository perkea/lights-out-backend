const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema(
  {
    id: {
      type: Number,
    },

    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
