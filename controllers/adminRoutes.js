const router = require("express").Router();
const { User, Booking, EscapeRoom } = require("../models");
const withAuthAdmin = require("../utils/auth2");
const dayjs = require("dayjs");

//Get route for admin home
router.get("/home", withAuthAdmin, async (req, res) => {
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
router.get("/bookings/:date", withAuthAdmin, async (req, res) => {
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
      include: [
        { model: EscapeRoom },
        { model: User, attributes: { exclude: ["password", "isAdmin"] } },
      ],
      order: [
        ["date", "ASC"],
        ["time", "ASC"],
      ],
    });

    const escapeRoomData = await EscapeRoom.findAll();

    // Convert bookingData instances to plain objects
    const bookings = bookingData.map((booking) => booking.get({ plain: true }));
    const escaperooms = escapeRoomData.map((room) => room.get({ plain: true }));

    const user = await userData.get({ plain: true });

    const date = dayjs(req.params.date).format("MM/DD/YYYY");

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

router.get("/users", withAuthAdmin, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const adminData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      //include: [{ model: Booking }],
    });
    //find all users that are not admins
    const userData = await User.findAll({
      where: { isAdmin: false },
      attributes: { exclude: ["password", "isAdmin"] },
    });

    //serialize results
    const users = await userData.map((user) => user.get({ plain: true }));

    const admin = await adminData.get({ plain: true });
console.log(users);
    //render results using handlebars
    res.render("manageusers", { users, admin, logged_in: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
