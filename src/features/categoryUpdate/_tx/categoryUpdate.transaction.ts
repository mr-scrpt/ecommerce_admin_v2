import { CategoryEntity } from "@/kernel/domain/category/category.type";
import { ICategoryInvariant } from "@/kernel/domain/category/invariant.type";
import { ICategoryRepository } from "@/kernel/domain/category/repository.type";
import { IPropertyInvariant } from "@/kernel/domain/property/invariant.type";
import { ErrorApp } from "@/shared/error/error";
import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { Either, left, mergeInMany, right } from "@sweet-monads/either";
import { injectable } from "inversify";
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
  errorList: ErrorApp[] = [];

  async update(
    dto: CategoryUpdateTxDTO,
  ): Promise<Either<Array<ErrorApp>, CategoryEntity>> {
    const { selector, categoryData, propertyData } = dto;

    const action = async (tx: Tx) => {
      const { name } = categoryData;

      const invariantResultStage = await this.checkInvariantsStage(
        name,
        selector,
        propertyData,
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

      if (categoryUpdateResult.isLeft()) {
        return categoryUpdateResult.mapLeft((error) => [error]);
      }

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

      if (categoryBindPropertyListResult.isLeft()) {
        return categoryBindPropertyListResult.mapLeft((error) => [error]);
      }

      const res = await this.categoryRepo.get({ id: selector.id }, tx);

      return res.mapLeft((error) => [error]);
    };

    return await this.start(action);
  }

  private async checkInvariantsStage(
    name: string,
    selector: { id: string },
    propertyData: { propertyId: string }[],
    tx?: Tx,
  ): Promise<Either<ErrorApp[], true>> {
    this.errorList = [];
    const categoryCheckResult =
      await this.categoryInvariant.isCategoryUniqueByName(name, selector, tx);

    const propertyCheckResult =
      await this.propertyInvariant.isPropertyListExist(
        propertyData.map(({ propertyId }) => propertyId),
        tx,
      );

    return mergeInMany([categoryCheckResult, propertyCheckResult])
      .mapLeft((error) => (this.errorList = error))
      .mapRight(() => true);
  }
}
