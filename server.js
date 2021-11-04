// =======================================
//              DEPENDENCIES
// =======================================
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const cors = require("cors");
const morgan = require("morgan");
const methodOverride = require("method-override");
const User = require("./models/user");
const usersController = require("./controllers/users");
const expressSession = require("express-session");
const admin = require("firebase-admin");
// const serviceAccount = require("../backend/lights-out-auth-firebase-adminsdk-pbg5z-f3314bca46.json");
// const Review = require("../backend/models/review");
const reviewController = require("./controllers/reviews");

// =======================================
//              INITIALIZE EXPRESS
// =======================================
const app = express();

// =======================================
//              APPLICATION SETTINGS
// =======================================
require("dotenv").config(); // list this first (or as high in the code as possible!)
const {
   PORT = 4000,
   MONGODB_URL,
   CLIENT_ID,
   PRIVATE_KEY,
   PRIVATE_KEY_ID,
} = process.env;

// =======================================
//              CONFIGURE DATABASE
// =======================================
mongoose.connect(MONGODB_URL);

// Establish Connection
mongoose.connect(MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
// Connection Events
mongoose.connection
  .on("open", () => console.log("You are connected to mongoose"))
  .on("close", () => console.log("You are disconnected from mongoose"))
  .on("error", (error) => console.log(error));

// =======================================
//              MIDDLEWARE
// =======================================
// app.use() will attach middleware
app.use(express.json()); // turns incoming json data into req.body
app.use(logger("dev")); // mounts morgan npm package - aids in testing
app.use(express.static("public"));
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies	// access static files in the public folder (e.g. CSS)
app.use(express.urlencoded({ extended: false })); // needed for delete/update/edit routes
// methodOverride - allows forms to use push/delete methods; '_method' is a query parameter attached to the path for update/delete routes
app.use(methodOverride("_method"));
app.use("/", usersController);
// app.use("/movies", movieController);
app.use("/reviews", reviewController);
app.use(
  expressSession({
    secret: "cknlkclnclnen", // this is used to digitally sign our session cookies (prevents forgery)
    resave: false, // this option updates session storage after request
    saveUninitialized: false,
  })
);

admin.initializeApp({
  credential: admin.credential.cert({
    
      "type": "service_account",
      "project_id": "lights-out-auth",
      "private_key_id": PRIVATE_KEY_ID,
      "private_key": PRIVATE_KEY.replace(/\\n/g, "\n"),
      "client_email": "firebase-adminsdk-pbg5z@lights-out-auth.iam.gserviceaccount.com",
      "client_id": CLIENT_ID,
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-pbg5z%40lights-out-auth.iam.gserviceaccount.com"  

  }),
});

app.use(async function (req, res, next) {
  const token = req.get("Authorization");
  console.log(token);
  if (token) {
    const authUser = await admin
      .auth()
      .verifyIdToken(token.replace("Bearer ", ""));
    console.log(authUser);
    req.user = authUser;
  }

  next();
});

function isAuthenticated(req, res, next) {
  if (req.user) return next();
  else res.status(401).json({ message: "unauthorized" });
}
// =======================================
//              CONTROLLERS
// =======================================
//  → be sure to set up your .js file with your routes in the controllers directory (boilerplate here)
// const <name>Controller = require(`<path to controller .js file>`)
// app.use(`/<path>, <name>Controller)

// // —> example to test if root url is working → used just to triple check your server is working
app.get(`/`, function (req, res) {
  res.send(`Hello World!`);
});
app.get("api", (req, res) => {
  res.json({ message: "Welcome to the React CRM API" });
});
app.get("/api", (req, res) => {
  res.status(400).json({ message: "That route was not found" });
});

// PEOPLE INDEX ROUTE
app.get("/users", async (req, res) => {
  try {
    // send all people
    res.json(await User.find({}));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

// PEOPLE CREATE ROUTE
app.post("/users", async (req, res) => {
  try {
    // send all people
    res.json(await User.create(req.body));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});
// PEOPLE DELETE ROUTE
app.delete("/users/:id", async (req, res) => {
  try {
    // send all people
    res.json(await User.findByIdAndRemove(req.params.id));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

// PEOPLE UPDATE ROUTE
app.put("/users/:id", async (req, res) => {
  try {
    // send all people
    res.json(
      await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    );
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

// =======================================
//              LISTENER
// =======================================
app.listen(PORT, () => console.log(` listening on port: ${PORT}`));
