// /const movieSchema = new Schema(
//     {
//       image: {
//         type: String,
//       },
//       overview: {
//         type: String,
//       },
//       rate: {
//         type: Number,
//         required: [true, "Please rate the movie"],
//         min: [0, "Must be 0 or greater"],
//         max: [5, "5 or less"],
//       },
//       review: {
//         type: String,
//       },


// const seedData = [{
//     overview: "this is the movie",
//     rate: 5,
//     review: "its a cool movie"}
// ]

// Reviews
const seedData = [
    {
        rating: 5,
        comment :"Good movie",
        movieId: 40561
    },
    {
        rating: 1,
        comment :"Bad movie",
        movieId: 63576
    },
    {
        rating: 5,
        comment :"Very good!!!!!",
        movieId: 63576

    }
];

module.exports = seedData;