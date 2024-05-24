import { injectable } from "inversify";
import { OperationsMap } from "@/shared/type/operation.type";
import { CategoryRemoveTx } from "../_tx/categoryRemove.transaction";
import { CategoryEntity } from "@/entities/category";

type CategoryRemove = {
  categoryId?: string;
  categorySlug?: string;
};

@injectable()
export class CategoryRemoveService {
  constructor(private readonly categoryRemoveTx: CategoryRemoveTx) {}

  async execute(props: CategoryRemove): Promise<CategoryEntity> {
    return await this.operation(props);
  }

  async operation(props: CategoryRemove): Promise<CategoryEntity> {
    const operationsMap: OperationsMap<CategoryEntity> = {
      categoryId: (categoryId: string) =>
        this.categoryRemoveTx.removeCategoryById(categoryId),
      categorySlug: (categorySlug: string) =>
        this.categoryRemoveTx.removeCategoryBySlug(categorySlug),
    };

    for (const key of Object.keys(props)) {
      const value = props[key as keyof CategoryRemove];
      if (value && operationsMap[key]) {
        return await operationsMap[key](value);
      }
    }

    // TODO: Error custom handling
    throw new Error("Either 'categoryId' or 'categorySlug' must be provided.");
  }
}
