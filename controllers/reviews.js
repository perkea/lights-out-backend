const express = require(`express`);
const Movie = require("../models/movie");
const Review = require("../models/review");
const reviewRouter = express.Router()


//INDUCES
// ////////////////////////Seed route////////////////////////////////////
reviewRouter.get("/test", (req, res) => {
    Review.find({
        title: "Toy Story"
    }).populate('movie').exec((error, foundReview) => {
        res.send("done");
    });
})

// reviewRouter.get("/seed", (req, res) => {
//     Review.deleteMany({}, (error, allReviews) => {
//         Review.create(review, (error, data) => {
//             res.redirect("/review");
//         });
//     });

// });
//////////////////////////Index/////////////////////////////////////////////////////////////////////////////
// reviewRouter.get("/", isAuthenticated, (req, res) => {
//     Recipe.find({}, (error, foundreview) => {
//         res.render("review/index.ejs", {
//             review: foundreview,
//             tabTitle: 'Recipe Gallery',
//         });
//     });
// });

///////////////////////////////New///////////////////////////////////////////////////////////////////////
// recipesRouter.get('/new', isAuthenticated, (req, res) => {
//     res.render('recipes/new.ejs', {
//         tabTitle: "Add a new Recipe",
//     });
// });
// //////////////////////////// Delete////////////////////////////////////////////////////////////////////////////
// recipesRouter.delete("/:id", isAuthenticated, (req, res) => {
//     Recipe.findByIdAndRemove(req.params.id, (err, data) => {
//         res.redirect("/recipes")
//     })
// })


module.exports = reviewRouter