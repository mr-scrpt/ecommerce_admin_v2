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
        value: receiver.id,
        label: `${receiver.name} ${receiver.lastName}`,
        name: receiver.name,
        lastName: receiver.lastName,
        phone: receiver.phone,
      }
    : null;

export const buildReceiverOptionsArray = (
  receiverList?: Array<Receiver | null | undefined> | null,
): Array<ReceiverDefaultSelectOption> =>
  receiverList ? filterNullValues(receiverList.map(buildReceiverOption)) : [];
