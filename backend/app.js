const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const bp = require("body-parser"); //for getting data //Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");

var routeManager = require("./routes");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/qr");
}

//connection holder
const con = mongoose.connection;

con.on("open", function () {
  console.log("Connected to database");
});

app.use(cookieParser());

app.set("views", `${__dirname}/views`);
app.set("view engine", "ejs");
app.use(bp.json()); //for json data
app.use(bp.urlencoded()); // for form data
app.use(express.json()); //this is to accept data in json format
app.use(express.urlencoded({ extended: false })); //it allows us to access and decode information coming from form. parse the json data
app.use("/public", express.static(__dirname + "/public"));
app.use(cors());

app.use("/", routeManager);

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res
    .status(statusCode)
    .json({ message: err.message, success: false, data: err.data });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
