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
    const { productData, categoryListData, propertyItemListSelected } = data;
    const action = async (tx: Tx) => {
      const productCreated = await this.productRepo.createProduct(
        {
          name: productData.name,
          article: productData.article,
          inStock: productData.inStock,
          price: productData.price,
          description: productData.description,
          about: productData.about,
          slug: productData.slug,
          img: productData.img,
        },
        tx,
      );

      console.log(
        "output_log:  propertyItemListSelected =>>>",
        propertyItemListSelected,
      );

      await this.productRepo.addCategoryList(
        {
          productId: productCreated.id,
          categoryListId: categoryListData,
        },
        tx,
      );

      await this.productRepo.addPropertyList(
        {
          productId: productCreated.id,
          propertyListId: propertyItemListSelected,
        },
        tx,
      );

      return await this.productRepo.getProduct(productCreated.id, tx);
    };

    return await this.start(action);
  }
}

export const productCreateTx = new ProductCreateTx(dbClient, productRepository);
