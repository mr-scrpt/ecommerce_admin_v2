import { ProductEntity, ProductId } from "@/entities/product";
import {
  ProductRepository,
  productRepository,
} from "@/entities/product/server";
import { DBClient, Transaction, Tx, dbClient } from "@/shared/lib/db";

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

export const productRemoveTx = new ProductRemoveTx(dbClient, productRepository);
