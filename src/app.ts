import express from "express";
import "dotenv/config";
import { connectDB } from "./config/movieDB";
import { contactRoute } from "./Routes/contactRouter";
import movieRouter from "./Routes/movieRouter";

const app = express();

connectDB();

app.use(`/contact`, contactRoute);

app.use(`/movies`, movieRouter);

app.listen(5000, () => {
  console.log("we running in port 5000 now ");
});
