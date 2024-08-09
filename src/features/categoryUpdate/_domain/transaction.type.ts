import { CategoryEntity } from "@/kernel/domain/category/category.type";
import { CategoryUpdateTxDTO } from "./types";
import { Either } from "@sweet-monads/either";
import { ErrorApp } from "@/shared/error/error";

export abstract class ICategoryUpdateTx {
  abstract update(
    dto: CategoryUpdateTxDTO,
  ): Promise<Either<ErrorApp, CategoryEntity>>;
}
