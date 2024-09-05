import { Delivery } from "@/kernel/domain/delivery/delivery.type";
import { DeliveryType } from "@/kernel/domain/delivery/deliveryType.type";
import { Settlement } from "@/kernel/domain/settlement/settlement.type";

// NOTE: Relations
export type DeliveryRelation = Delivery & {
  settlement: Settlement;
  deliveryType: DeliveryType;
};

export type DeliveryRelationEntity = Delivery & {
  settlement: Settlement;
  deliveryType: DeliveryType;
};
// NOTE: Selector
export type DeliveryGetSelector = {
  id: string;
};

export type DeliveryGetByOrderSelector = {
  orderId: string;
};

export type DeliveryTypeListGetBySettlementRefSelector = {
  settlementRef?: string;
};
