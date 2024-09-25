import { postDefaultSelectOptionSchema } from "@/kernel/domain/post/form.schema";
import { z } from "zod";

// NOTE: FORM
// NOTE: Main information

export const postFormDefaultSchema = z.object({
  postOfficeList: z.array(postDefaultSelectOptionSchema).optional(),
});

export type PostFormDefaultValues<
  T extends z.ZodTypeAny = typeof postFormDefaultSchema,
> = z.infer<T>;

export const postDefaultFieldsValues: PostFormDefaultValues = {
  postOfficeList: [],
};
