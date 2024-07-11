import { Address } from "@/kernel/domain/address/address.type";
import { IAddressRepository } from "@/kernel/domain/address/repository.type";
import { injectable } from "inversify";
import { AddressGetByUserAndSettlementRefSelector } from "../_domain/address.types";
import { AddressGetByUserAndSettlementRefDTO } from "@/kernel/domain/address/address.dto";

@injectable()
export class AddressListGetByUserAndSettlementRefService {
  constructor(private readonly addressRepo: IAddressRepository) {}

  async execute(
    selector: AddressGetByUserAndSettlementRefSelector,
  ): Promise<Address[]> {
    const { userId, settlementRef } = selector;
    if (!userId || !settlementRef) {
      return [];
    }
    return await this.addressRepo.getListByUserAndSettlementRef(
      selector as AddressGetByUserAndSettlementRefDTO,
    );
  }
}
