import {
  CategoryNotFoundError,
  CategoryNotUniqueNameError,
} from "@/kernel/domain/category/error";
import {
  CategoryExistInvariant,
  CategoryUniqueByNameInvariant,
  ICategoryInvariant,
} from "@/kernel/domain/category/invariant.type";
import { ICategoryRepository } from "@/kernel/domain/category/repository.type";
import { DatabaseError } from "@/kernel/error/error.common";
import { ErrorApp } from "@/shared/error/error";
import { DBClient, Tx } from "@/shared/lib/db/db";
import { Either, left, right } from "@sweet-monads/either";
import { injectable } from "inversify";

@injectable()
export class CategoryInvariant implements ICategoryInvariant {
  // constructor(readonly categoryRepo: ICategoryRepository) {}
  constructor(private readonly db: DBClient) {}

  // public async isCategoryExist(
  //   dto: CategoryExistInvariant,
  //   tx?: Tx,
  // ): Promise<Either<ErrorApp, boolean>> {
  //   const {
  //     selector: { id },
  //   } = dto;
  //
  //   const maybeCategory = await this.categoryRepo.get({ id }, tx);
  //
  //   return maybeCategory.fold(
  //     (error) => left(new CategoryNotFoundError({ cause: error })),
  //     () => right(true),
  //   );
  // }
  //
  public async isCategoryExist(
    dto: CategoryExistInvariant,
    db: Tx = this.db,
  ): Promise<Either<ErrorApp, boolean>> {
    const {
      selector: { id },
    } = dto;

    try {
      const res = await db.category.findFirst({
        where: { id },
      });

      if (!res) {
        return left(new CategoryNotFoundError());
      }

      return right(true);
    } catch (e) {
      return left(new DatabaseError({ message: (e as any).message, cause: e }));
    }
  }

  public async isCategoryUniqueByName(
    dto: CategoryUniqueByNameInvariant,
    db: Tx = this.db,
  ): Promise<Either<ErrorApp, boolean>> {
    const { selector, data } = dto;
    try {
      const res = await db.category.findFirst({
        where: data,
      });

      if (!res || res.id === selector?.id) {
        return right(true);
      }

      return left(new CategoryNotUniqueNameError());
    } catch (e) {
      return left(new DatabaseError({ message: (e as any).message, cause: e }));
    }
  }
}
