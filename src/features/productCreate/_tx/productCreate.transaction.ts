import { ProductEntity } from "@/entities/product";
import { DbClient, Transaction, Tx, dbClient } from "@/shared/lib/db";
import { ProductCreateComplexible } from "../_domain/types";
import {
  ProductRepository,
  productRepository,
} from "@/entities/product/server";

export class ProductCreateTx extends Transaction {
  constructor(
    readonly db: DbClient,
    private readonly productRepo: ProductRepository,
  ) {
    super(dbClient);
  }

  async createProductComplexible(
    data: ProductCreateComplexible,
  ): Promise<ProductEntity> {
    const { productData, categoryListData } = data;
    const action = async (tx: Tx) => {
      const productCreated = await this.productRepo.createProduct(
        productData,
        tx,
      );

      await this.productRepo.addCategoryList(
        {
          productId: productCreated.id,
          categoryListId: categoryListData,
        },
        tx,
      );

      return await this.productRepo.getProduct(productCreated.id, tx);
    };

    return await this.start(action);
  }
}

export const productCreateTx = new ProductCreateTx(dbClient, productRepository);
