const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

const allChats = [
  {
    from: "anita",
    to: "ramu",
    msg: " send me notes",
    date: new Date(),
  },
  {
    from: "john",
    to: "raisa",
    msg: " Good morning raisa",
    date: new Date(),
  },
  {
    from: "rahul",
    to: "neha",
    msg: "tommrow is physics exam right?",
    date: new Date(),
  },
  {
    from: "ramesh",
    to: "suresh",
    msg: "give me 5 star",
    date: new Date(),
  },
  {
    from: "tony",
    to: "peter",
    msg: "love you 3000",
    date: new Date(),
  },
  {
    from: "dr starnage",
    to: "rachel",
    msg: " I love you in every universe",
    date: new Date(),
  },
];

Chat.insertMany(allChats);
