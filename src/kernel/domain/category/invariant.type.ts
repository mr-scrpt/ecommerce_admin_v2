import { ErrorApp } from "@/shared/error/error";
import { Tx } from "@/shared/lib/db/db";
import { Either } from "@sweet-monads/either";

export abstract class ICategoryInvariant {
  abstract isCategoryUniqueByName(
    name: string,
    selector: {
      id: string;
    },
    db?: Tx,
  ): Promise<Either<ErrorApp, boolean>>;
}
