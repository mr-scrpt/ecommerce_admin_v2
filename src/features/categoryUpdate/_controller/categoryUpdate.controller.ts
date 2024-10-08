import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { CategoryUpdateService } from "../_service/categoryUpdate.service";
import { updateInputSchema } from "../_domain/validator.schema";
import { categorySchema } from "@/kernel/domain/category/category.schema";

@injectable()
export class CategoryUpdateController extends Controller {
  constructor(private readonly updateCategoryService: CategoryUpdateService) {
    super();
  }

  public router = router({
    categoryUpdate: {
      update: publicProcedure
        .input(updateInputSchema)
        .mutation(async ({ input }) => {
          const result = await this.updateCategoryService.execute(input);
          const validateResult = this.checkResult(result, categorySchema);
          return validateResult;
        }),
    },
  });
}
