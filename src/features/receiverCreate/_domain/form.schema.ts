import { receiverFormDefaultSchema } from "@/entities/receiver";
import { z } from "zod";

export const receiverCreateFormSchema = receiverFormDefaultSchema;

export type ReceiverCreateFormValues = z.infer<typeof receiverCreateFormSchema>;
