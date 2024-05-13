import { z } from "zod";
import { GetCategoryListUseCase } from "../_usecase/getCategoryList.usecase";
import { categorySchema } from "../_domain/category.schema";
import { Category } from "../_domain/types";
import { SessionService } from "@/shared/session/session.service";
import { injectable } from "inversify";

const resultSchema = z.object({
  categoryList: z.array(categorySchema),
});

type ResultT = { categoryList: Category[] };

@injectable()
export class GetCategoryListService {
  constructor(
    private readonly getCategoryListUseCase: GetCategoryListUseCase,
    private readonly sessionService: SessionService,
  ) {}

  async execute(): Promise<ResultT> {
    console.log("output_log: request 666666 =>>>");
    const categoryList = await this.getCategoryListUseCase.exec({
      session: await this.getSession(),
    });

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
