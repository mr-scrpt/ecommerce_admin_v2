import { ErrorApp } from "@/shared/error/error";
import { Either } from "@sweet-monads/either";
import { CategoryCheckByNameDTO } from "./category.dto";
import { Tx } from "@/shared/lib/db/db";

export abstract class ICategoryInvariant {
  abstract isCategoryUniqueByName(
    dto: CategoryCheckByNameDTO,
    db?: Tx,
  ): Promise<Either<ErrorApp, void>>;
}
