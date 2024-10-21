import { Category } from "@/kernel/domain/category/category.type";
import { ICategoryRepository } from "@/kernel/domain/category/repository.type";
import { ErrorApp } from "@/shared/error/error";
import { slugGenerator } from "@/shared/lib/slugGenerator";
import { Either } from "@sweet-monads/either";
import { injectable } from "inversify";
import { merge } from "lodash";
import { ICategoryUpdateTx } from "../_domain/transaction.type";
import { CategoryUpdateTxPayload } from "../_domain/types";

@injectable()
export class CategoryUpdateService {
  constructor(
    private readonly categoryUpdateTx: ICategoryUpdateTx,
    readonly categoryRepo: ICategoryRepository,
  ) {}

  async execute(
    payload: CategoryUpdateTxPayload,
  ): Promise<Either<Array<ErrorApp>, Category>> {
    const cartRowUpdateDTO = this.build(payload);

    return await this.categoryUpdateTx.update(cartRowUpdateDTO);
  }

  private build(payload: CategoryUpdateTxPayload): CategoryUpdateTxPayload {
    const { categoryData } = payload;

    return merge({}, payload, {
      categoryData: {
        slug: slugGenerator(categoryData.name),
      },
    });
  }
}
