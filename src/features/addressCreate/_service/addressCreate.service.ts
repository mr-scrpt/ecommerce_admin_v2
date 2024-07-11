import { Address } from "@/kernel/domain/address/address.type";
import { injectable } from "inversify";
import { IAddressCreateTx } from "../_domain/transaction.type";
import { AddressCreateTxPayload } from "../_domain/types";

@injectable()
export class AddressCreateService {
  constructor(private readonly addressCreateTx: IAddressCreateTx) {}

  async execute(payload: AddressCreateTxPayload): Promise<Address> {
    return await this.addressCreateTx.create(payload);
  }
}
