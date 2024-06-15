import { Property } from "@/entities/property";
import { injectable } from "inversify";
import { IPropertyCreateTx } from "../_domain/transaction.type";
import { PropertyCreateTxPayload } from "../_domain/types";

@injectable()
export class PropertyCreateService {
  constructor(private readonly propertyCreateTx: IPropertyCreateTx) {}

  async execute(payload: PropertyCreateTxPayload): Promise<Property> {
    return await this.propertyCreateTx.create(payload);
  }
}
