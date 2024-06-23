import { cartRowBaseSchema } from "@/kernel/domain/cart/cartRow.schema";

export const cartRowCreateSchema = cartRowBaseSchema.pick({ productId: true });
