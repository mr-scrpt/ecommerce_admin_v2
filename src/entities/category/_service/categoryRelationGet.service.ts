import { OperationsMap } from "@/shared/type/operation.type";
import { injectable } from "inversify";
import { CategoryGetPayload, CategoryRelation } from "../_domain/types";
import { CategoryRepository } from "../_repository/category.repo";

@injectable()
export class CategoryRelationGetService {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  async execute(payload: CategoryGetPayload): Promise<CategoryRelation> {
    return await this.operation(payload);
  }

  async operation(props: CategoryGetPayload): Promise<CategoryRelation> {
    const operationsMap: OperationsMap<CategoryRelation> = {
      id: (id: string) => this.categoryRepo.getCategoryRelation({ id }),
      slug: (slug: string) =>
        this.categoryRepo.getCategoryBySlugRelation({ slug }),
    };

    for (const key of Object.keys(props)) {
      const value = props[key as keyof CategoryGetPayload];
      if (value && operationsMap[key]) {
        return await operationsMap[key](value);
      }
    }

    // TODO: Error custom handling
    throw new Error("Either 'categoryId' or 'categorySlug' must be provided.");
  }
}
