import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { categoryRelationSchema } from "../_domain/category.schema";
import {
  getInputSchema,
  getListOutputSchema,
} from "../_domain/validator.schema";
import { CategoryListGetService } from "../_service/categoryListGet.service";
import { CategoryRelationGetService } from "../_service/categoryRelationGet.service";

@injectable()
export class CategoryController extends Controller {
  constructor(
    private readonly getCategoryListService: CategoryListGetService,
    private readonly getCategoryRelationService: CategoryRelationGetService,
  ) {
    super();
  }

  public router = router({
    category: {
      getRelation: publicProcedure
        .input(getInputSchema)
        .query(async ({ input }) => {
          const result = await this.getCategoryRelationService.execute(input);
          return this.checkResult(result, categoryRelationSchema);
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
