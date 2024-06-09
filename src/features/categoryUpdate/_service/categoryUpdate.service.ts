import { Category } from "@/entities/category";
import { injectable } from "inversify";
import { ICategoryUpdateTx } from "../_domain/transaction.type";
import { CategoryUpdateTxPayload } from "../_domain/types";

@injectable()
export class CategoryUpdateService {
  constructor(private readonly categoryUpdateTx: ICategoryUpdateTx) {}

  async execute(payload: CategoryUpdateTxPayload): Promise<Category> {
    return await this.categoryUpdateTx.update(payload);
  }
}
