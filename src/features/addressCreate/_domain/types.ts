import { AddressCreateDTO } from "@/kernel/domain/address/address.dto";
import { AddressBase } from "@/kernel/domain/address/address.type";

type AddressCreatePayload = AddressBase;

export type AddressCreateTxPayload = {
  addressData: AddressCreatePayload;
};

export type AddressCreateTxDTO = {
  addressData: AddressCreateDTO["data"];
};
