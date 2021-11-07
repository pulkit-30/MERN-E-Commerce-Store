require("dotenv").config();
const mongoose = require("mongoose");
//main function
async function main() {
  //to connect the mongodb
  await mongoose
    .connect(process.env.DB_SERVER)
    .then(() => {
      console.log("Database is connected successfully");
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = main;
