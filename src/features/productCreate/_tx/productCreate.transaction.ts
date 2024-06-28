import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { ProductCreateTxDTO } from "../_domain/types";
import { IProductCreateTx } from "../_domain/transaction.type";
import { ProductEntity } from "@/kernel/domain/product/product.type";
import { IProductRepository } from "@/kernel/domain/product/repository.type";

@injectable()
export class ProductCreateTx extends Transaction implements IProductCreateTx {
  constructor(
    readonly db: DBClient,
    private readonly productRepo: IProductRepository,
  ) {
    super(db);
  }

  async create(dto: ProductCreateTxDTO): Promise<ProductEntity> {
    const { productData, categoryData, propertyItemData } = dto;
    const action = async (tx: Tx) => {
      const { id } = await this.productRepo.create(
        {
          data: productData,
        },
        tx,
      );

      await this.productRepo.bindToCategoryList(
        {
          selector: {
            id,
          },
          data: {
            categoryListId: categoryData,
          },
        },
        tx,
      );

      await this.productRepo.bindToPropertyList(
        {
          selector: {
            id,
          },
          data: {
            propertyItemListId: propertyItemData,
          },
        },
        tx,
      );

      return await this.productRepo.get({ id }, tx);
    };

    return await this.start(action);
  }
}
