import { Controller } from "@/kernel/lib/trpc/_controller";
import { publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { z } from "zod";
import {
  categoryRelationSchema,
  categorySchema,
} from "../_domain/category.schema";
import { CategoryListGetService } from "../_service/CategoryListGet.service";
import { CategoryGetService } from "../_service/CategoryGet.service";

const categoryListSchema = z.array(categorySchema);

const getCategorySchema = z
  .object({
    categoryId: z.string().optional(),
    categorySlug: z.string().optional(),
  })
  .refine((data) => data.categoryId || data.categorySlug, {
    message: "Either 'id' or 'slug' is required",
  });

@injectable()
export class CategoryController extends Controller {
  constructor(
    private readonly getCategoryListService: CategoryListGetService,
    private readonly getCategoryService: CategoryGetService,
  ) {
    super();
  }

  public router = router({
    category: {
      getWithRelation: publicProcedure
        .input(getCategorySchema)
        .output(categoryRelationSchema)
        .query(({ input }) => {
          return this.getCategoryService.execute(input);
        }),
      getList: publicProcedure.output(categoryListSchema).query(() => {
        return this.getCategoryListService.execute();
      }),
    },
  });
}
