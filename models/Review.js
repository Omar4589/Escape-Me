// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');

// class Review extends Model {}

// Review.init(
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
//     rating: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       validate: {
//         min: 1,
//         max: 5,
//       },
//     },
//     comment: {
//       type: DataTypes.TEXT,
//       allowNull: true,
//     },
//   },
//   {
//     sequelize,
//     modelName: 'review',
//     timestamps: true,
//     createdAt: 'created_at',
//     updatedAt: 'updated_at',
//   }
// );

// module.exports = Review;