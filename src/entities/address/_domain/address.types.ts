import { Address, AddressEntity } from "@/kernel/domain/address/address.type";
import {
  Delivery,
  DeliveryEntity,
} from "@/kernel/domain/delivery/delivery.type";

// NOTE: Relations
export type AddressRelation = Address & {
  deliveryList: Array<Delivery>;
};

export type AddressRelationEntity = AddressEntity & {
  deliveryList: Array<DeliveryEntity>;
};

// NOTE: Selector
export type AddressGetSelector = {
  id: string;
};

export type AddressGetByUserSelector = {
  userId: string;
};

export type AddressGetByUserAndSettlementRefSelector = {
  userId?: string;
  settlementRef?: string;
};
