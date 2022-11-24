import { movie } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { prisma } from "../config/movieDB";
import { Request, Response } from "express";
import { movieSchema, MovieType } from "../schemas/movieSchema";

// get
export const getMovie = async (req: Request, res: Response) => {
  try {
    const moveis = await prisma.movie.findMany();
    return res.status(200).json(moveis);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "server Error !",
    });
  }
};

// post
export const postMovie = async (req: Request, res: Response) => {
  try {
    const newMovie = req.body as movie;
    await prisma.movie.create({
      data: newMovie,
    });
    return res.status(201).json({
      message: "movie Added !",
    });
  } catch (error) {
    const prismaError = error as PrismaClientKnownRequestError;
    if (prismaError.code == "P2002") {
      return res.status(400).json({
        message: "You phone number have been used before",
      });
    }
    return res.status(500).json({
      message: "Server Error !",
    });
  }
};

// update
export const updateMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const newMovie = req.body as movie;

    await prisma.movie.update({
      where: { id },
      data: newMovie,
    });
    return res.status(201).json({
      message: "movie updated !",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "server Error !",
    });
  }
};

// delete
export const deleteMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.movie.delete({
      where: { id },
    });

    return res.status(200).json({
      message: "movie Deleted !",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "server Error !",
    });
  }
};
