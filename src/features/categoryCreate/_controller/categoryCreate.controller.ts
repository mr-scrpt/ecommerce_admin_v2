import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { createInputSchema } from "../_domain/input.schema";
import { categorySchema } from "@/entities/category/server";
import { CategoryCreateService } from "../_service/categoryCreate.service";

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
          console.log("output_log:  resutl=>>>", result);
          return categorySchema.parse(result);
        }),
    },
  });
}
