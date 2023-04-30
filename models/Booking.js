// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');

// class Booking extends Model {}

// Booking.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     user_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: 'user',
//         key: 'id',
//       },
//     },
//     escape_room_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: 'escapeRoom',
//         key: 'id',
//       },
//     },
//     time_slot: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//   },
//   {
//     sequelize,
//     modelName: 'booking',
//     timestamps: true,
//     createdAt: 'created_at',
//     updatedAt: 'updated_at',
//   }
// );

// module.exports = Booking;