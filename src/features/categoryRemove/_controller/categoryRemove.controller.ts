import {
  categorySchema,
  createCategoryAbility,
} from "@/entities/category/server";
import {
  Controller,
  checkAbilityProcedure,
  router,
} from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { z } from "zod";
import { CategoryRemoveService } from "../_service/categoryRemove.service";

const removeCategorySchema = z.object({
  categoryId: z.string(),
});

@injectable()
export class CategoryRemoveController extends Controller {
  constructor(private readonly removeCategoryService: CategoryRemoveService) {
    super();
  }

  public router = router({
    categoryRemove: {
      remove: checkAbilityProcedure({
        create: createCategoryAbility,
        check: (ability) => ability.canRemoveCategory(),
      })
        .input(removeCategorySchema)
        .mutation(async ({ input }) => {
          const result = await this.removeCategoryService.execute(input);

          return categorySchema.parse(result);
        }),
    },
  });
}
