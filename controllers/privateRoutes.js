const router = require("express").Router();
const { User, Booking } = require("../models");
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

// GET request for mybookings view
router.get("/mybookings", withAuth, async (req, res) => {
  try {
    const bookingsData = await Booking.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    const bookings = bookingsData.map((booking) =>
      booking.get({ plain: true })
    );
    console.log(bookings);

    res.render("mybookings", {
      bookings,
      logged_in: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
