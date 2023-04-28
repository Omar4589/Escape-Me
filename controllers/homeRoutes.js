const router = require("express").Router();
const { User, Booking, EscapeRoom, Leaderboard, Review } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  res.render("welcomePage");
});

router.get('/login', async (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });



  router.get("/signup", (req, res) => {
    res.render("signup");
  });



  router.get("/leaderboard", (req, res) => {
    res.render("leaderboard");
  });

  router.post("/leaderboard", (req, res) => {
    res.render("leaderboard");
  });

module.exports = router;
