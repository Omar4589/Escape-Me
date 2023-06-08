// Import necessary modules and files
const router = require("express").Router();
const { User, Booking, EscapeRoom } = require("../../models");
// Middleware for verifying if a user is an admin
const withAuthAdmin = require("../../utils/auth2");

// Route to retrieve all bookings for a given date, accessible only by an admin
router.get("/bookings/:date", withAuthAdmin, async (req, res) => {
  try {
    console.log(req.params.date);
    // Check if the date parameter is a valid date
    if (isNaN(Date.parse(req.params.date))) {
      return res.status(400).json({ message: "Invalid date." });
    }
    // Find all bookings for the given date, including related EscapeRoom and User data
    const bookings = await Booking.findAll({
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

    // If no bookings are found, return a 404 response
    //we use bookings.length === 0 instead of !bookings because sequelize returns an empty array if no bookings are found which is still truthy
    //we must check if the array contains anything
    if (!bookings || bookings.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found for this date." });
    }

    // Send the bookings data as a JSON response
    res.status(200).json(bookings);
  } catch (err) {
    // Handle errors by sending a JSON response with the error
    res.status(500).json(err);
  }
});

// Route to retrieve all bookings for a given escape room id on a particular date
router.get("/bookings/:id/:date", async (req, res) => {
  try {
    // Validate the date
    if (isNaN(Date.parse(req.params.date))) {
      return res.status(400).json({ message: "Invalid date." });
    }
    // Validate the id
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid id." });
    }
    // Find all bookings for the given escape room id and date, including related EscapeRoom and User data
    const bookings = await Booking.findAll({
      where: {
        escape_room_id: id,
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
    // Validate bookings
    if (!bookings || bookings.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found for this date." });
    }
    // Send the bookings data as a JSON response
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to retrieve all non-admin users
router.get("/users", withAuthAdmin, async (req, res) => {
  try {
    // Find all users that exist in the database where their isAdmin property is falsy
    const users = await User.findAll({ where: { isAdmin: false } });
    // If the 'users' array is empty, respond with a 404 status and an error message
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No non-admin users found." });
    }
    // Send the users data as a JSON response
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to display escape room details by theme, accessible only by an admin
router.get("/escaperoom/:theme", withAuthAdmin, async (req, res) => {
  try {
    const theme = req.params.theme;

    // Validate the theme parameter
    if (typeof theme !== "string" || theme.trim().length === 0) {
      return res.status(400).json({ message: "Invalid theme." });
    }

    // Find the escape room with the given theme
    const roomData = await EscapeRoom.findOne({ where: { theme } });

    // If no room data was found, send a 404 response
    if (!roomData) {
      return res.status(404).json({ message: "No Escape Room found" });
    }

    // Create a serialized version of the room data to send as a JSON response
    const serializedRoomData = {
      id: roomData.id,
      theme: roomData.theme,
      difficulty: roomData.difficulty,
      description: roomData.description,
      duration: roomData.duration,
      image_url: roomData.image_url,
      created_at: roomData.created_at,
      updated_at: roomData.updated_at,
    };

    res.status(200).json(serializedRoomData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to delete a booking by ID, accessible only by an admin
router.delete("/bookings/:id", withAuthAdmin, async (req, res) => {
  try {
    // Validate the id
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid id." });
    }
    const deleteBooking = await Booking.destroy({
      where: { id: id },
    });
    if (!deleteBooking) {
      // If no booking is found with the provided ID, send an error message
      res.status(404).json({ message: "No booking with this ID found" });
      return;
    }
    // Send a success message if the booking was successfully deleted
    res.status(200).json({ message: "The booking has been deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to delete a user by ID, accessible only by an admin
router.delete("/users/:id", withAuthAdmin, async (req, res) => {
  try {
    // Validate the id
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid id." });
    }
    const deleteUser = await User.destroy({
      where: { id: id },
    });
    if (!deleteUser) {
      // If no user is found with the provided ID, send an error message
      res.status(404).json({ message: "No user with this ID found" });
      return;
    }
    // Send a success message if the user was successfully deleted
    res.status(200).json({ message: "The user has been deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Export the router to be used by other parts of the application
module.exports = router;
