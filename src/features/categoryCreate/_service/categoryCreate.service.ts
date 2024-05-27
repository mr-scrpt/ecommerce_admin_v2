import { CategoryEntity } from "@/entities/category";
import { injectable } from "inversify";
import { CategoryCreateComplexible } from "../_domain/types";
import { CategoryCreateTx } from "../_tx/categoryCreate.transaction";

@injectable()
export class CategoryCreateService {
  constructor(private readonly categoryCreateTx: CategoryCreateTx) {}

  async execute(props: CategoryCreateComplexible): Promise<CategoryEntity> {
    return await this.categoryCreateTx.createCategoryComplexible(props);
  }

  // async operation(props: CategoryCreate): Promise<CategoryEntity> {
  //   const operationsMap: OperationsMap<CategoryEntity> = {
  //     categoryId: (categoryId: string) =>
  //       this.categoryRemoveTx.removeCategoryById(categoryId),
  //     categorySlug: (categorySlug: string) =>
  //       this.categoryRemoveTx.removeCategoryBySlug(categorySlug),
  //   };
  //
  //   for (const key of Object.keys(props)) {
  //     const value = props[key as keyof CategoryCreate];
  //     if (value && operationsMap[key]) {
  //       return await operationsMap[key](value);
  //     }
  //   }
  //
  //   // TODO: Error custom handling
  //   throw new Error("Either 'categoryId' or 'categorySlug' must be provided.");
  // }
}
