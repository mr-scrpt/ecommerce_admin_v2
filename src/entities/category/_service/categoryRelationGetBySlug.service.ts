import { CategoryNotFoundError } from "@/kernel/domain/category/error";
import { ICategoryRepository } from "@/kernel/domain/category/repository.type";
import { Either } from "@sweet-monads/either";
import { injectable } from "inversify";
import {
  CategoryGetBySlugSelector,
  CategoryRelation,
} from "../_domain/category.types";

@injectable()
export class CategoryRelationGetBySlugService {
  constructor(private readonly categoryRepo: ICategoryRepository) {}

  async execute(
    selector: CategoryGetBySlugSelector,
  ): Promise<Either<CategoryNotFoundError, CategoryRelation>> {
    const res =
      await this.categoryRepo.getBySlugRelation<CategoryRelation>(selector);

    return res;
  }
}
