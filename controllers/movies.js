const express = require(`express`);
const Movie = require("../models/movie");
const Review = require("../models/review");
const movieRouter = express.Router()


movieRouter.get("/", async(req, res)=>{
try{
    res.json(await Movie.find)
}
})



const createReview = function(movieId, review){
return Movie.findByIdAndUpdate(
  movieId, {
$push:{
reviews:{
    review:reviews.review,
    rating: reviews.rating
}

}

  },
  { new: true, useFindAndModify: false }
);

}


module.exports = movieRouter