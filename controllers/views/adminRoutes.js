const router = require("express").Router();
const { User, Booking, EscapeRoom } = require("../../models");
const withAuthAdmin = require("../../utils/auth2");
const dayjs = require("dayjs");

// Route to render adminHome view, accessible only by an admin
router.get("/home", withAuthAdmin, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });
    // Validate the user exists
    if (!userData) {
      return res.status(404).json({ message: "No user found." });
    }

    // Retrieve the plain object representation of the user data
    const user = await userData.get({ plain: true });

    // Find all bookings, including related EscapeRoom and User data
    const bookingData = await Booking.findAll({
      where: { date: dayjs() },
      include: [{ model: EscapeRoom }, { model: User }],
      order: [["time", "ASC"]], // Sort the bookings by time in ascending order
    });

    // Retrieve the plain object representation of the bookings data
    const bookings = bookingData.map((booking) => booking.get({ plain: true }));

    // Render the "adminHome" view with the user and bookings data
    res.render("adminHome", { user, bookings, isAdmin: true, logged_in: true });
  } catch (err) {
    // Handle errors by sending a JSON response with the error message
    res.status(500).json(err);
  }
});

// Route to render manage bookings view, accessible only by an admin
router.get("/managebookings/", withAuthAdmin, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      //include: [{ model: Booking }],
    });

    // Validate if user data exists
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find all bookings for the given date
    const bookingData = await Booking.findAll({
      include: [
        { model: EscapeRoom },
        { model: User, attributes: { exclude: ["password", "isAdmin"] } },
      ],
      order: [
        ["date", "ASC"],
        ["time", "ASC"],
      ],
    });

    // Validate if booking data exists
    if (!bookingData || bookingData.length === 0) {
      return res.status(404).json({ message: "No bookings found" });
    }

    // Find all escape rooms
    const escapeRoomData = await EscapeRoom.findAll();
    // Validate escape room data
    if (!escapeRoomData || escapeRoomData.length === 0) {
      return res.status(404).json({ message: "No Escape Room Data found." });
    }

    // Convert bookingData instances to plain objects
    const bookings = bookingData.map((booking) => booking.get({ plain: true }));

    // Convert escapeRoomData instances to plain objects
    const escapeRooms = escapeRoomData.map((room) => room.get({ plain: true }));

    // Retrieve the plain object representation of the user data
    const user = await userData.get({ plain: true });
    // Render the "managebookings" view with the provided data
    res.render("managebookings", {
      ...user,
      bookings,
      escapeRooms,
      date: dayjs(req.params.date).format("MM/DD/YYYY"),
      logged_in: true,
      isAdmin: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to render manage users view, accessible only by an admin
router.get("/manageusers", withAuthAdmin, async (req, res) => {
  try {
    //find all users that are not admins
    const userData = await User.findAll({
      where: { isAdmin: false },
      attributes: { exclude: ["password", "isAdmin"] },
    });
    // Validate userData
    if (!userData || userData.length === 0) {
      return res.status(404).json({ message: "No users found." });
    }
    // Convert users instances to plain objects
    const users = await userData.map((user) => user.get({ plain: true }));
    // Render the "manageusers" view with the provided data
    res.render("manageusers", { users, isAdmin: true, logged_in: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to render manage escape rooms view, accessible only by an admin
router.get("/manageescaperooms", withAuthAdmin, async (req, res) => {
  try {
    // Find all escape room data
    const roomData = await EscapeRoom.findAll();

    // Validate that roomData is truthy (not null or undefined) and contains at least one escape room
    if (!roomData || roomData.length === 0) {
      return res.status(400).json({ message: "No Escape Rooms found" });
    }

    // Serialize the room data to plain objects
    const rooms = await roomData.map((room) => room.get({ plain: true }));

    // Render the "manageescaperooms" view with the rooms and other flags passed as data
    res.render("manageescaperooms", { rooms, isAdmin: true, logged_in: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
