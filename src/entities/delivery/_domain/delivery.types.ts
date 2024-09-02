import { Delivery } from "@/kernel/domain/delivery/delivery.type";
import { Settlement } from "@/kernel/domain/settlement/settlement.type";

// NOTE: Relations
export type DeliveryRelation = Delivery & {
  settlement: Settlement;
};

export type DeliveryRelationEntity = Delivery & {
  settlement: Settlement;
};
// NOTE: Selector
export type DeliveryGetSelector = {
  id: string;
};

export type DeliveryGetByOrderSelector = {
  orderId: string;
};

export type DeliveryTypeListGetBySettlementRefSelector = {
  settlementRef: string;
};
