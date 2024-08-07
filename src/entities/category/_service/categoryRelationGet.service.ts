import { ICategoryRepository } from "@/kernel/domain/category/repository.type";
import { CategoryNotFoundError } from "@/kernel/domain/category/error";
import { Either } from "@sweet-monads/either";
import { injectable } from "inversify";
import {
  CategoryGetSelector,
  CategoryRelation,
} from "../_domain/category.types";

@injectable()
export class CategoryRelationGetService {
  constructor(private readonly categoryRepo: ICategoryRepository) {}

  async execute(
    selector: CategoryGetSelector,
  ): Promise<Either<CategoryNotFoundError, CategoryRelation>> {
    // throw new Error("Method not implemented.");
    return await this.categoryRepo.getWithRelation<CategoryRelation>(selector);
  }
}
