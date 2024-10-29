import { CategoryEntity } from "@/kernel/domain/category/category.type";
import { CategoryRemoveTxDTO } from "./types";
import { ErrorApp } from "@/shared/error/error";
import { Either } from "@sweet-monads/either";

export abstract class ICategoryRemoveTx {
  abstract remove(
    dto: CategoryRemoveTxDTO,
  ): Promise<Either<Array<ErrorApp>, CategoryEntity>>;
}
