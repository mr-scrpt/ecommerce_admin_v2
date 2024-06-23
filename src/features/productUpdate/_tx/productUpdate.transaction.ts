import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { IProductUpdateTx } from "../_domain/transaction.type";
import { IProductRepository } from "@/entities/product/server";
import { ProductUpdateTxDTO } from "../_domain/types";
import { ProductEntity } from "@/kernel/domain/product/product.type";

@injectable()
export class ProductUpdateTx extends Transaction implements IProductUpdateTx {
  constructor(
    readonly db: DBClient,
    private readonly productRepo: IProductRepository,
  ) {
    super(db);
  }

  async update(dto: ProductUpdateTxDTO): Promise<ProductEntity> {
    const { selector, productData, categoryData, propertyItemData } = dto;
    const action = async (tx: Tx) => {
      // const {
      //   productId,
      //   productData,
      //   propertyItemListSelected,
      //   categoryListId,
      // } = dto;
      const productUpdated = await this.productRepo.update(
        { selector, data: productData },
        tx,
      );

      console.log("output_log: updateProduct =>>>", productUpdated);

      await this.productRepo.bindToCategoryList(
        {
          selector,
          data: {
            categoryListId: categoryData,
          },
        },
        // { productId, categoryListId },
        tx,
      );
      await this.productRepo.bindToPropertyList(
        // {
        //   productId,
        //   propertyListId: propertyItemListSelected,
        // },
        {
          selector,
          data: {
            propertyItemListId: propertyItemData,
          },
        },
        tx,
      );

      return await this.productRepo.get(selector, tx);
    };

    return await this.start(action);
  }
}
