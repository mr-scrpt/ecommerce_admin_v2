import { CategoryEntity } from "@/entities/category";
import { CategoryRemoveTxDTO } from "./types";

export abstract class ICategoryRemoveTx {
  abstract remove(dto: CategoryRemoveTxDTO): Promise<CategoryEntity>;
}
