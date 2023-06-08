const User = require('./User');
const Booking = require('./Booking');
const EscapeRoom = require('./EscapeRoom');
const BusinessHours = require('./BusinessHours');

// Defining the relationships between the User, Booking and EscapeRoom models
User.hasMany(Booking, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE', // Deleting all bookings when a user is deleted
});

Booking.belongsTo(User, {
  foreignKey: 'user_id',
});

EscapeRoom.hasMany(Booking, {
  foreignKey: 'escape_room_id',
  onDelete: 'CASCADE', // Deleting all bookings when an escape room is deleted
});

Booking.belongsTo(EscapeRoom, {
  foreignKey: 'escape_room_id',
});

module.exports = {
  User,
  Booking,
  EscapeRoom,
  BusinessHours,
};