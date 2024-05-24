import { Controller } from "@/kernel/lib/trpc/_controller";
import {
  checkAbilityInputProcedure,
  publicProcedure,
  router,
} from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { z } from "zod";
import { CategoryRemoveService } from "../_service/categoryRemove.service";
import {
  categorySchema,
  createCategoryAbility,
} from "@/entities/category/server";

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
      remove: checkAbilityInputProcedure({
        create: createCategoryAbility,
        input: removeCategorySchema,
        check: (ability) => ability.canRemoveCategory(),
      })
        .input(removeCategorySchema)
        .output(categorySchema)
        .mutation(async ({ input }) => {
          return this.removeCategoryService.execute(input);
        }),
    },
  });
}
