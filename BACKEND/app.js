const express = require("express");
const cors = require("cors");
const app = express();

const movieRoutes = require("./routes/movie");
const authorizationMiddleWare = require("./middleware/Authorization");

app.use(express.json()); // for parsing application/json
app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.status(404).send("<h1>Page not found on the server</h1>");
});

app.post("/login", authorizationMiddleWare.authorization);

app.use("/api", authorizationMiddleWare.authToken, movieRoutes);

app.listen(5000);
