const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const ejs = require("ejs");
const path = require("path");
const bp = require("body-parser"); //Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
//const User = require("./modules/qr/qr.model");
var routeManager = require("./routes");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/qr");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//connection holder
const con = mongoose.connection;

con.on("open", function () {
  console.log("Connected to database");
});

app.set("views", `${__dirname}/views`);
app.set("view engine", "ejs");
app.use(bp.json()); //for json data
app.use(bp.urlencoded()); // for form data
app.use(express.json()); //this is to accept data in json format
app.use(express.urlencoded({ extended: false })); //it allows us to access and decode information coming from form.
app.use("/public", express.static(__dirname + "/public"));

app.use("/", routeManager);
app.use((err, req, res, next) => {
  res
    .status(500)
    .json({ message: err.message, success: false, data: err.data, error: err });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
