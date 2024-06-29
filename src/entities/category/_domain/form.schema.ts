import { z } from "zod";

// NOTE: FORM
// NOTE: Main information
export const categoryFormDefaultSchema = z.object({
  name: z
    .string()
    .min(3)
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    })
    .transform((name) => name.trim()),
  board: z.array(z.string()),
  propertyList: z.array(
    z.object({
      id: z.string(),
    }),
  ),
});

export type CategoryFormValues = z.infer<typeof categoryFormDefaultSchema>;
