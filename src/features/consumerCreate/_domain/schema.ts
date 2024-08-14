import { consumerBaseSchema } from "@/kernel/domain/consumer/consumer.schema";

export const consumerRegistrationSchema = consumerBaseSchema.pick({
  name: true,
  lastName: true,
  email: true,
  phone: true,
});

export const consumerCreateSchema = consumerBaseSchema.pick({
  name: true,
  lastName: true,
  email: true,
  phone: true,
});
