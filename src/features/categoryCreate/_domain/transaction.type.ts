import { CategoryEntity } from "@/entities/category";
import { CategoryCreateTxDTO } from "./types";

export abstract class ICategoryCreateTx {
  abstract create(dto: CategoryCreateTxDTO): Promise<CategoryEntity>;
}
