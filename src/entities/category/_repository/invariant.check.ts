import {
  CategoryNotExistError,
  CategoryNotUniqueNameError,
  CategoryUnexpectedError,
} from "@/kernel/domain/category/error";
import {
  CategoryExistInvariant,
  CategoryUniqueByNameInvariant,
  ICategoryInvariant,
} from "@/kernel/domain/category/invariant.type";
import { ErrorApp } from "@/shared/error/error";
import { ERROR_APP_LAYER } from "@/shared/error/type";
import { DBClient, Tx } from "@/shared/lib/db/db";
import { Either, left, right } from "@sweet-monads/either";
import { injectable } from "inversify";

@injectable()
export class CategoryInvariant implements ICategoryInvariant {
  constructor(private readonly db: DBClient) {}

  async isCategoryExist(
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
      // throw new Error("Not Implemented: NOT EXIST");

      if (!res) {
        return left(
          new CategoryNotExistError({
            layer: ERROR_APP_LAYER.DB,
            details: JSON.stringify(dto),
          }),
        );
      }

      return right(true);
    } catch (e) {
      return left(
        new CategoryUnexpectedError({
          cause: e,
          layer: ERROR_APP_LAYER.DB,
          details: JSON.stringify(dto),
        }),
      );
    }
  }

  async isCategoryUniqueByName(
    dto: CategoryUniqueByNameInvariant,
    db: Tx = this.db,
  ): Promise<Either<ErrorApp, boolean>> {
    const { selector, data } = dto;
    try {
      const res = await db.category.findFirst({
        where: data,
      });
      // throw new Error("Not Implemented");

      if (!res || res.id === selector?.id) {
        return right(true);
      }

      return left(
        new CategoryNotUniqueNameError({
          layer: ERROR_APP_LAYER.DB,
          details: JSON.stringify(dto),
        }),
      );
    } catch (e) {
      return left(
        new CategoryUnexpectedError({
          cause: e,
          layer: ERROR_APP_LAYER.DB,
          details: JSON.stringify(dto),
        }),
      );
    }
  }
}
