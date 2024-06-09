import { Category } from "@/entities/category";
import { injectable } from "inversify";
import { ICategoryRemoveTx } from "../_domain/transaction.type";
import { CategoryRemoveTxPayload } from "../_domain/types";

@injectable()
export class CategoryRemoveService {
  constructor(private readonly categoryRemoveTx: ICategoryRemoveTx) {}

  async execute(payload: CategoryRemoveTxPayload): Promise<Category> {
    return this.categoryRemoveTx.remove(payload);
  }
}
