import { slugGenerator } from "@/shared/lib/slugGenerator";
import { injectable } from "inversify";
import { merge } from "lodash";
import { ICategoryCreateTx } from "../_domain/transaction.type";
import { CategoryCreateTxDTO, CategoryCreateTxPayload } from "../_domain/types";
import { Category } from "@/kernel/domain/category/category.type";

@injectable()
export class CategoryCreateService {
  constructor(private readonly categoryCreateTx: ICategoryCreateTx) {}

  async execute(payload: CategoryCreateTxPayload): Promise<Category> {
    const categoryCreateDTO = this.build(payload);
    return await this.categoryCreateTx.create(categoryCreateDTO);
  }

  private build(payload: CategoryCreateTxPayload): CategoryCreateTxDTO {
    const {
      categoryData: { name },
    } = payload;

    const slug = slugGenerator(name);

    return merge({}, payload, {
      categoryData: {
        ...payload.categoryData,
        slug,
      },
    });
  }
}
