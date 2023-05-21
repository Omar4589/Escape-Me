const router = require("express").Router();
const { User, Booking, EscapeRoom } = require("../models");
const withAuth = require("../utils/auth");
const { Op } = require("sequelize");
const dayjs = require("dayjs");

//Get route for admin home
router.get("/home", async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      //include: [{ model: Booking }],
    });

    const user = await userData.get({ plain: true });

    res.render("adminHome", { ...user, logged_in: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get route for  manage bookings view
router.get("/bookings/:date", async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      //include: [{ model: Booking }],
    });

    // Find all bookings for the given date
    const bookingData = await Booking.findAll({
      where: {
        date: req.params.date,
      },
      include: [{ model: EscapeRoom }, { model: User,attributes: { exclude: ["password", "isAdmin"], }, }],
      order: [
        ["date", "ASC"],
        ["time", "ASC"],
      ],
    });

  

    const escapeRoomData = await EscapeRoom.findAll();

    // Convert bookingData instances to plain objects
    const bookings = bookingData.map((booking) => booking.get({ plain: true }));
    console.log(bookings);
    const escaperooms = escapeRoomData.map((room) => room.get({ plain: true }));

    const user = await userData.get({ plain: true });

    res.render("managebookings", {
      ...user,
      bookings,
      escaperooms,
      date: dayjs(req.params.date).format("MM/DD/YYYY"),
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
