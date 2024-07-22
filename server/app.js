const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const User = require("./database/Schemas/UserSchema");
const mongoose = require("mongoose");
const mongoConfig = require("./database/config");

const userAuthRoutes = require("./routes/user/authentication");
const librarianAuthRoutes = require("./routes/librarian/authentication");
const otherRoutes = require("./routes/visitors/routes");
const librarianOtherRoutes = require("./routes/librarian/others");
const userOtherRoutes = require("./routes/user/others");

mongoose.connect(mongoConfig.url);

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(bodyParser.text({ limit: "200mb" }));
app.use(express.json());

app.use("/user/authentication", userAuthRoutes);
app.use("/librarian/authentication", librarianAuthRoutes);
app.use("/librarian", librarianOtherRoutes);
app.use("/user", userOtherRoutes);
app.use("/", otherRoutes);

app.listen(port);
