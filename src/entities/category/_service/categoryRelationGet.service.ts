import { ICategoryRepository } from "@/kernel/domain/category/repository.type";
import { ErrorApp } from "@/shared/error/error";
import { Either } from "@sweet-monads/either";
import { injectable } from "inversify";
import {
  CategoryGetSelector,
  CategoryRelation,
} from "../_domain/category.types";
import { ServiceUtils } from "@/kernel/service/service.utils";

@injectable()
export class CategoryRelationGetService {
  constructor(
    private readonly categoryRepo: ICategoryRepository,
    private readonly serviceUtils: ServiceUtils,
  ) {}

  async execute(
    selector: CategoryGetSelector,
  ): Promise<Either<Array<ErrorApp>, CategoryRelation>> {
    const res =
      await this.categoryRepo.getWithRelation<CategoryRelation>(selector);
    return this.serviceUtils.buildMonadErrorArray(res);
  }
}
