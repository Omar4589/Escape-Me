// Importing necessary modules
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Defining the BusinessHours model class
class BusinessHours extends Model {}

// Initializing the BusinessHours model with its schema
BusinessHours.init(
  {
    // Defining the fields for the BusinessHours model
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // The dayOfWeek of the business
    dayOfWeek: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // The openTime of the business
    openTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    // The closeTime of the business
    closeTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'businesshours',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

// Exporting the BusinessHours model for use in other files
module.exports = BusinessHours;
