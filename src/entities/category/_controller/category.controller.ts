import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { categoryRelationSchema } from "../_domain/category.schema";
import {
  getInputSchema,
  getListOutputSchema,
} from "../_domain/validator.schema";
import { CategoryListGetService } from "../_service/categoryListGet.service";
import { CategoryRelationGetService } from "../_service/categoryRelationGet.service";
import { CategoryGetService } from "../_service/categoryGet.service";
import { categorySchema } from "@/kernel/domain/category/category.schema";
import { IValidator } from "@/kernel/lib/trpc/validator";

@injectable()
export class CategoryController extends Controller {
  constructor(
    private readonly getCategoryService: CategoryGetService,
    private readonly getCategoryListService: CategoryListGetService,
    private readonly getCategoryRelationService: CategoryRelationGetService,
    private readonly validator: IValidator,
  ) {
    super();
  }

  public router = router({
    category: {
      get: publicProcedure.input(getInputSchema).query(async ({ input }) => {
        const result = await this.getCategoryService.execute(input);
        const validateResult = this.validator.checkResult(
          result,
          categorySchema,
        );
        return validateResult;
      }),
      getRelation: publicProcedure
        .input(getInputSchema)
        .query(async ({ input }) => {
          const result = await this.getCategoryRelationService.execute(input);
          const validateResult = this.validator.checkResult(
            result,
            categoryRelationSchema,
          );
          return validateResult;
        }),

      getRelationBySlug: publicProcedure
        .input(getInputSchema)
        .query(async ({ input }) => {
          const result = await this.getCategoryRelationService.execute(input);

          return categoryRelationSchema.parse(result);
        }),
      getList: publicProcedure.query(async () => {
        const result = await this.getCategoryListService.execute();

        return getListOutputSchema.parse(result);
      }),
    },
  });
}
