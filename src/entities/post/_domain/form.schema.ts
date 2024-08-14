import { z } from "zod";

// NOTE: FORM
// NOTE: Main information

export const postFormDefaultSchema = z.object({
  settlementRef: z.string(),
  postId: z.string(),
});

export type PostFormDefaultValues = z.infer<typeof postFormDefaultSchema>;
