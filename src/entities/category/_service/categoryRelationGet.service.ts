import { ICategoryRepository } from "@/kernel/domain/category/repository.type";
import { ErrorApp } from "@/shared/error/error";
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
  ): Promise<Either<ErrorApp, CategoryRelation>> {
    return await this.categoryRepo.getWithRelation<CategoryRelation>(selector);
  }
}
