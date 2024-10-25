import { CategoryEntity } from "@/kernel/domain/category/category.type";
import { ICategoryInvariant } from "@/kernel/domain/category/invariant.type";
import { ICategoryRepository } from "@/kernel/domain/category/repository.type";
import { ErrorApp } from "@/shared/error/error";
import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { Either, left, mergeInMany } from "@sweet-monads/either";
import { injectable } from "inversify";
import { ICategoryCreateTx } from "../_domain/transaction.type";
import { CategoryCreateTxDTO } from "../_domain/types";
import { ICategoryCreateInvariant } from "../_domain/invariant.type";
import { IPropertyInvariant } from "@/kernel/domain/property/invariant.type";

@injectable()
export class CategoryCreateTx extends Transaction implements ICategoryCreateTx {
  constructor(
    readonly db: DBClient,
    private readonly categoryRepo: ICategoryRepository,
    private readonly categoryInvariant: ICategoryInvariant,
    private readonly propertyInvariant: IPropertyInvariant,
  ) {
    super(db);
  }

  async create(
    dto: CategoryCreateTxDTO,
  ): Promise<Either<Array<ErrorApp>, CategoryEntity>> {
    const { categoryData, propertyData } = dto;

    const action = async (tx: Tx) => {
      const { name } = categoryData;

      const invariantResultStage = await this.checkInvariantsStage(
        {
          categoryUniqueInvariant: {
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

      const categoryCreateResult = await this.categoryRepo.create(
        { data: categoryData },
        tx,
      );

      if (categoryCreateResult.isLeft()) {
        return left([categoryCreateResult.value]);
      }

      const { id: targetId } = categoryCreateResult.value;

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
        categoryCreateResult,
        categoryBindPropertyListResult,
        resultGet,
      ])
        .mapLeft((errors) => errors.flat())
        .mapRight(() => resultGet.value as CategoryEntity);
    };

    return await this.start(action);
  }
  private async checkInvariantsStage(
    invariantData: ICategoryCreateInvariant,
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
