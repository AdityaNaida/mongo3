const express = require("express");
const app = express();
const path = require("path");
const port = 8080;
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

const ExpressError = require("./ExpressError.js");

main()
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const chat1 = new Chat({
  from: "aditya",
  to: "gourav",
  msg: "hello! how are you?",
  date: new Date(),
});

app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  res.render("index.ejs", { chats });
});

//New Route
app.get("/chats/new", (req, res) => {
  throw new ExpressError(404, "Page not found")
  res.render("new.ejs");
});

//Create Route
app.post("/chats", (req, res) => {
  const { from, msg, to } = req.body;
  const newChat = new Chat({
    from: from,
    msg: msg,
    to: to,
    date: new Date(),
  });
  newChat
    .save()
    .then(() => {
      console.log("Chat Saved");
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/chats");
});

//NEW - Show Rooute
app.get("/chats/:id", async(req, res, next) => {
  const { id }= req.params;
  let chat = await Chat.findById(id);
  if (!chat) {
    next(new ExpressError(404, "Chat not found")) 
  }
  res.render("edit.ejs", {chat})
})

//Edit Route
app.get("/chats/:id/edit", async (req, res) => {
  const { id } = req.params;
  const chat = await Chat.findById({ _id: id });
  res.render("edit.ejs", { chat });
});

//Update Route
app.put("/chats/:id", async (req, res) => {
  const { id } = req.params;
  const { msg } = req.body;
  const updatedChat = await Chat.findByIdAndUpdate(
    id,
    { msg: msg },
    { runValidators: true, new: true }
  );
  res.redirect("/chats");
});

//Destroy Route

app.delete("/chats/:id", async (req, res) => {
  const { id } = req.params;
  const deletedChat = await Chat.findByIdAndDelete(id);
  console.log(deletedChat);
  res.redirect("/chats");
});

//Error handle middleware
app.use((err, req, res, next) => {
  const { status= 500 , message= "Some Error Occured"} = err;
  res.status(status).send(message);
})

app.get("/", (req, res) => {
  res.send("Root is working");
});

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
