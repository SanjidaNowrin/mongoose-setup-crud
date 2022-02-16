//require mongoose
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
//connection creation and create db
mongoose
  .connect("mongodb://localhost:27017/hrCare", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection successfull .."))
  .catch((err) => console.log(err));

//schema
const playlistSchema = new mongoose.Schema({
  name: String,
  ctype: String,
  videos: Number,
  author: String,
  active: Boolean,
  date: {
    type: Date,
    default: Date.now,
  },
});
// model create kora mane collection create kora //collection creation
const Playlist = new mongoose.model("Playlist", playlistSchema);

//create multiple document or insert
const createDocument = async () => {
  try {
    const reactPlaylist = new Playlist({
      name: "Node JS",
      ctype: "Back End",
      videos: 80,
      author: "Thapa Technical",
      active: true,
    });
    const jsPlaylist = new Playlist({
      name: "JS",
      ctype: "Front End",
      videos: 10,
      author: "Thapa Technical",
      active: true,
    });
    const htmlPlaylist = new Playlist({
      name: "JS",
      ctype: "Front End",
      videos: 10,
      author: "Thapa Technical",
      active: true,
    });
    const result = await Playlist.insertMany([jsPlaylist, htmlPlaylist]);
    // console.log(result);
  } catch (err) {
    console.log(err);
  }
};
// createDocument();

// read document //lte means less than or equal
const getDocument = async () => {
  const result = await Playlist.find({ videos: { $lte: 50 } })
    .select({ name: 1 })
    .limit(1);
  console.log(result);
};
// getDocument();

// update document