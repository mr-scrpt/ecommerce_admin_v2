import { Property } from "@/entities/property";
import { injectable } from "inversify";
import { IPropertyCreateTx } from "../_domain/transaction.type";
import { PropertyCreateTxDTO } from "../_domain/types";

@injectable()
export class PropertyCreateService {
  constructor(private readonly propertyCreateTx: IPropertyCreateTx) {}

  async execute(payload: PropertyCreateTxDTO): Promise<Property> {
    return await this.propertyCreateTx.create(payload);
  }
}
