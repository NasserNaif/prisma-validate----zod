import { prisma } from "../config/DB";
import { PrismaClient, Users } from "@prisma/client";

import { Request, Response } from "express";
import { UserSchemaType } from "../schemas/userSchema";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

// get all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const getAllUsers = await prisma.users.findMany();
    return res.status(200).json(getAllUsers);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "server Error !",
    });
  }
};

// post user
export const postUser = async (req: Request, res: Response) => {
  try {
    const newUser = req.body as UserSchemaType[`body`];
    await prisma.users.create({ data: newUser });

    return res.status(201).json({
      message: "user Added successfully",
    });
  } catch (error) {
    const prismaError = error as PrismaClientKnownRequestError;
    if (prismaError.code == "P2002") {
      return res.status(400).json({
        message: "Your email have been used before",
      });
    } else {
      return res.status(500).json({
        message: "Server Error !",
      });
    }
  }
};

// get user by id
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id, username } = req.params;
    const findUserbyUser = await prisma.users.findMany({
      // where: { id },
      where: {
        OR: [
          {
            id: id,
          },
          {
            username: username,
          },
        ],
      },
    });
    return res.status(200).json(findUserbyUser);
  } catch (error) {
    const prismaError = error as PrismaClientKnownRequestError;
    if (prismaError.code == "P2006") {
      return res.status(400).json({
        message: "Your email have been used before",
      });
    } else {
      return res.status(500).json({
        message: "Server Error !",
      });
    }
  }
};

// get user by email
export const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const email = req.params.email;
    const findUserbyUser = await prisma.users.findFirst({
      where: { email: email },
    });
    return res.status(200).json(findUserbyUser);
  } catch (error) {
    const prismaError = error as PrismaClientKnownRequestError;
    if (prismaError.code == "P2006") {
      return res.status(400).json({
        message: "Your email have been used before",
      });
    } else {
      return res.status(500).json({
        message: "Server Error !",
      });
    }
  }
};
