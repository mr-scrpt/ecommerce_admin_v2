import { ErrorApp } from "@/shared/error/error";
import { Tx } from "@/shared/lib/db/db";
import { Either } from "@sweet-monads/either";

// NOTE: Invariants
export type PropertyExistInvariant = {
  data: {
    id: string;
  };
};

export type PropertyExistByListIdInvariant = {
  data: {
    idList: Array<string>;
  };
};

export abstract class IPropertyInvariant {
  abstract isPropertyExist(
    invariantData: PropertyExistInvariant,
    db?: Tx,
  ): Promise<Either<ErrorApp, boolean>>;

  abstract isPropertyListExist(
    invariantData: PropertyExistByListIdInvariant,
    db?: Tx,
  ): Promise<Either<ErrorApp, boolean>>;
}
