import Sequelize from "sequelize";
import userModel from "./user.model.js";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST.split(":")[0],
    port: process.env.HOST.split(":")[1],
    dialect: process.env.DIALECT,
    logging: false, // Disable logging
  }
);

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = userModel(sequelize, Sequelize.DataTypes);

export { sequelize };
export default db;
