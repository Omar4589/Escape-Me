// Importing the Express module.
const router = require("express").Router();

router.get("/", async (req, res) => {
  // Checking if the session exists and the user is logged in.
  if (req.session && req.session.logged_in) {
    // Redirecting the logged-in user to the "/home" path.
    res.redirect("/home");
    return;
  }
  // Rendering the "welcomePage" view for non-logged-in users.
  res.render("welcomePage");
});

router.get("/login", async (req, res) => {
  // Checking if the session exists and the user is logged in.
  if (req.session && req.session.logged_in) {
    // Redirecting the logged-in user to the "/home" path.
    res.redirect("/home");
    return;
  }
  // Rendering the "loginPage" view for non-logged-in users.
  res.render("loginPage");
});

router.get("/signup", (req, res) => {
  // Checking if the session exists and the user is logged in.
  if (req.session && req.session.logged_in) {
    // Redirecting the logged-in user to the "/home" path.
    res.redirect("/home");
    return;
  }
  // Rendering the "signupPage" view for non-logged-in users.
  res.render("signupPage");
});

router.get("/escaperooms", (req, res) => {
  // Rendering the "escapeRooms" view for all users.
  res.render("escapeRooms");
});

// Exporting the router module for other parts of the application to use.
module.exports = router;
