import { categorySchema } from "@/kernel/domain/category/category.schema";
import {
  Controller,
  checkAbilityInputProcedure,
  checkAbilityProcedure,
  publicProcedure,
  router,
} from "@/kernel/lib/trpc/server";
import { ICheckService } from "@/kernel/service/type";
import { injectable } from "inversify";
import {
  updateInputSchema,
  updateInputSchemaTestError,
} from "../_domain/validator.schema";
import { CategoryUpdateService } from "../_service/categoryUpdate.service";
import { createCategoryAbility } from "@/entities/category/server";

@injectable()
export class CategoryUpdateController extends Controller {
  constructor(
    private readonly updateCategoryService: CategoryUpdateService,
    private readonly checkService: ICheckService,
  ) {
    super();
  }

  public router = router({
    categoryUpdate: {
      // update: checkAbilityProcedure({
      //   create: createCategoryAbility,
      //   check: (ability) => ability.canUpdateCategory(),
      // })
      // update: publicProcedure
      // .input(updateInputSchema)
      update: checkAbilityInputProcedure({
        create: createCategoryAbility,
        check: (ability, params) => ability.canUpdateCategory(),
        input: updateInputSchema,
        // input: updateInputSchemaTestError,
      })
        // .input(updateInputSchemaTestError)
        // .input(updateInputSchema)
        .mutation(async ({ input }) => {
          const result = await this.updateCategoryService.execute(input);

          const validateResult = this.checkService.checkResult(
            result,
            categorySchema,
          );

          return validateResult;
        }),
    },
  });
}
