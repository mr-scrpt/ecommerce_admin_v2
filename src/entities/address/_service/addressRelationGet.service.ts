import { OperationsMap } from "@/shared/type/operation.type";
import { injectable } from "inversify";
import { AddressGetSelector, AddressRelation } from "../_domain/address.types";
import { IAddressRepository } from "@/kernel/domain/address/repository.type";

@injectable()
export class AddressRelationGetService {
  constructor(private readonly addressRepo: IAddressRepository) {}

  async execute(selector: AddressGetSelector): Promise<AddressRelation> {
    return await this.operation(selector);
  }

  async operation(props: AddressGetSelector): Promise<AddressRelation> {
    const operationsMap: OperationsMap<AddressRelation> = {
      id: (id: string) => this.addressRepo.getWithRelation({ id }),
      slug: (slug: string) => this.addressRepo.getBySlugRelation({ slug }),
    };

    for (const key of Object.keys(props)) {
      const value = props[key as keyof AddressGetSelector];
      if (value && operationsMap[key]) {
        return await operationsMap[key](value);
      }
    }

    // TODO: Error custom handling
    throw new Error("Either 'addressId' or 'addressSlug' must be provided.");
  }
}
