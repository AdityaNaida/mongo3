const express = require("express");
const app = express();
const path = require("path");
const port = 8080;
const mongoose = require("mongoose");

main()
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("Root is working");
});

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
