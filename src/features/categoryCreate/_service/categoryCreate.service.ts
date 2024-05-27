import { Category } from "@/entities/category";
import { injectable } from "inversify";
import { CategoryCreateTxDTO, CategoryCreateTxPayload } from "../_domain/types";
import { CategoryCreateTx } from "../_tx/categoryCreate.transaction";
import { slugGenerator } from "@/shared/lib/slugGenerator";

@injectable()
export class CategoryCreateService {
  constructor(private readonly categoryCreateTx: CategoryCreateTx) {}

  async execute(props: CategoryCreateTxPayload): Promise<Category> {
    const categoryCreateDTO = this.build(props);
    return await this.categoryCreateTx.execute(categoryCreateDTO);
  }

  private build(props: CategoryCreateTxPayload): CategoryCreateTxDTO {
    const { name, board, propertyList } = props;
    const slug = slugGenerator(name);

    return {
      categoryData: {
        name,
        slug,
        board,
      },
      propertyData: propertyList,
    };
  }
}
