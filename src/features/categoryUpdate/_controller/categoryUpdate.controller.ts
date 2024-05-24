import { Controller } from "@/kernel/lib/trpc/_controller";
import { publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { z } from "zod";

const updateCategorySchema = z.object({
  categoryId: z.string().optional(),
});

@injectable()
export class CategoryUpdateController extends Controller {
  constructor(private readonly updateCategoryService: CategoryUpdateService) {
    super();
  }

  public router = router({
    update: publicProcedure
      .input(updateCategorySchema)
      .mutation(async ({ input }) => {
        return this.updateCategoryService.execute(input);
      }),
  });
}
