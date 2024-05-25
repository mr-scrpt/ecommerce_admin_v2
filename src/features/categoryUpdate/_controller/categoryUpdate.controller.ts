import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { z } from "zod";
import { CategoryUpdateService } from "../_service/categoryUpdate.service";
import { categoryUpdateSchema } from "../_domain/schema";

const updateCategorySchema = z.object({
  categoryId: z.string().optional(),
});

@injectable()
export class CategoryUpdateController extends Controller {
  constructor(private readonly updateCategoryService: CategoryUpdateService) {
    super();
  }

  public router = router({
    categoryUpdate: {
      update: publicProcedure
        .input(updateCategorySchema)
        .mutation(async ({ input }) => {
          const result = this.updateCategoryService.execute(input);
          return categoryUpdateSchema.parse(result);
        }),
    },
  });
}
