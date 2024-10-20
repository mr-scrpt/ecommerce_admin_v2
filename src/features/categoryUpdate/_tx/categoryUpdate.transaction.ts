import { CategoryEntity } from "@/kernel/domain/category/category.type";
import { ICategoryInvariant } from "@/kernel/domain/category/invariant.type";
import { ICategoryRepository } from "@/kernel/domain/category/repository.type";
import { IPropertyInvariant } from "@/kernel/domain/property/invariant.type";
import { ErrorApp } from "@/shared/error/error";
import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { Either, left, mergeInMany } from "@sweet-monads/either";
import { injectable } from "inversify";
import { ICategoryUpdateInvariant } from "../_domain/invariant.type";
import { ICategoryUpdateTx } from "../_domain/transaction.type";
import { CategoryUpdateTxDTO } from "../_domain/types";

@injectable()
export class CategoryUpdateTx extends Transaction implements ICategoryUpdateTx {
  constructor(
    readonly db: DBClient,
    private readonly categoryRepo: ICategoryRepository,
    private readonly propertyInvariant: IPropertyInvariant,
    private readonly categoryInvariant: ICategoryInvariant,
  ) {
    super(db);
  }

  async update(
    dto: CategoryUpdateTxDTO,
  ): Promise<Either<ErrorApp[], CategoryEntity>> {
    const { selector, categoryData, propertyData } = dto;

    const action = async (tx: Tx) => {
      const { name } = categoryData;

      const invariantResultStage = await this.checkInvariantsStage(
        {
          categoryUniqueInvariant: {
            selector,
            data: { name },
          },
          propertExistByListIdInvariant: {
            data: { idList: propertyData.map(({ propertyId }) => propertyId) },
          },
        },
        tx,
      );

      if (invariantResultStage.isLeft()) {
        return left(invariantResultStage.value);
      }

      const categoryUpdateResult = await this.categoryRepo.update(
        {
          selector,
          data: categoryData,
        },
        tx,
      );

      const categoryBindPropertyListResult =
        await this.categoryRepo.bindToPropertyList(
          {
            target: selector,
            data: {
              propertyListId: propertyData,
            },
          },
          tx,
        );

      const resultGet = await this.categoryRepo.get({ id: selector.id }, tx);

      return mergeInMany([
        categoryUpdateResult,
        categoryBindPropertyListResult,
        resultGet,
      ])
        .mapLeft((errors) => errors.flat())
        .mapRight(() => resultGet.value as CategoryEntity);
    };

    return await this.start(action);
  }

  private async checkInvariantsStage(
    invariantData: ICategoryUpdateInvariant,
    tx?: Tx,
  ): Promise<Either<ErrorApp[], true>> {
    const { categoryUniqueInvariant, propertExistByListIdInvariant } =
      invariantData;

    const categoryCheckResult =
      await this.categoryInvariant.isCategoryUniqueByName(
        categoryUniqueInvariant,
        tx,
      );

    const propertyCheckResult =
      await this.propertyInvariant.isPropertyListExist(
        propertExistByListIdInvariant,
      );

    return mergeInMany([categoryCheckResult, propertyCheckResult]).mapRight(
      () => true,
    );
  }
}
