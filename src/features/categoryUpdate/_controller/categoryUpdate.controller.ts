import { categorySchema } from "@/kernel/domain/category/category.schema";
import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { updateInputSchema } from "../_domain/validator.schema";
import { CategoryUpdateService } from "../_service/categoryUpdate.service";
import { IValidator } from "@/kernel/lib/trpc/validator";

@injectable()
export class CategoryUpdateController extends Controller {
  constructor(
    private readonly updateCategoryService: CategoryUpdateService,
    private readonly validator: IValidator,
  ) {
    super();
  }

  public router = router({
    categoryUpdate: {
      update: publicProcedure
        // .input(updateInputSchema)
        .mutation(async ({ input }) => {
          // console.log("output_log: BEFORE =>>>", input);
          const inputValid = this.validator.checkInput(
            input,
            updateInputSchema,
          );
          const result = await this.updateCategoryService.execute(inputValid);
          const validateResult = this.validator.checkResult(
            result,
            categorySchema,
          );
          return validateResult;
        }),
    },
  });
}
