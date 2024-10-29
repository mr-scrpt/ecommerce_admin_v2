import { CategoryEntity } from "@/kernel/domain/category/category.type";
import { ErrorApp } from "@/shared/error/error";
import { Either } from "@sweet-monads/either";
import { CategoryUpdateTxDTO } from "./types";

export abstract class ICategoryUpdateTx {
  abstract update(
    dto: CategoryUpdateTxDTO,
  ): Promise<Either<Array<ErrorApp>, CategoryEntity>>;
}
