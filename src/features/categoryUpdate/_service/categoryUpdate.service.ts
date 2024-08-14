import { injectable } from "inversify";
import { ICategoryUpdateTx } from "../_domain/transaction.type";
import { CategoryUpdateTxPayload } from "../_domain/types";
import { slugGenerator } from "@/shared/lib/slugGenerator";
import { merge } from "lodash";
import { Category } from "@/kernel/domain/category/category.type";
import { ErrorApp } from "@/shared/error/error";
import { Either } from "@sweet-monads/either";

@injectable()
export class CategoryUpdateService {
  constructor(private readonly categoryUpdateTx: ICategoryUpdateTx) {}

  async execute(
    payload: CategoryUpdateTxPayload,
  ): Promise<Either<ErrorApp, Category>> {
    const cartRowUpdateDTO = this.build(payload);
    return await this.categoryUpdateTx.update(cartRowUpdateDTO);
  }

  private build(payload: CategoryUpdateTxPayload) {
    const { categoryData } = payload;
    if (!categoryData.name) {
      return payload;
    }

    return merge({}, payload, {
      categoryData: {
        slug: slugGenerator(categoryData.name),
      },
    });
  }
}
