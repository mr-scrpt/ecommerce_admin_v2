import { z } from "zod";

// NOTE: FORM
// NOTE: Main information
export const receiverFormDefaultSchema = z.object({
  name: z.string(),
  lastName: z.string(),
  phone: z.string(),
  receiverId: z.string(),
});

export type ReceiverFormDefaultValues = z.infer<
  typeof receiverFormDefaultSchema
>;
