import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { AddressCreateTxDTO } from "../_domain/types";
import { IAddressRepository } from "@/kernel/domain/address/repository.type";
import { AddressEntity } from "@/kernel/domain/address/address.type";

@injectable()
export class AddressCreateTx extends Transaction {
  constructor(
    readonly db: DBClient,
    private readonly addressRepo: IAddressRepository,
  ) {
    super(db);
  }

  async create(dto: AddressCreateTxDTO): Promise<AddressEntity> {
    const action = async (tx: Tx) => {
      const { addressData } = dto;
      const { id } = await this.addressRepo.create({ data: addressData }, tx);

      return await this.addressRepo.get({ id }, tx);
    };

    return await this.start(action);
  }
}
