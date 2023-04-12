/**
 * @file server.js
 * @brief This file contains the server configuration
 * @author Yuna Chung
 * @author Carlos Salguero
 * @author Olimpia Garcia
 * @author Diego Sandoval
 * @author Diego Llaca
 * @author Ivan Paredes
 * @date 2023-03-31
 * @version 1.0
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

const express = require("express")
const app = express()
const session = require('express-session');
const bodyparser = require("body-parser")
const path = require('path')

// Dotenv config
require("dotenv").config()

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

// View engine
app.set("view engine", "ejs")

// Static Files
app.use(express.static("public"))

// Section routes
const main = require("./Routes/main.routes")

/**
 * @brief
 * Routes for the main section
 * @param {String} "/" - Route
 * @param {Function} main - Callback function
 */
app.use("/", main)

// Section routes
const actual = require("./routes/actual.routes")
/**
 * @brief
 * Routes for the actual section
 * @param {String} "/actual" - Route
 * @param {Function} actual - Callback function
 */
app.use("/actual", actual)

const historico = require("./routes/historico.routes")
/**
 * @brief
 * Route for the historico section
 * @param {String} "/historico" - Route
 * @param {Function} historico - Callback function
 */
app.use("/historico", historico)

// Starting the server
const PORT = 3000

/**
 * @brief
 * Starts the server
 * @param {Number} PORT - Port number
 * @param {Function} () - Callback function
 * @returns {Function} - Callback function
 */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

//sessions
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));

app.get('/auth', function(req, res) {
  res.render("../Views/Static/auth.ejs")
});

// index.js

/*  PASSPORT SETUP  */

const passport = require('passport');
var userProfile;

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.get('/success', (req, res) => res.send(userProfile));
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

/*  Google AUTH  */
 
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = '549053021714-vunpaljl9nn3t0qpogjeq3m6o40v8h36.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));
 
app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  
  function(req, res) {
    // Successful authentication, redirect success.
    console.log("no es 8")
    res.redirect('/Static/succes.ejs');
  });