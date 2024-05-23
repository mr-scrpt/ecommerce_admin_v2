import { SessionService } from "@/kernel/lib/nextauth/session.service";
import { injectable } from "inversify";
import { z } from "zod";
import { categorySchema } from "../_domain/category.schema";
import { Category } from "../_domain/types";
import { CategoryRepository } from "../server";

// const resultSchema = z.object({
//   categoryList: z.array(categorySchema),
// });
//
// type ResultT = { categoryList: Category[] };

@injectable()
export class GetCategoryListService {
  constructor(
    private readonly categoryRepo: CategoryRepository,
    private readonly sessionService: SessionService,
  ) {}

  async execute() {
    return await this.categoryRepo.getCategoryList();
  }

  // async getSession() {
  //   return await this.sessionService.getStrict();
  // }
}
