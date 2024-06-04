import { Category } from "@/entities/category";
import { injectable } from "inversify";
import { CategoryUpdateTxPayload } from "../_domain/types";
import { CategoryUpdateTx } from "../_tx/categoryUpdate.transaction";

@injectable()
export class CategoryUpdateService {
  constructor(private readonly categoryUpdateTx: CategoryUpdateTx) {}

  async execute(payload: CategoryUpdateTxPayload): Promise<Category> {
    return await this.categoryUpdateTx.update(payload);
  }
}
