const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRouter");
dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

// Database configuration
const db = require("./config/db");
db.connect();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes configuration
app.use("/api/v1/user", userRouter);

app.get("/", (req, res) => {
  res.send("Nodejs is running....");
});

app.listen(port, () => {
  console.log(`Server is running at the port ${port}`);
});
