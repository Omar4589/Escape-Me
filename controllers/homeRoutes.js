const router = require("express").Router();
const { User, Booking, EscapeRoom, Leaderboard, Review } = require("../models");
//const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  res.render("welcomePage");
});

router.get("/login", async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/user/home");
    return;
  }

  res.render("loginPage");
});

router.get("/signup", (req, res) => {
  res.render("signupPage");
});

// router.get("/leaderboard", (req, res) => {
//   res.render("leaderboardPage");
// });

// router.post("/leaderboard", (req, res) => {
//   res.render("");
// });

// router.get("/reviews", (req, res) => {
//   res.render("reviewsPage");
// });

// router.post("/reviews", (req, res) => {
//   res.render("");
// });

module.exports = router;
