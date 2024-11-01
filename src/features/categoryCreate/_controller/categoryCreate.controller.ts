import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { createInputSchema } from "../_domain/validator.schema";
import { CategoryCreateService } from "../_service/categoryCreate.service";
import { categorySchema } from "@/kernel/domain/category/category.schema";
import { ICheckService } from "@/kernel/service/type";

@injectable()
export class CategoryCreateController extends Controller {
  constructor(
    private readonly createCategoryService: CategoryCreateService,

    private readonly checkService: ICheckService,
  ) {
    super();
  }

  public router = router({
    categoryCreate: {
      create: publicProcedure
        .input(createInputSchema)
        .mutation(async ({ input }) => {
          const result = await this.createCategoryService.execute(input);
          const validateResult = this.checkService.checkResult(
            result,
            categorySchema,
          );
          return validateResult;
        }),
    },
  });
}
