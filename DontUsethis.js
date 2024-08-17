// // Filename - App.js

// const express = require("express"),
//     mongoose = require("mongoose"),
//     passport = require("passport"),
//     bodyParser = require("body-parser"),
//     LocalStrategy = require("passport-local"),
//     passportLocalMongoose = 
//         require("passport-local-mongoose")
// const User = require("./model/User");
// let app = express();

// mongoose.connect("mongodb+srv://admin:KqIDJKJxnavIVypc@testdata.cgftf.mongodb.net/");

// app.set("view engine", "ejs");
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(require("express-session")({
//     secret: "Rusty is a dog",
//     resave: false,
//     saveUninitialized: false
// }));
// app.use(express.json());
// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// //=====================
// // ROUTES
// //=====================

// // Showing home page
// app.get("/", function (req, res) {
//     res.render("home");
// });

// // Showing secret page
// app.get("/homeone_1", isLoggedIn, function (req, res) {
//     res.render("homeone_1",{username:req.user.username});
// });

// // Showing register form
// app.get("/register", function (req, res) {
//     res.render("register");
// });

// // Handling user signup
// app.post("/register", async (req, res) => {
//     const user = await User.create({
//       username: req.body.username,
//       password: req.body.password
//     });
  
//     return res.status(200).json(user);
//   });

// //Showing login form
// app.get("/login", function (req, res) {
//     res.render("login");
// });

// //Handling user login
// app.post("/login", async function(req, res){
//     try {
//         // check if the user exists
//         const user = await User.findOne({ username: req.body.username });
//         if (user) {
//           //check if password matches
//           const result = req.body.password === user.password;
//           if (result) {
//             res.render("Homeone_1");
//           } else {
//             res.status(400).json({ error: "password doesn't match" });
//           }
//         } else {
//           res.status(400).json({ error: "User doesn't exist" });
//         }
//       } catch (error) {
//         res.status(400).json({ error });
//       }
// });

// // Handling user signup
// app.post("/users", async (req, res) => {
//     try {
//         console.log(req.body)
//         // Extract username and password from the request body
//         const { username, password } = req.body;

//         // Check if the username and password are provided
//         if (!username || !password) {
//             return res.status(400).json({ error: "Username and password are required" });
//         }

//         // Create a new user instance with the provided username
//         const user = new User({ username });

//         // Use User's built-in method to set the password and save the user
//         await user.save();

//         // Respond with a success message and the created user's data
//         res.status(201).json({
//             message: "Create user successfully",
//             user
//         });
//     } catch (error) {
//         // Handle errors and send a response
//         console.error("Error registering user:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });



// //Handling user logout 
// app.get("/logout", function (req, res) {
//     req.logout(function(err) {
//         if (err) { return next(err); }
//         res.redirect('/');
//       });
// });



// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated()) return next();
//     res.redirect("/login");
// }

// let port = process.env.PORT || 3000;
// app.listen(port, function () {
//     console.log("Server Has Started!");
// });
const express = require('express');
const mongoose = require('mongoose');
const patientRoutes = require('./routes/patientRoutes');

const app = express();

app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect("mongodb+srv://admin:KqIDJKJxnavIVypc@testdata.cgftf.mongodb.net/yourDatabaseName", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB Atlas');
});

// Use patient routes
app.use('/patients', patientRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
