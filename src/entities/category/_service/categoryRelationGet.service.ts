import { OperationsMap } from "@/shared/type/operation.type";
import { injectable } from "inversify";
import { CategoryGetSelector, CategoryRelation } from "../_domain/types";
import { CategoryRepository } from "../_repository/category.repo";

@injectable()
export class CategoryRelationGetService {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  async execute(selector: CategoryGetSelector): Promise<CategoryRelation> {
    return await this.operation(selector);
  }

  async operation(props: CategoryGetSelector): Promise<CategoryRelation> {
    const operationsMap: OperationsMap<CategoryRelation> = {
      id: (id: string) => this.categoryRepo.getCategoryRelation({ id }),
      slug: (slug: string) =>
        this.categoryRepo.getCategoryBySlugRelation({ slug }),
    };

    for (const key of Object.keys(props)) {
      const value = props[key as keyof CategoryGetSelector];
      if (value && operationsMap[key]) {
        return await operationsMap[key](value);
      }
    }

    // TODO: Error custom handling
    throw new Error("Either 'categoryId' or 'categorySlug' must be provided.");
  }
}
