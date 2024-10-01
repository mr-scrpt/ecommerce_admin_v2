import { createStrictContext, useStrictContext } from "@/shared/lib/react";
import { OrderRelation } from "../../_domain/order/order.types";

// NOTE: Single Order
export const OrderContext = createStrictContext<OrderRelation>();
export const useOrderData = () => useStrictContext(OrderContext);

// NOTE: List Order
export const OrderListContext = createStrictContext<Array<OrderRelation>>();
export const useOrderListData = () => useStrictContext(OrderListContext);
