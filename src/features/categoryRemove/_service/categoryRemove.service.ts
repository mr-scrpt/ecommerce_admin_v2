import { injectable } from "inversify";
import { ICategoryRemoveTx } from "../_domain/transaction.type";
import { CategoryRemoveTxPayload } from "../_domain/types";
import { Category } from "@/kernel/domain/category/category.type";

@injectable()
export class CategoryRemoveService {
  constructor(private readonly categoryRemoveTx: ICategoryRemoveTx) {}

  async execute(selector: CategoryRemoveTxPayload): Promise<Category> {
    return this.categoryRemoveTx.remove(selector);
  }
}
