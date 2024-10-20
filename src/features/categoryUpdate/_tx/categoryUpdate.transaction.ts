import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { CategoryUpdateTxDTO } from "../_domain/types";
import { ICategoryUpdateTx } from "../_domain/transaction.type";
import { CategoryEntity } from "@/kernel/domain/category/category.type";
import { ICategoryRepository } from "@/kernel/domain/category/repository.type";
import { ErrorApp } from "@/shared/error/error";
import { Either, left, right, mergeInMany } from "@sweet-monads/either";
import { IPropertyInvariant } from "@/kernel/domain/property/invariant.type";
import { ICategoryInvariant } from "@/kernel/domain/category/invariant.type";

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

      await this.categoryRepo.update(
        {
          selector,
          data: categoryData,
        },
        tx,
      );

      await this.categoryRepo.bindToPropertyList(
        {
          target: selector,
          data: {
            propertyListId: propertyData,
          },
        },
        tx,
      );

      const categoryUpdateResult = await this.categoryRepo.get(
        { id: selector.id },
        tx,
      );
      return categoryUpdateResult.mapLeft((error) => [error]);
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
    if (categoryCheckResult.isLeft()) {
      this.errorList.push(categoryCheckResult.value);
    }

    const propertyCheckResult =
      await this.propertyInvariant.isPropertyListExist(
        propertyData.map(({ propertyId }) => propertyId),
        tx,
      );
    if (propertyCheckResult.isLeft()) {
      this.errorList.push(propertyCheckResult.value);
    }

    // mergeInMany(invariantCheckResults).mapLeft((e) => (this.errorList = e));

    if (this.errorList.length > 0) {
      return left(this.errorList);
    }

    return right(true);
  }
}
