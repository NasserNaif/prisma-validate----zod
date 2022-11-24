import { z } from "zod";

export const movieSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: "name is required !" })
      .min(3, "name must be more than 2"),
    genre: z.string({ required_error: "genre is required !" }).min(3),
    rating: z.number({ required_error: "rating is required !" }).min(1).max(5),
    duration: z.number({ required_error: "duration is required !" }).min(60),
  }),
});

export type MovieType = z.infer<typeof movieSchema>["body"];
