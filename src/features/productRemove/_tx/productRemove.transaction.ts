import { ProductEntity, ProductId } from "@/entities/product";
import { ProductRepository } from "@/entities/product/server";
import { DBClient, Transaction, Tx, dbClient } from "@/shared/lib/db";
import { injectable } from "inversify";

@injectable()
export class ProductRemoveTx extends Transaction {
  constructor(
    readonly db: DBClient,
    private readonly productRepo: ProductRepository,
  ) {
    super(dbClient);
  }

  async removeProductById(productId: ProductId): Promise<ProductEntity> {
    const action = async (tx: Tx) => {
      return await this.productRepo.removeProductById(productId, tx);
    };

    return await this.start(action);
  }
}
