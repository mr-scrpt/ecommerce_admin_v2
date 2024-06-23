import { CategoryEntity } from "@/kernel/domain/category/category.type";
import { CategoryCreateTxDTO } from "./types";

export abstract class ICategoryCreateTx {
  abstract create(dto: CategoryCreateTxDTO): Promise<CategoryEntity>;
}
