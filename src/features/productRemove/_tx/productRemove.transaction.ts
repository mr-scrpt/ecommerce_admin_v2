import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { ProductRemoveTxDTO } from "../_domain/types";
import { IProductRepository } from "@/entities/product/server";
import { ProductEntity } from "@/kernel/domain/product/product.type";

@injectable()
export class ProductRemoveTx extends Transaction {
  constructor(
    readonly db: DBClient,
    private readonly productRepo: IProductRepository,
  ) {
    super(db);
  }

  async remove(dto: ProductRemoveTxDTO): Promise<ProductEntity> {
    const action = async (tx: Tx) => {
      return await this.productRepo.remove(dto, tx);
    };

    return await this.start(action);
  }
}
