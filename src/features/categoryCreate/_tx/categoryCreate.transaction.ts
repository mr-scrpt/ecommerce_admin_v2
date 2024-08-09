import { CategoryEntity } from "@/kernel/domain/category/category.type";
import { ICategoryInvariant } from "@/kernel/domain/category/invariant.type";
import { ICategoryRepository } from "@/kernel/domain/category/repository.type";
import { ErrorApp } from "@/shared/error/error";
import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { Either, left } from "@sweet-monads/either";
import { injectable } from "inversify";
import { ICategoryCreateTx } from "../_domain/transaction.type";
import { CategoryCreateTxDTO } from "../_domain/types";
import { CategoryBindPropertyError } from "@/kernel/domain/category/error";

@injectable()
export class CategoryCreateTx extends Transaction implements ICategoryCreateTx {
  constructor(
    readonly db: DBClient,
    private readonly categoryRepo: ICategoryRepository,
    private readonly categoryInvariant: ICategoryInvariant,
  ) {
    super(db);
  }

  async create(
    dto: CategoryCreateTxDTO,
  ): Promise<Either<ErrorApp, CategoryEntity>> {
    const { categoryData, propertyData } = dto;

    const action = async (tx: Tx) => {
      const isCategoryUnique =
        await this.categoryInvariant.isCategoryUniqueByName(
          { name: categoryData.name },
          tx,
        );

      if (isCategoryUnique.isLeft()) {
        return left(isCategoryUnique.value);
      }

      const createdCategory = await this.categoryRepo.create(
        { data: categoryData },
        tx,
      );

      if (createdCategory.isLeft()) {
        return left(createdCategory.value);
      }

      const { id } = createdCategory.value;

      const bindToPropertyList = await this.categoryRepo.bindToPropertyList(
        {
          target: { id },
          data: {
            propertyListId: propertyData,
          },
        },
        tx,
      );

      if (bindToPropertyList.isLeft()) {
        return left(bindToPropertyList.value);
      }

      return await this.categoryRepo.get({ id }, tx);
    };

    return await this.start(action);
  }
}
