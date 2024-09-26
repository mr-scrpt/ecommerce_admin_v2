import { z } from "zod";
import { Receiver } from "./receiver.type";
import { filterNullValues } from "@/shared/lib/filter";

// NOTE: Select Receiver Option
export const receiverDefaultSelectOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
  name: z.string(),
  phone: z.string(),
  lastName: z.string(),
  active: z.boolean().optional(),
});

export type ReceiverDefaultSelectOption = z.infer<
  typeof receiverDefaultSelectOptionSchema
>;

// NOTE: Build Receiver Option
export const buildReceiverOption = (
  receiver?: Receiver | null,
): ReceiverDefaultSelectOption | null =>
  receiver
    ? {
        label: receiver.name,
        value: receiver.id,
        name: receiver.name,
        lastName: receiver.lastName,
        phone: receiver.phone,
      }
    : null;

export const buildReceiverOptionsArray = (
  receiver?: Array<Receiver | null | undefined> | null,
): ReceiverDefaultSelectOption[] =>
  receiver ? filterNullValues(receiver.map(buildReceiverOption)) : [];
