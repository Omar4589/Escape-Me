const User = require("./User");
const Booking = require("./Booking");
// const UserBooking = require("./UserBooking");
const EscapeRoom = require("./EscapeRoom");
// const Leaderboard = require("./Leaderboard");
// const Review = require("./Review");

// Define relationships between models
User.hasMany(Booking, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Booking.belongsTo(User, {
  foreignKey: "user_id",
});

EscapeRoom.hasMany(Booking, {
  foreignKey: "escape_room_id",
  onDelete: "CASCADE",
});

Booking.belongsTo(EscapeRoom, {
  foreignKey: "escape_room_id",
});

module.exports = {
  User,
  Booking,
  // UserBooking,
  EscapeRoom,
  // Leaderboard,
  // Review,
};
