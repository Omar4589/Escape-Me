const router = require("express").Router();
const { User, Booking, EscapeRoom } = require("../../models");
const withAuth = require("../../utils/auth");

// Route to render home view, accessible only by logged-in users
router.get("/home", withAuth, async (req, res) => {
  try {
    // Find the logged-in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });

    // If no user is found, return a 404 error
    if (!userData) {
      return res.status(404).json({ message: "User not found." });
    }

    const user = await userData.get({ plain: true });

    // Fetch all escape rooms from the database
    const escapeRoomsData = await EscapeRoom.findAll();

    // If no escape rooms are found, return a 404 error
    if (!escapeRoomsData || escapeRoomsData.length === 0) {
      return res.status(404).json({ message: "No escape rooms found." });
    }

    const rooms = escapeRoomsData.map((room) => room.get({ plain: true }));
    // Render the "usersHomePage" view with the user and rooms data
    res.render("userHomePage", { ...user, rooms, logged_in: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to render booking page, accessible only by logged-in users
router.get("/booking", withAuth, async (req, res) => {
  try {
    // Find the logged-in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      //include: [{ model: Booking }],
    });

    // If no user is found, return a 404 error
    if (!userData) {
      return res.status(404).json({ message: "User not found." });
    }

    const user = await userData.get({ plain: true });

    // Fetch the escape rooms from the database
    const escapeRoomsData = await EscapeRoom.findAll({
      order: [["difficulty", "ASC"]],
    });

    // If no escape rooms are found, return a 404 error
    if (!escapeRoomsData || escapeRoomsData.length === 0) {
      return res.status(404).json({ message: "No escape rooms found." });
    }

    const escapeRooms = escapeRoomsData.map((escapeRoom) =>
      escapeRoom.get({ plain: true })
    );
    // Render the "booking" view with the user and escapeRooms data
    res.render("booking", { ...user, escapeRooms, logged_in: true });
  } catch (err) {
    console.info(err);
    res.status(500).json(err);
  }
});

// Route to render my bookings view, accessible only by logged-in users
router.get("/mybookings", withAuth, async (req, res) => {
  try {
    // Fetch all bookings for the logged-in user
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

    // If no bookings are found, return a 404 error
    if (!bookingsData || bookingsData.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found for this user." });
    }

    const bookings = bookingsData.map((booking) =>
      booking.get({ plain: true })
    );
    // Render the "mybookings" view with the bookings data
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
