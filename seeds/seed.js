const sequelize = require("../config/connection");
const EscapeRoom = require("../models/EscapeRoom");

const escapeRoomData = require("./escapeRoomSeedData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await EscapeRoom.bulkCreate(escapeRoomData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
