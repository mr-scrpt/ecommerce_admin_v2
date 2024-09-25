import { z } from "zod";
import { Consumer } from "./consumer.type";
import { filterNullValues } from "@/shared/lib/filter";

// NOTE: Select Consumer Option
export const consumerDefaultSelectOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
  name: z.string(),
  lastName: z.string(),
  phone: z.string(),
  active: z.boolean().optional(),
});

export type ConsumerDefaultSelectOption = z.infer<
  typeof consumerDefaultSelectOptionSchema
>;

// NOTE: Build Consumer Option
export const buildConsumerAddressOption = (
  consumer?: Consumer | null,
): ConsumerDefaultSelectOption | null =>
  consumer
    ? {
        value: consumer.id,
        label: consumer.name,
        name: consumer.name,
        lastName: consumer.lastName,
        phone: consumer.phone,
      }
    : null;

export const buildConsumerOptionsArray = (
  consumer?: Array<Consumer | null | undefined> | null,
): Array<ConsumerDefaultSelectOption> =>
  consumer ? filterNullValues(consumer.map(buildConsumerAddressOption)) : [];
