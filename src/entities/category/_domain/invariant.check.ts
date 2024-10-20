import { CategoryNotUniqueNameError } from "@/kernel/domain/category/error";
import {
  CategoryUniqueByNameInvariant,
  ICategoryInvariant,
} from "@/kernel/domain/category/invariant.type";
import { ICategoryRepository } from "@/kernel/domain/category/repository.type";
import { ErrorApp } from "@/shared/error/error";
import { Tx } from "@/shared/lib/db/db";
import { Either, left, right } from "@sweet-monads/either";
import { injectable } from "inversify";

@injectable()
export class CategoryInvariant implements ICategoryInvariant {
  constructor(readonly categoryRepo: ICategoryRepository) {}

  public async isCategoryUniqueByName(
    dto: CategoryUniqueByNameInvariant,
    tx?: Tx,
  ): Promise<Either<ErrorApp, boolean>> {
    const { data, selector } = dto;
    const { name } = data;

    const isCategoryQnique = await this.categoryRepo.getByName({ name }, tx);

    if (isCategoryQnique.isRight()) {
      if (isCategoryQnique.value.id === selector.id) {
        return right(true);
      }
      return left(new CategoryNotUniqueNameError());
    }

    return right(true);
  }
}
