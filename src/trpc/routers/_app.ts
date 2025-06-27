import { z } from "zod";
import { baseProocedure, createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  createAI: baseProocedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query((opts) => {
      return {
        greeting: `Hello ${opts.input.text}`,
      };
    }),
});

export type AppRouter = typeof appRouter;
