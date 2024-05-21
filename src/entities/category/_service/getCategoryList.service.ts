import { z } from "zod";
import { GetCategoryListUseCase } from "../_usecase/getCategoryList.usecase";
import { categorySchema } from "../_domain/category.schema";
import { Category } from "../_domain/types";
import { SessionService } from "@/kernel/lib/nextauth/session.service";
import { injectable } from "inversify";
import { createCategoryAbility } from "../_domain/category.ability";
import { AuthorizatoinError } from "@/shared/lib/errors";
import { CategoryRepository } from "../server";

const resultSchema = z.object({
  categoryList: z.array(categorySchema),
});

type ResultT = { categoryList: Category[] };

@injectable()
export class GetCategoryListService {
  constructor(
    private readonly categoryRepo: CategoryRepository,
    private readonly sessionService: SessionService,
  ) {}

  async execute(): Promise<ResultT> {
    console.log("output_log:  =>>> in request");
    const { canGetCategory } = createCategoryAbility(await this.getSession());

    if (!canGetCategory()) {
      throw new AuthorizatoinError();
    }

    const categoryList = await this.categoryRepo.getCategoryList();

    return resultSchema.parseAsync({ categoryList });
  }

  async getSession() {
    return await this.sessionService.getStrict();
  }
}
function Injectable(): (
  target: typeof GetCategoryListService,
) => void | typeof GetCategoryListService {
  throw new Error("Function not implemented.");
}
