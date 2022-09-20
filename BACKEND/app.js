const express = require("express");
const cors = require("cors");
const app = express();

const movieRoutes = require("./routes/movie");

app.use(express.json()); // for parsing application/json
app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use("/api", movieRoutes);

app.listen(5000);
