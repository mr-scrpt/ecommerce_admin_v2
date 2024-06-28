import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { IProductUpdateTx } from "../_domain/transaction.type";
import { ProductUpdateTxDTO } from "../_domain/types";
import { ProductEntity } from "@/kernel/domain/product/product.type";
import { IProductRepository } from "@/kernel/domain/product/repository.type";

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
      await this.productRepo.update({ selector, data: productData }, tx);

      await this.productRepo.bindToCategoryList(
        {
          selector,
          data: {
            categoryListId: categoryData,
          },
        },
        tx,
      );

      await this.productRepo.bindToPropertyList(
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
