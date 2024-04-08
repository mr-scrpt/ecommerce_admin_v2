import { ProductEntity } from "@/entities/product";
import { DBClient, Transaction, Tx, dbClient } from "@/shared/lib/db";
import { ProductRepository } from "@/entities/product/server";
import { ProductUpdateComplexible } from "../_domain/types";
import { injectable } from "inversify";

@injectable()
export class ProductUpdateTx extends Transaction {
  constructor(
    readonly db: DBClient,
    private readonly productRepo: ProductRepository,
  ) {
    super(dbClient);
  }

  async updateProductComplexible(
    data: ProductUpdateComplexible,
  ): Promise<ProductEntity> {
    const action = async (tx: Tx) => {
      const {
        productId,
        productData,
        propertyItemListSelected,
        categoryListId,
      } = data;
      const productUpdated = await this.productRepo.updateProduct(
        productId,
        productData,
        tx,
      );

      console.log("output_log: updateProduct =>>>", productUpdated);

      await this.productRepo.addCategoryList({ productId, categoryListId }, tx);
      await this.productRepo.addPropertyList(
        {
          productId,
          propertyListId: propertyItemListSelected,
        },
        tx,
      );

      return await this.productRepo.getProduct(productUpdated.id, tx);
    };

    return await this.start(action);
  }
}
