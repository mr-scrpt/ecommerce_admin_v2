import { Category } from "@/kernel/domain/category/category.type";
import { ICategoryRepository } from "@/kernel/domain/category/repository.type";
import { IUtilsService } from "@/kernel/service/type";
import { ErrorApp } from "@/shared/error/error";
import { Either } from "@sweet-monads/either";
import { injectable } from "inversify";
import { CategoryGetSelector } from "../_domain/category.types";

@injectable()
export class CategoryGetService {
  constructor(
    private readonly categoryRepo: ICategoryRepository,
    private readonly serviceUtils: IUtilsService,
  ) {}

  async execute(
    selector: CategoryGetSelector,
  ): Promise<Either<Array<ErrorApp>, Category>> {
    const res = await this.categoryRepo.get(selector);
    return this.serviceUtils.buildMonadErrorArray(res);
  }
}
