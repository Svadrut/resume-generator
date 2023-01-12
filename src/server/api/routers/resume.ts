import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { openai } from "../../../utils/openai";

export const resumeRotuer = createTRPCRouter({
  getResponse: publicProcedure
    .input(z.object({ resumeText: z.string() }))
    .mutation(async ({ input: { resumeText }, ctx: { prisma } }) => {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Generate a resume based on these experiences and acheivments: ${resumeText}`,
        max_tokens: 256,
        temperature: 0.7,
      });
      if (!response.data.choices) {
        const error = new Error("Please try again later");
        throw error;
      } else {
        await prisma.resume.create({
          data: {
            promtText: resumeText,
            generatedText: response.data.choices[0]!.text!,
          },
        });

        return response.data.choices[0]!.text;
      }
    }),
});
