import { Controller } from "@/kernel/lib/trpc/_controller";
import { publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { z } from "zod";
import { CategoryRemoveService } from "../_service/categoryRemove.service";

const removeCategorySchema = z
  .object({
    categoryId: z.string().optional(),
    categorySlug: z.string().optional(),
  })
  .refine((data) => data.categoryId || data.categorySlug, {
    message: "Either 'id' or 'slug' is required",
  });

@injectable()
export class CategoryRemoveController extends Controller {
  constructor(private readonly removeCategoryService: CategoryRemoveService) {
    super();
  }

  public router = router({
    categoryRemove: {
      remove: publicProcedure
        .input(removeCategorySchema)
        .mutation(async ({ input }) => {
          return this.removeCategoryService.execute(input);
        }),
    },
  });
}
