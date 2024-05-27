import { Category } from "@/entities/category";
import { slugGenerator } from "@/shared/lib/slugGenerator";
import { injectable } from "inversify";
import { CategoryUpdateTxDTO, CategoryUpdateTxPayload } from "../_domain/types";
import { CategoryUpdateTx } from "../_tx/categoryUpdate.transaction";

@injectable()
export class CategoryUpdateService {
  constructor(private readonly categoryUpdateTx: CategoryUpdateTx) {}

  async execute(props: CategoryUpdateTxPayload): Promise<Category> {
    const categoryUpdateDTO = this.build(props);
    return await this.categoryUpdateTx.execute(categoryUpdateDTO);
  }

  private build(props: CategoryUpdateTxPayload): CategoryUpdateTxDTO {
    const { id, name, board, propertyList } = props;
    const slug = slugGenerator(name);

    return {
      categoryData: {
        id,
        name,
        slug,
        board,
      },
      propertyData: propertyList,
    };
  }
}
