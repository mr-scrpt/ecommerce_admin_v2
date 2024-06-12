import { ProductEntity } from "@/entities/product";
import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { ProductRepository } from "@/entities/product/server";
import { ProductUpdateComplexible } from "../_domain/types";
import { injectable } from "inversify";

@injectable()
export class ProductUpdateTx extends Transaction {
  constructor(
    readonly db: DBClient,
    private readonly productRepo: ProductRepository,
  ) {
    super(db);
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
      const productUpdated = await this.productRepo.update(
        productId,
        productData,
        tx,
      );

      console.log("output_log: updateProduct =>>>", productUpdated);

      await this.productRepo.bindToCategoryList({ productId, categoryListId }, tx);
      await this.productRepo.bindToPropertyList(
        {
          productId,
          propertyListId: propertyItemListSelected,
        },
        tx,
      );

      return await this.productRepo.get(productUpdated.id, tx);
    };

    return await this.start(action);
  }
}
