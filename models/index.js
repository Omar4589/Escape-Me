const User = require("./User");
// const Booking = require("./Booking");
// const UserBooking = require("./UserBooking");
// const EscapeRoom = require("./EscapeRoom");
// const Leaderboard = require("./Leaderboard");
// const Review = require("./Review");

// User.belongsToMany(Booking, { through: UserBooking, foreignKey: "user_id" });
// Booking.belongsToMany(User, { through: UserBooking, foreignKey: "booking_id" });
// Booking.belongsTo(EscapeRoom, { foreignKey: "escape_room_id" });


module.exports = {
  User,
  // Booking,
  // UserBooking,
  // EscapeRoom,
  // Leaderboard,
  // Review,
};
