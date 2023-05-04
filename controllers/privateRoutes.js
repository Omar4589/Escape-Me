const router = require("express").Router();
const { User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/home", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      //include: [{ model: Booking }],
    });

    const user = await userData.get({ plain: true });

    res.render("userHomePage", { ...user, logged_in: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/booking", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      //include: [{ model: Booking }],
    });

    const user = await userData.get({ plain: true });

    res.render("booking", { ...user, logged_in: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
