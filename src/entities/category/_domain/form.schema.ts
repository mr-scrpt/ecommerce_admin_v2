import { selectItemSchema } from "@/shared/type/select";
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
  categoryList: z.array(selectItemSchema(z.string())).optional(),
});

export type CategoryFormDefaultValues<
  T extends z.ZodTypeAny = typeof categoryFormDefaultSchema,
> = z.infer<T>;
