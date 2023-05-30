const router = require("express").Router();

router.get("/", async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/home");
    return;
  }
  res.render("welcomePage");
});

router.get("/login", async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/home");
    return;
  }

  res.render("loginPage");
});

router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/home");
    return;
  }
  res.render("signupPage");
});

router.get("/escaperooms", (req, res) => {
 
  res.render("escapeRooms");
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
