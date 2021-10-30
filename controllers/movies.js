const express = require(`express`);
const Movie = require("../models/movie");
const Review = require("../models/review");
const movieRouter = express.Router()


//INDUCES
// ////////////////////////Seed route////////////////////////////////////
 movieRouter.get("/", async(req, res)=>{

 });

module.exports = movieRouter