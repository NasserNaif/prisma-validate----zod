import express from "express";
import {
  deleteMovie,
  getMovie,
  postMovie,
  updateMovie,
} from "../controler/movieControler";
import validate from "../middleware/validate";
import { movieSchema } from "../schemas/movieSchema";
import { movie } from "@prisma/client";

const movieRouter = express.Router();

movieRouter.get(`/`, getMovie);
movieRouter.post(`/`, validate(movieSchema), postMovie);


export default movieRouter;
