import { injectable } from "inversify";
import { Category } from "@/kernel/domain/category/category.type";
import { ICategoryRepository } from "@/kernel/domain/category/repository.type";
import { Either } from "@sweet-monads/either";
import { ErrorApp } from "@/shared/error/error";
import { IUtilsService } from "@/kernel/service/type";

@injectable()
export class CategoryListGetService {
  constructor(
    private readonly categoryRepo: ICategoryRepository,
    private readonly serviceUtils: IUtilsService,
  ) {}

  async execute(): Promise<Either<Array<ErrorApp>, Array<Category>>> {
    const res = await this.categoryRepo.getList();
    return this.serviceUtils.buildMonadErrorArray(res);
  }
}
