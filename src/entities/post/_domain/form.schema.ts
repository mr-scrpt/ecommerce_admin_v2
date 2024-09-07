import { selectItemSchema } from "@/shared/type/select";
import { z } from "zod";

// NOTE: FORM
// NOTE: Main information

export const postFormDefaultSchema = z.object({
  // settlementRef: z.string(),
  // postId: z.string(),
  postOfficeList: z.array(selectItemSchema(z.string())).optional(),
});

export type PostFormDefaultValues = z.infer<typeof postFormDefaultSchema>;
export const defaultFieldsValues: PostFormDefaultValues = {
  postOfficeList: [],
};
