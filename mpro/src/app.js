const express = require("express");
const lectureRoutes = require("./routes/lecture.routes");

const app = express();

app.use(express.json());
app.use("/lectures", lectureRoutes);

module.exports = app;
