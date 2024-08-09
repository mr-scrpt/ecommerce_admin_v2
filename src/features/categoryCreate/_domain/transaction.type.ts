import { CategoryEntity } from "@/kernel/domain/category/category.type";
import { CategoryCreateTxDTO } from "./types";
import { Either } from "@sweet-monads/either";
import { ErrorApp } from "@/shared/error/error";

// export abstract class ICategoryCreateTx {
//   abstract create(dto: CategoryCreateTxDTO): Promise<CategoryEntity>;
// }
export abstract class ICategoryCreateTx {
  abstract create(
    dto: CategoryCreateTxDTO,
  ): Promise<Either<ErrorApp, CategoryEntity>>; // Promise<CategoryEntity>;
}
