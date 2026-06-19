const { Sequelize } = require("sequelize");
require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";

const sequelize = new Sequelize(
  isProduction
    ? process.env.DB_PROD_NAME
    : process.env.DB_NAME_DEVELOPMENT,

  isProduction
    ? process.env.DB_PROD_USERNAME
    : process.env.DB_LOCAL_USERNAME,

  isProduction
    ? process.env.DB_PROD_PASSWORD
    : process.env.DB_LOCAL_PASSWORD,

  {
    host: isProduction
      ? process.env.DB_PROD_HOST
      : process.env.DB_LOCAL_HOST,

    port: isProduction
      ? process.env.DB_PROD_PORT
      : 3306,

    dialect: "mysql",
    logging: false,
  }
);

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Unable to connect database!", error);
  }
}

connectDB();

module.exports = sequelize;