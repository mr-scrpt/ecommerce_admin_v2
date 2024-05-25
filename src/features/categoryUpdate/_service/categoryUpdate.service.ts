import { CategoryEntity } from "@/entities/category";
import { injectable } from "inversify";
import { CategoryUpdateComplexible } from "../_domain/types";
import { CategoryUpdateTx } from "../_tx/categoryUpdate.transaction";

@injectable()
export class CategoryUpdateService {
  constructor(private readonly categoryUpdateTx: CategoryUpdateTx) {}

  async execute(props: CategoryUpdateComplexible): Promise<CategoryEntity> {
    return await this.categoryUpdateTx.updateCategoryComplexible(props);
  }

  // async operation(props: CategoryUpdate): Promise<CategoryEntity> {
  //   const operationsMap: OperationsMap<CategoryEntity> = {
  //     categoryId: (categoryId: string) =>
  //       this.categoryRemoveTx.removeCategoryById(categoryId),
  //     categorySlug: (categorySlug: string) =>
  //       this.categoryRemoveTx.removeCategoryBySlug(categorySlug),
  //   };
  //
  //   for (const key of Object.keys(props)) {
  //     const value = props[key as keyof CategoryUpdate];
  //     if (value && operationsMap[key]) {
  //       return await operationsMap[key](value);
  //     }
  //   }
  //
  //   // TODO: Error custom handling
  //   throw new Error("Either 'categoryId' or 'categorySlug' must be provided.");
  // }
}
