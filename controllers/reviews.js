const express = require(`express`);
const Review = require("../models/review");
const reviewRouter = express.Router();
const seedData = require("../seedData");

//TESTS
reviewRouter.get("/addSeedData", (req, res) => {
  Review.remove({}, () => {
    seedData.forEach((element) => {
      const review = new Review(element);
      review.save();
    });
    res.status(200).json({ success: true, seedData: seedData });
  });
});

//INDUCES
// ////////////////////////Seed route////////////////////////////////////
reviewRouter.get("/", (req, res) => {
  Review.find({}, (err, allReviews) => {
    res.status(200).json({ success: true, reviews: allReviews });
  });
});

reviewRouter.get("/:id", (req, res) => {
  Review.findById(req.params.id).exec((err, foundReview) => {
    res.status(200).json({ success: true, review: foundReview });
  });
});

reviewRouter.get("/moviesearch/:movieid", (req, res) => {
  Review.find({ movieId: req.params.movieid }).exec((err, foundReviews) => {
    res.status(200).json({ success: true, review: foundReviews });
  });
});

reviewRouter.post("/", (req, res) => {
    const review = new Review(req.body);
    review.save((error, savedReview) => {
      res.status(200).json({ success: true, review: savedReview });
     
    });
  });

module.exports = reviewRouter;