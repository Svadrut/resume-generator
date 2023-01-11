import { createTRPCRouter } from "./trpc";
import { resumeRotuer } from "./routers/resume";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  resume: resumeRotuer,
});

// export type definition of API
export type AppRouter = typeof appRouter;
