import { CategoryEntity } from "@/entities/category";
import { CategoryRepository } from "@/entities/category/server";
import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { CategoryRemoveTxDTO } from "../_domain/types";

@injectable()
export class CategoryRemoveTx extends Transaction {
  constructor(
    readonly db: DBClient,
    private readonly categoryRepo: CategoryRepository,
  ) {
    super(db);
  }

  async remove(dto: CategoryRemoveTxDTO): Promise<CategoryEntity> {
    const { selector } = dto;
    const action = async (tx: Tx) => {
      return await this.categoryRepo.removeCategory({ selector }, tx);
    };

    return await this.start(action);
  }

  // async removeBySlug(categorySlug: string): Promise<CategoryEntity> {
  //   const action = async (tx: Tx) => {
  //     return await this.categoryRepo.removeCategoryBySlug(
  //       { selector: { slug: categorySlug } },
  //       tx,
  //     );
  //   };
  //
  //   return await this.start(action);
  // }
}
