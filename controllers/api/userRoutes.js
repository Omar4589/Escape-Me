const router = require("express").Router();
const { User, Booking } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.post("/signup", async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    // if (!newUser) {
    //   res
    //     .status(400)
    //     .json({ message: "Something went wrong, please try again" });
    //   return;
    // }

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;

      res.status(200).json(newUser);
    });
  } catch (err) {
    console.log("Error occurred:");
    console.log(err);
    res.status(400).json("Server error");
  }
});

// POST request for a new booking
router.post("/booking", withAuth, async (req, res) => {
  try {
    const newBooking = await Booking.create({
      escape_room: req.body.escapeRoom,
      user_id: req.session.user_id,
      date: req.body.date,
      time: req.body.time,
    });

    res.status(201).json({ message: "Booking created", booking: newBooking });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
