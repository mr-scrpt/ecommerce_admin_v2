import { CategoryEntity } from "@/kernel/domain/category/category.type";
import { CategoryRemoveTxDTO } from "./types";

export abstract class ICategoryRemoveTx {
  abstract remove(dto: CategoryRemoveTxDTO): Promise<CategoryEntity>;
}
