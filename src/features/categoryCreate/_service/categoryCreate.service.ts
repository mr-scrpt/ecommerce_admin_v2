import { Category } from "@/entities/category";
import { injectable } from "inversify";
import { CategoryCreateTxDTO, CategoryCreateTxPayload } from "../_domain/types";
import { CategoryCreateTx } from "../_tx/categoryCreate.transaction";
import { slugGenerator } from "@/shared/lib/slugGenerator";

@injectable()
export class CategoryCreateService {
  constructor(private readonly categoryCreateTx: CategoryCreateTx) {}

  async execute(payload: CategoryCreateTxPayload): Promise<Category> {
    const categoryCreateDTO = this.build(payload);
    return await this.categoryCreateTx.create(categoryCreateDTO);
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
