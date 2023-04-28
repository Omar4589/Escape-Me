const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Leaderboard extends Model {}

Leaderboard.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    escape_room_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'escape_rooms',
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    completion_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Leaderboard',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

module.exports = Leaderboard;