import { Category } from "@/entities/category";
import { injectable } from "inversify";
import { CategoryUpdateTxPayload } from "../_domain/types";
import { CategoryUpdateTx } from "../_tx/categoryUpdate.transaction";

@injectable()
export class CategoryUpdateService {
  constructor(private readonly categoryUpdateTx: CategoryUpdateTx) {}

  async execute(payload: CategoryUpdateTxPayload): Promise<Category> {
    // const categoryUpdateDTO = this.build(categoryData);
    return await this.categoryUpdateTx.update(payload);
  }

  // private build(props: CategoryUpdateTxPayload): CategoryUpdateTxDTO {
  //
  //   const { id, name, board, propertyList } = props;
  //   const slug = slugGenerator(name);
  //
  //   return {
  //     categoryData: {
  //       categoryId: id,
  //       name,
  //       slug,
  //       board,
  //     },
  //     propertyData: propertyList,
  //   };
  // }
}
