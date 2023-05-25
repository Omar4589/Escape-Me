const router = require("express").Router();
const { User, Booking, EscapeRoom } = require("../models");
const withAuth = require("../utils/auth");

router.get("/home", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      //include: [{ model: Booking }],
    });

    const user = await userData.get({ plain: true });

    const escapeRoomsData = await EscapeRoom.findAll();

    const rooms = await escapeRoomsData.map((room) => room.get({ plain: true }));
    console.log(rooms)

    res.render("userHomePage", { ...user, rooms, logged_in: true });
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

    // Fetch the escape rooms from the database
    const escapeRoomsData = await EscapeRoom.findAll({
      order: [["difficulty", "ASC"]],
    });

    const escapeRooms = escapeRoomsData.map((escapeRoom) =>
      escapeRoom.get({ plain: true })
    );

    res.render("booking", { ...user, escapeRooms, logged_in: true }); // Pass the escapeRooms to the template
  } catch (err) {
    console.info(err);
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
      include: [
        {
          model: EscapeRoom,
        },
      ],
    });

    const bookings = bookingsData.map((booking) =>
      booking.get({ plain: true })
    );

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
