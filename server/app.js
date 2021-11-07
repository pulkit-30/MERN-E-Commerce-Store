const express = require("express");
app = express();
const path = require("path");
//Database connection
const connection = require("./database/connection");
connection();
//
const Cors = require("cors");
//Api Routes Files
const UserAuth = require("./routes/UserAuth");
const verification = require("./routes/Verification");
const User = require("./routes/User");
const Validation = require("./routes/Validation");
const Token = require("./routes/Token");
const Order = require("./routes/Order");
//
app.use(Cors());
app.use(express.json());

//Api Routes
app.use("/Auth", UserAuth);
app.use("/verify", verification);
app.use("/User", User);
app.use("/Valid", Validation);
app.use("/ExchangeToken", Token);
app.use("/Order", Order);
//declaring the port
const Port = process.env.PORT || 80;
//server listening
app.listen(Port, () => {
  console.log(`Server is Running at Port : `, Port);
});
