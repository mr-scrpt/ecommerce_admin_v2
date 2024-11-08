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
import { CategoryNotFoundError } from "@/kernel/domain/category/error";
import { ERROR_APP_LAYER } from "@/shared/error/type";

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
        // console.log(
        //   "output_log: IS LEFT !!!!! =>>>",
        //   invariantResultStage.value,
        // );
        return left(invariantResultStage.value);
      }

      const categoryUpdateResult = await this.categoryRepo.update(
        {
          selector,
          data: categoryData,
        },
        tx,
      );

      if (categoryUpdateResult.isLeft()) {
        return left([categoryUpdateResult.value]);
      }

      const { id: targetId } = categoryUpdateResult.value;

      const categoryBindPropertyListResult =
        await this.categoryRepo.bindToPropertyList(
          {
            target: {
              id: targetId,
            },
            data: {
              propertyListId: propertyData,
            },
          },
          tx,
        );

      const resultGet = await this.categoryRepo.get({ id: targetId }, tx);

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
  ): Promise<Either<ErrorApp[], boolean>> {
    const { categoryUniqueInvariant, propertExistByListIdInvariant } =
      invariantData;

    return (
      (
        await this.categoryInvariant.isCategoryExist(
          categoryUniqueInvariant,
          tx,
        )
      )
        .mapLeft((error) => [error])
        // .mapLeft((error) => {
        //   return [
        //     new CategoryNotFoundError({
        //       layer: ERROR_LAYER.TRANSACTION,
        //       cause: error,
        //     }),
        //   ];
        // })
        .asyncChain(async () => {
          const uniqueCheck =
            await this.categoryInvariant.isCategoryUniqueByName(
              categoryUniqueInvariant,
              tx,
            );
          const propertyCheck =
            await this.propertyInvariant.isPropertyListExist(
              propertExistByListIdInvariant,
              tx,
            );

          return mergeInMany([uniqueCheck, propertyCheck]).mapRight(() => true);
        })
    );
  }
}
