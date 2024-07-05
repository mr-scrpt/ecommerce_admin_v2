import { injectable } from "inversify";
import { Address } from "@/kernel/domain/address/address.type";
import { IAddressRepository } from "@/kernel/domain/address/repository.type";
import { AddressGetByUserSelector } from "../_domain/address.types";

@injectable()
export class AddressListGetByUserService {
  constructor(private readonly addressRepo: IAddressRepository) {}

  async execute(selector: AddressGetByUserSelector): Promise<Address[]> {
    return await this.addressRepo.getListByUser(selector);
  }
}
