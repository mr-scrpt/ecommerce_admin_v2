import { Category } from "@/entities/category";
import { injectable } from "inversify";
import { CategoryCreateTxDTO, CategoryCreateTxPayload } from "../_domain/types";
import { CategoryCreateTx } from "../_tx/categoryCreate.transaction";
import { slugGenerator } from "@/shared/lib/slugGenerator";
import { merge } from "lodash";

@injectable()
export class CategoryCreateService {
  constructor(private readonly categoryCreateTx: CategoryCreateTx) {}

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
