import { receiverDefaultSelectOptionSchema } from "@/kernel/domain/receiver/form.schema";
import { z } from "zod";

// NOTE: FORM
// NOTE: Main information
export const receiverFormDefaultSchema = z.object({
  name: z.string(),
  lastName: z.string(),
  phone: z.string(),
  receiverList: z.array(receiverDefaultSelectOptionSchema).optional(),
});

export type ReceiverFormDefaultValues<
  T extends z.ZodTypeAny = typeof receiverFormDefaultSchema,
> = z.infer<T>;

// TODO: DefaultValues
export const receiverDefaultFieldsValues: ReceiverFormDefaultValues = {
  name: "",
  lastName: "",
  phone: "",
  receiverList: [],
};
