import { ProductEntity } from "@/entities/product";
import { DbClient, Transaction, Tx, dbClient } from "@/shared/lib/db";
import {
  ProductRepository,
  productRepository,
} from "@/entities/product/server";
import { ProductUpdateComplexible } from "../_domain/types";

export class ProductUpdateTx extends Transaction {
  constructor(
    readonly db: DbClient,
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
      // const productUpdated = await this.productRepo.updateProduct(
      //   // productData,
      //   {
      //     name: productData.name,
      //     description: productData.description,
      //     about: productData.about,
      //     slug: productData.slug,
      //     img: productData.img,
      //   },
      //   tx,
      // );

      // await this.productRepo.addCategoryList(
      //   {
      //     productId: productUpdated.id,
      //     categoryListId: categoryListData,
      //   },
      //   tx,
      // );
      //
      // await this.productRepo.addPropertyList(
      //   {
      //     productId: productUpdated.id,
      //     propertyListId: propertyItemListSelected,
      //   },
      //   tx,
      // );

      return await this.productRepo.getProduct(productUpdated.id, tx);
    };

    return await this.start(action);
  }
}

export const productUpdateTx = new ProductUpdateTx(dbClient, productRepository);
