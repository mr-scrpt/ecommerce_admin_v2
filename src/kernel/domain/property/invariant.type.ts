import { ErrorApp } from "@/shared/error/error";
import { Tx } from "@/shared/lib/db/db";
import { Either } from "@sweet-monads/either";

export abstract class IPropertyInvariant {
  abstract isPropertyExist(
    id: string,
    db?: Tx,
  ): Promise<Either<ErrorApp, boolean>>;

  abstract isPropertyListExist(
    idList: string[],
    db?: Tx,
  ): Promise<Either<ErrorApp, boolean>>;
}
