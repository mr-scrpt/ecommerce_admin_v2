import { ErrorApp } from "@/shared/error/error";
import { Tx } from "@/shared/lib/db/db";
import { Either } from "@sweet-monads/either";

// NOTE: Invariants
export type CategoryUniqueByNameInvariant = {
  selector?: {
    id: string;
  };
  data: {
    name: string;
  };
};
export type CategoryExistInvariant = {
  selector: {
    id: string;
  };
};

export abstract class ICategoryInvariant {
  abstract isCategoryExist(
    invariantData: CategoryExistInvariant,
    db?: Tx,
  ): Promise<Either<ErrorApp, boolean>>;

  abstract isCategoryUniqueByName(
    invariantData: CategoryUniqueByNameInvariant,
    db?: Tx,
  ): Promise<Either<ErrorApp, boolean>>;
}
