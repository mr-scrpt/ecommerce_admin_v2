import { Product } from "@/entities/product";
import { injectable } from "inversify";
import { IProductRemoveTx } from "../_domain/transaction.type";
import { ProductRemoveTxPayload } from "../_domain/types";

@injectable()
export class ProductRemoveService {
  constructor(private readonly productRemoveTx: IProductRemoveTx) {}

  async execute(payload: ProductRemoveTxPayload): Promise<Product> {
    return await this.productRemoveTx.remove(payload);
  }
}
