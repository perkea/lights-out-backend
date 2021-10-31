const express = require(`express`);
const Movie = require("../models/movie");
const Review = require("../models/review");
const movieRouter = express.Router()


const createMovie = function(movie){
return Movie.create(movie).then(movie =>{
  return movie;  
})
}



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