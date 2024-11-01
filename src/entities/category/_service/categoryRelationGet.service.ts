import { ICategoryRepository } from "@/kernel/domain/category/repository.type";
import { ErrorApp } from "@/shared/error/error";
import { Either } from "@sweet-monads/either";
import { injectable } from "inversify";
import {
  CategoryGetSelector,
  CategoryRelation,
} from "../_domain/category.types";
import { IUtilsService } from "@/kernel/service/type";

@injectable()
export class CategoryRelationGetService {
  constructor(
    private readonly categoryRepo: ICategoryRepository,
    private readonly serviceUtils: IUtilsService,
  ) {}

  async execute(
    selector: CategoryGetSelector,
  ): Promise<Either<Array<ErrorApp>, CategoryRelation>> {
    const res =
      await this.categoryRepo.getWithRelation<CategoryRelation>(selector);
    return this.serviceUtils.buildMonadErrorArray(res);
  }
}
