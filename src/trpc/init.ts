import { initTRPC } from "@trpc/server";
import superjson from "superjson";

export const createTRPCContext = () => {
  return { userId: "user_123" };
};

const t = initTRPC.create({
  transformer: superjson,
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProocedure = t.procedure;
