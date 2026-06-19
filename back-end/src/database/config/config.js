require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_LOCAL_USERNAME,
    password: process.env.DB_LOCAL_PASSWORD || null,
    database: process.env.DB_NAME_DEVELOPMENT,
    host: process.env.DB_LOCAL_HOST,
    dialect: "mysql",
    port: 3306
  },

  test: {
    username: process.env.DB_LOCAL_USERNAME,
    password: process.env.DB_LOCAL_PASSWORD || null,
    database: process.env.DB_NAME_TEST,
    host: process.env.DB_LOCAL_HOST,
    dialect: "mysql",
    port: 3306
  },

  production: {
    username: process.env.DB_PROD_USERNAME,
    password: process.env.DB_PROD_PASSWORD,
    database: process.env.DB_PROD_NAME,
    host: process.env.DB_PROD_HOST,
    dialect: "mysql",
    port: process.env.DB_PROD_PORT
  }
};