import { injectable } from "inversify";
import { CategoryRemoveTx } from "../_tx/categoryRemove.transaction";
import { CategoryEntity } from "@/entities/category";

type CategoryRemove = {
  categoryId: string;
};

@injectable()
export class CategoryRemoveService {
  constructor(private readonly categoryRemoveTx: CategoryRemoveTx) {}

  async execute(props: CategoryRemove): Promise<CategoryEntity> {
    const { categoryId } = props;
    return this.categoryRemoveTx.removeCategoryById(categoryId);
  }
}
