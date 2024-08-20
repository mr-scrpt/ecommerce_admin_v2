import { Category } from "@/kernel/domain/category/category.type";
import { ICategoryRepository } from "@/kernel/domain/category/repository.type";
import { ErrorApp } from "@/shared/error/error";
import { Either } from "@sweet-monads/either";
import { injectable } from "inversify";
import { CategoryGetSelector } from "../_domain/category.types";

@injectable()
export class CategoryGetService {
  constructor(private readonly categoryRepo: ICategoryRepository) {}

  async execute(
    selector: CategoryGetSelector,
  ): Promise<Either<ErrorApp, Category>> {
    return await this.categoryRepo.get(selector);
  }
}
