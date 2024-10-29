import { injectable } from "inversify";
import { ICategoryRemoveTx } from "../_domain/transaction.type";
import { CategoryRemoveTxPayload } from "../_domain/types";
import { Category } from "@/kernel/domain/category/category.type";
import { Either } from "@sweet-monads/either";
import { ErrorApp } from "@/shared/error/error";

@injectable()
export class CategoryRemoveService {
  constructor(private readonly categoryRemoveTx: ICategoryRemoveTx) {}

  async execute(
    selector: CategoryRemoveTxPayload,
  ): Promise<Either<Array<ErrorApp>, Category>> {
    return this.categoryRemoveTx.remove(selector);
  }
}
