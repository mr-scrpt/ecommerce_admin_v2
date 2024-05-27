import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { categoryUpdateTxSchema } from "../_domain/schema";
import { CategoryUpdateService } from "../_service/categoryUpdate.service";
import { categorySchema } from "@/entities/category/server";

@injectable()
export class CategoryUpdateController extends Controller {
  constructor(private readonly updateCategoryService: CategoryUpdateService) {
    super();
  }

  public router = router({
    categoryUpdate: {
      update: publicProcedure
        .input(categoryUpdateTxSchema)
        .mutation(async ({ input }) => {
          const result = await this.updateCategoryService.execute(input);
          return categorySchema.parse(result);
        }),
    },
  });
}
