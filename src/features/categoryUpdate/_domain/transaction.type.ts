import { CategoryEntity } from "@/kernel/domain/category/category.type";
import { CategoryUpdateTxDTO } from "./types";

export abstract class ICategoryUpdateTx {
  abstract update(dto: CategoryUpdateTxDTO): Promise<CategoryEntity>;
}
