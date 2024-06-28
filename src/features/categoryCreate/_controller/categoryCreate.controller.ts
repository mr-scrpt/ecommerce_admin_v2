import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { createInputSchema } from "../_domain/validator.schema";
import { CategoryCreateService } from "../_service/categoryCreate.service";
import { categorySchema } from "@/kernel/domain/category/category.schema";

@injectable()
export class CategoryCreateController extends Controller {
  constructor(private readonly createCategoryService: CategoryCreateService) {
    super();
  }

  public router = router({
    categoryCreate: {
      create: publicProcedure
        .input(createInputSchema)
        .mutation(async ({ input }) => {
          const result = await this.createCategoryService.execute(input);
          return categorySchema.parse(result);
        }),
    },
  });
}
