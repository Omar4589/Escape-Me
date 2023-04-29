const router = require("express").Router();
const { User, Booking, EscapeRoom, Leaderboard, Review } = require("../models");
const withAuth = require("../utils/auth");

router.get("/home", async (req, res) => {
  try {
    // const userData = await User.findAll({
    //   attributes: { exclude: ["password"] },
    //   order: [["name", "ASC"]],
    // });

    // const users = userData.map((project) => project.get({ plain: true }));

    res.render(
      "userhomepage" //{
      //users,
      //logged_in: req.session.logged_in,
      //}
    );
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
