const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize (
    process.env.DB_NAME_DEVELOPMENT,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql', //sequelize konsa database use kar raha hai uska name likhne ke liye
        port: 3306,
        logging: false //console me msg query print hogi
    }
);

async function connectDB() {  //async function - database connection time use hota hai
    try {
        await sequelize.authenticate(); //sequelize ka built-in method, db name,pw, host sab check karne ke liye sahi hai ki nahi
        console.log('database connected succesfully...!'); //debuging ke liye log ka use hota hai
    } catch (error) {
        console.error('unable to connect to the database..!', error);
    }
}

connectDB() //database connect karne ke liye, yee call nahi karega to function sif defined rahega , execute nahi hoga

module.exports = sequelize;