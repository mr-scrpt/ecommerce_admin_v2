import { injectable } from "inversify";
import { CategoryRelationEntity } from "../_domain/types";
import { CategoryRepository } from "../_repository/category.repo";
import { OperationsMap } from "@/shared/type/operation.type";

type CategoryGetWithRelation = {
  categoryId?: string;
  categorySlug?: string;
};

@injectable()
export class CategoryGetService {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  async execute(
    props: CategoryGetWithRelation,
  ): Promise<CategoryRelationEntity> {
    return await this.operation(props);
  }

  async operation(
    props: CategoryGetWithRelation,
  ): Promise<CategoryRelationEntity> {
    const operationsMap: OperationsMap<CategoryRelationEntity> = {
      categoryId: (categoryId: string) =>
        this.categoryRepo.getCategoryWithRelation(categoryId),
      categorySlug: (categorySlug: string) =>
        this.categoryRepo.getCategoryBySlugWithRelation(categorySlug),
    };

    for (const key of Object.keys(props)) {
      const value = props[key as keyof CategoryGetWithRelation];
      if (value && operationsMap[key]) {
        return await operationsMap[key](value);
      }
    }

    // TODO: Error custom handling
    throw new Error("Either 'categoryId' or 'categorySlug' must be provided.");
  }
}
