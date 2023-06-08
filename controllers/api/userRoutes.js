// Import necessary modules and files
const router = require("express").Router();
const { User, EscapeRoom, Booking } = require("../../models");
const withAuth = require("../../utils/auth");

// POST route to handle user login
router.post("/login", async (req, res) => {
  try {
    // Check if email and password are provided
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ message: "Both email and password must be provided." });
    }
    // Search for a user with the provided email
    const userData = await User.findOne({ where: { email: req.body.email } });

    // If no user is found with the provided email, return an error
    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    // Check if the provided password matches the one stored for the found user
    const validPassword = await userData.checkPassword(req.body.password);

    // If the password does not match, return an error
    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    // If the email and password match, initialize a new session and return a success message
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.isAdmin = userData.isAdmin; // set isAdmin in the session

      res.json({
        user: userData.toSafeObject(),
        message: "You are now logged in!",
      });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// POST route to handle user logout
router.post("/logout", (req, res) => {
  // If a session exists, destroy it and send a success response
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    // If no session exists, send an error response
    res.status(404).end();
  }
});

// POST route to handle new user signup
router.post("/signup", async (req, res) => {
  try {
    // Check if all required fields are provided
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ message: "Email and password are required for signup." });
    }
    // Create a new user with the provided data
    const newUser = await User.create(req.body);

    // Initialize a new session for the signed up user
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;
      res.status(200).json(newUser.toSafeObject());
    });
  } catch (err) {
    res.status(400).json("Server error");
  }
});

// POST request to handle a new booking
router.post("/booking", withAuth, async (req, res) => {
  try {
    // Check if all required fields are provided
    if (!req.body.escape_room_id || !req.body.date || !req.body.time) {
      return res
        .status(400)
        .json({ message: "All fields are required for creating a booking." });
    }
    // Create a new booking with the provided data
    const newBooking = await Booking.create({
      escape_room_id: req.body.escape_room_id,
      user_id: req.session.user_id,
      date: req.body.date,
      time: req.body.time,
    });

    // If the booking is successfully created, send a success response
    res.status(201).json({ message: "Booking created", booking: newBooking });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Route to retrieve all escape rooms with a given theme, accessible only by logged-in users
router.get("/:escaperoomtheme", withAuth, async (req, res) => {
  try {
    // Find escape rooms with the given theme
    const escapeRoomData = await EscapeRoom.findAll({
      where: {
        theme: req.params.escaperoomtheme,
      },
    });

    // If no escape rooms are found, return a 404 error
    if (!escapeRoomData || escapeRoomData.length === 0) {
      return res.status(404).json({ message: "No escape rooms found." });
    }
    // Convert escapeRoomData instances to plain objects
    const rooms = escapeRoomData.map((room) => room.get({ plain: true }));
    res.status(200).json({ rooms });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
