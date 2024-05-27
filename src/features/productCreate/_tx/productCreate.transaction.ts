import { ProductEntity } from "@/entities/product";
import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { ProductCreateComplexible } from "../_domain/types";
import { ProductRepository } from "@/entities/product/server";
import { injectable } from "inversify";

@injectable()
export class ProductCreateTx extends Transaction {
  constructor(
    readonly db: DBClient,
    private readonly productRepo: ProductRepository,
  ) {
    super(db);
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
