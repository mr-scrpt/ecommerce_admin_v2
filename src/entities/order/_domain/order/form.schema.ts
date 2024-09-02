import {
  OrderPaymentStatusEnum,
  OrderStatusEnum,
} from "@/kernel/domain/order/order.type";
import { selectItemSchema } from "@/shared/type/select";
import { z } from "zod";

// NOTE: FORM
// NOTE: Main information

export const orderFormDefaultSchema = z.object({
  orderStatusList: z.array(selectItemSchema(z.nativeEnum(OrderStatusEnum))),
  orderPaymentStatusList: z.array(
    selectItemSchema(z.nativeEnum(OrderPaymentStatusEnum)),
  ),
});

export type OrderFormDefaultValues = z.infer<typeof orderFormDefaultSchema>;
