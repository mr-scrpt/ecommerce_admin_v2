import { cartRowBaseSchema } from "@/entities/cart/server";

export const cartRowCreateSchema = cartRowBaseSchema.pick({ productId: true });
