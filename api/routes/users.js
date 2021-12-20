const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/user");

router.get("/", (req, res) => {
  const query = {};

  if (req.query.username) {
    query.username = req.query.username;
  }

  User.find(query)
    .exec()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/", (req, res) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  user
    .save()
    .then((result) => console.log(result))
    .catch((err) => console.log(err));

  res.status(201).json({
    message: "Handling POST request to /users",
    createdUser: user,
  });
});

router.get("/:userID", (req, res, next) => {
  const id = req.params.userID;

  User.findById(id)
    .exec()
    .then((doc) => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
