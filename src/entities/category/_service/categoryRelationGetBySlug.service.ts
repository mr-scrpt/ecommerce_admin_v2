import { ICategoryRepository } from "@/kernel/domain/category/repository.type";
import { ServiceUtils } from "@/kernel/service/service.utils";
import { ErrorApp } from "@/shared/error/error";
import { Either } from "@sweet-monads/either";
import { injectable } from "inversify";
import {
  CategoryGetBySlugSelector,
  CategoryRelation,
} from "../_domain/category.types";

@injectable()
export class CategoryRelationGetBySlugService {
  constructor(
    private readonly categoryRepo: ICategoryRepository,
    private readonly serviceUtils: ServiceUtils,
  ) {}
  async execute(
    selector: CategoryGetBySlugSelector,
  ): Promise<Either<Array<ErrorApp>, CategoryRelation>> {
    const res =
      await this.categoryRepo.getBySlugRelation<CategoryRelation>(selector);

    return this.serviceUtils.buildMonadErrorArray(res);
  }
}
