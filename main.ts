import express from "express";
import mongoose from "mongoose";
import { body, validationResult } from "express-validator";
import morgan from "morgan";
import cors from "cors";

import { getRanks, postRank } from "./app/data";

const PORT = process.env.PORT || 8000;

mongoose
  .connect("mongodb://localhost/memoryGame", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to mongodb 🌱");
  })
  .catch((err) => console.error(err));

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.send("Hi there! 🙂");
});

app.get("/ranks", async (req, res) => {
  const ranks = await getRanks();
  res.status(200).json({ data: { ranks } });
});

app.post(
  "/rank",
  body("name").isString(),
  body("time_spent").isNumeric(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const rank = await postRank({
      name: req.body.name,
      time_spent: req.body.time_spent,
    });

    res.status(200).json({ data: { rank } });
  }
);

app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT} 🚀`);
});
