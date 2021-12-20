const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Village = require("../models/village");

router.get("/", (req, res) => {
  const query = {};

  if (req.query.username) {
    query.username = req.query.username;
  }

  Village.find(query)
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
  const village = new Village({
    _id: new mongoose.Types.ObjectId(),
    username: req.body.username,
    villageName: req.body.villageName,
    villagers: req.body.villagers,
    furniture: req.body.furniture,
    wallFurniture: req.body.wallFurniture,
    fishes: req.body.fishes,
    bugs: req.body.bugs,
    sea: req.body.sea,
    fossils: req.body.fossils,
  });

  village
    .save()
    .then((result) => console.log(result))
    .catch((err) => console.log(err));

  res.status(201).json({
    message: "Handling POST request to /villages",
    createdVillage: village,
  });
});

router.get("/:villageID", (req, res) => {
  const id = req.params.villageID;

  Village.findById(id)
    .exec()
    .then((doc) => {
      return res.json(doc);
    })
    .catch((err) => console.log(err));
});

router.delete("/:villageID", (req, res, next) => {
  const id = req.params.villageID;
  Village.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.patch("/:villageID", (req, res, next) => {
  const id = req.params.villageID;
  Village.updateOne(
    { _id: id },
    { $set: { villageName: req.body.newVillageName } }
  )
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
