import { Category } from "@/entities/category";
import { injectable } from "inversify";
import { CategoryRemoveTx } from "../_tx/categoryRemove.transaction";
import { CategoryRemoveTxPayload } from "../_domain/types";

@injectable()
export class CategoryRemoveService {
  constructor(private readonly categoryRemoveTx: CategoryRemoveTx) {}

  async execute(payload: CategoryRemoveTxPayload): Promise<Category> {
    return this.categoryRemoveTx.remove(payload);
  }
}
