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
router.get("/bookings/", withAuthAdmin, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      //include: [{ model: Booking }],
    });

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

    const escapeRoomData = await EscapeRoom.findAll();

    // Convert bookingData instances to plain objects
    const bookings = bookingData.map((booking) => booking.get({ plain: true }));
    const escaperooms = escapeRoomData.map((room) => room.get({ plain: true }));

    const user = await userData.get({ plain: true });

    // this does nothing rn , delete it if we dont need it const date = dayjs(req.params.date).format("MM/DD/YYYY");

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

//Get route for  manage bookings view
router.get("/bookings/:date", withAuthAdmin, async (req, res) => {
  try {
    // Find all bookings for the given date
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

    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json(err);
  }
});

// This route will delete the booking that is equal to the ID
router.delete("/bookings/:id", withAuthAdmin, async (req, res) => {
  try {
    const deleteBooking = await Booking.destroy({
      where: { id: req.params.id },
    });
    if (!deleteBooking) {
      res.status(404).json({ message: "No booking with this ID found" });
      return;
    }
    res.status(200).json({ message: "The booking has been deleted" });
  } catch (err) {
    res.status(500).json({ message: "An error has occured" });
    console.log(err);
  }
});

//Get route for  manage bookings view
router.get("/bookings/:id/:date", async (req, res) => {
  try {
    // Find all bookings for the given id
    const bookings = await Booking.findAll({
      where: {
        escape_room_id: req.params.id,
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

    console.log(bookings);

    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/manageusers", withAuthAdmin, async (req, res) => {
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

router.get("/users", withAuthAdmin, async (req, res) => {
  try {
    const users = await User.findAll({where: {isAdmin: false }});
    if (!users) {
      res.status(400).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
  }
});

//DELETE route for deleting a user
router.delete("/users/:id", withAuthAdmin, async (req, res) => {
  try {
    const deleteUser = await User.destroy({
      where: { id: req.params.id },
    });
    if (!deleteUser) {
      res.status(404).json({ message: "No user with this ID found" });
      return;
    }
    res.status(200).json({ message: "The user has been deleted" });
  } catch (err) {
    res.status(500).json({ message: "An error has occured" });
    console.log(err);
  }
});

module.exports = router;
