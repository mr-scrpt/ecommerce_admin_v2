import { CategoryEntity } from "@/kernel/domain/category/category.type";
import { ICategoryInvariant } from "@/kernel/domain/category/invariant.type";
import { ICategoryRepository } from "@/kernel/domain/category/repository.type";
import { ErrorApp } from "@/shared/error/error";
import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { Either, left, mergeInMany } from "@sweet-monads/either";
import { injectable } from "inversify";
import { ICategoryRemoveInvariant } from "../_domain/invariant.type";
import { ICategoryRemoveTx } from "../_domain/transaction.type";
import { CategoryRemoveTxDTO } from "../_domain/types";

@injectable()
export class CategoryRemoveTx extends Transaction implements ICategoryRemoveTx {
  constructor(
    readonly db: DBClient,
    private readonly categoryRepo: ICategoryRepository,
    private readonly categoryInvariant: ICategoryInvariant,
  ) {
    super(db);
  }

  async remove(
    dto: CategoryRemoveTxDTO,
  ): Promise<Either<ErrorApp[], CategoryEntity>> {
    const { selector } = dto;
    const action = async (tx: Tx) => {
      const invariantResultStage = await this.checkInvariantsStage(
        {
          categoryExistInvariant: {
            selector,
          },
        },
        tx,
      );

      if (invariantResultStage.isLeft()) {
        return left(invariantResultStage.value);
      }

      const categoryRemoveResult = await this.categoryRepo.remove(dto, tx);

      return categoryRemoveResult.mapLeft((e) => [e]);
    };

    return await this.start(action);
  }

  private async checkInvariantsStage(
    invariantData: ICategoryRemoveInvariant,
    tx?: Tx,
  ): Promise<Either<ErrorApp[], true>> {
    const { categoryExistInvariant } = invariantData;

    const categoryCheckResult = await this.categoryInvariant.isCategoryExist(
      categoryExistInvariant,
      tx,
    );

    return mergeInMany([categoryCheckResult]).mapRight(() => true);
  }
}
