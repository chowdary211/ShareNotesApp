const path = require("path");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(express.static(path.join(__dirname, "public")));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cors
app.use(
  cors({
    origin: ["http://localhost:5000", "http://localhost:3000"],
    credentials: true,
  })
);

app.get("/", (request, response) => {
  response.send({ message: "welcome to sharenotes API" });
});

const cardsRouter = require("./routes/cards");
app.use("/api/cards", cardsRouter);

app.listen(port, () => console.log(`server listening at ${port}`));
