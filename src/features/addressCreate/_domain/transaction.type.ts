import { AddressEntity } from "@/kernel/domain/address/address.type";
import { AddressCreateTxDTO } from "./types";

export abstract class IAddressCreateTx {
  abstract create(dto: AddressCreateTxDTO): Promise<AddressEntity>;
}
