const express = require("express");
const app = express();
const path = require("path");
const port = 8080;
const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const chat1 = new Chat({
  from: "aditya",
  to: "gourav",
  msg: "hello! how are you?",
  date: new Date(),
});

chat1
  .save()
  .then((res) => console.log(res))
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Root is working");
});

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
