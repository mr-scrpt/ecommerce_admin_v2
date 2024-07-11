import { Tx } from "@/shared/lib/db/db";
import {
  AddressBindToDeliveryListDTO,
  AddressCreateDTO,
  AddressGetByUserAndSettlementRefDTO,
  AddressGetByUserDTO,
  AddressGetDTO,
  AddressRemoveDTO,
  AddressUpdateDTO,
} from "./address.dto";
import { AddressEntity } from "./address.type";

export abstract class IAddressRepository {
  abstract get(dto: AddressGetDTO, db?: Tx): Promise<AddressEntity>;

  abstract getWithRelation<T>(dto: AddressGetDTO, db?: Tx): Promise<T>;

  abstract getListByUser(
    dto: AddressGetByUserDTO,
    db?: Tx,
  ): Promise<AddressEntity[]>;

  abstract getListByUserAndSettlementRef(
    dto: AddressGetByUserAndSettlementRefDTO,
    db?: Tx,
  ): Promise<AddressEntity[]>;

  abstract create(dto: AddressCreateDTO, db?: Tx): Promise<AddressEntity>;

  abstract update(dto: AddressUpdateDTO, db?: Tx): Promise<AddressEntity>;

  abstract remove(dto: AddressRemoveDTO, db?: Tx): Promise<AddressEntity>;

  abstract bindToDeliveryList(
    dto: AddressBindToDeliveryListDTO,
    db?: Tx,
  ): Promise<AddressEntity>;
}
