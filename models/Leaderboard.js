// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');

// class Leaderboard extends Model {}

// Leaderboard.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     escape_room_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: 'escapeRoom',
//         key: 'id',
//       },
//     },
//     user_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: 'user',
//         key: 'id',
//       },
//     },
//     completion_time: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//   },
//   {
//     sequelize,
//     modelName: 'leaderboard',
//     timestamps: true,
//     createdAt: 'created_at',
//     updatedAt: 'updated_at',
//   }
// );

// module.exports = Leaderboard;
