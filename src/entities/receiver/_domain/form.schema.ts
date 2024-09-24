import {
  ReceiverDefaultSelectOption,
  receiverDefaultSelectOptionSchema,
} from "@/kernel/domain/receiver/form.schema";
import { Receiver } from "@/kernel/domain/receiver/receiver.type";
import { filterNullValues } from "@/shared/lib/filter";
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
