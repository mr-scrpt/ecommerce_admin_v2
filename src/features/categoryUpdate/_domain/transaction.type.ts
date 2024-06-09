import { CategoryEntity } from "@/entities/category";
import { CategoryUpdateTxDTO } from "./types";

export abstract class ICategoryUpdateTx {
  abstract update(dto: CategoryUpdateTxDTO): Promise<CategoryEntity>;
}
