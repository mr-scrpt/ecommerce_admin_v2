import { CategoryAlreadyExistError } from "@/kernel/domain/category/error";
import { ICategoryInvariant } from "@/kernel/domain/category/invariant.type";
import { ICategoryRepository } from "@/kernel/domain/category/repository.type";
import { ErrorApp } from "@/shared/error/error";
import { Tx } from "@/shared/lib/db/db";
import { Either, left, right } from "@sweet-monads/either";
import { injectable } from "inversify";

type UniqueByName = {
  name: string;
};

@injectable()
export class CategoryInvariant implements ICategoryInvariant {
  constructor(private readonly categoryRepo: ICategoryRepository) {}

  public async isCategoryUniqueByName(
    isUniqueByName: UniqueByName,
    tx?: Tx,
  ): Promise<Either<ErrorApp, void>> {
    const { name } = isUniqueByName;

    const isCategoryQnique = await this.categoryRepo.checkIsUniqueByName(
      {
        name,
      },
      tx,
    );

    if (isCategoryQnique.value) {
      return left(new CategoryAlreadyExistError());
    }

    return right(void 0);
  }
}
