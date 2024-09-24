import { Address } from "@/kernel/domain/address/address.type";
import { Delivery } from "@/kernel/domain/delivery/delivery.type";
import { DeliveryType } from "@/kernel/domain/delivery/deliveryType.type";
import { PostOffice } from "@/kernel/domain/post/post.type";
import { Receiver } from "@/kernel/domain/receiver/receiver.type";
import { Settlement } from "@/kernel/domain/settlement/settlement.type";
import { Store } from "@/kernel/domain/store/store.type";

// NOTE: Relations
export type DeliveryRelation = Delivery & {
  settlement: Settlement;
  deliveryType: DeliveryType;
  postOffice: PostOffice | null;
  store: Store | null;
  address: Address;
  // receiver: Receiver;
};

export type DeliveryRelationEntity = Delivery & {
  settlement: Settlement;
  deliveryType: DeliveryType;
  postOffice: PostOffice | null;
  store: Store | null;
  address: Address;
  // receiver: Receiver;
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
