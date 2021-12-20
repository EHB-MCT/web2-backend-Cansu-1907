const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const userRoutes = require("./api/routes/users");
const villageRoutes = require("./api/routes/villages");

// connection to mongoDB with mongoose
const MONGODB_URI =
  "mongodb+srv://admin:admin123@cluster0.wror6.mongodb.net/course-project?retryWrites=true&w=majority";

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected");
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRoutes);
app.use("/villages", villageRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.listen(port, () => {
  console.log(`Running on port: ${port}`);
});
