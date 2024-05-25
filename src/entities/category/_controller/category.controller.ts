import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { z } from "zod";
import {
  categoryRelationSchema,
  categorySchema,
} from "../_domain/category.schema";
import { CategoryListGetService } from "../_service/categoryListGet.service";
import { CategoryGetService } from "../_service/categoryGet.service";

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
        .query(async ({ input }) => {
          const result = await this.getCategoryService.execute(input);
          return categoryRelationSchema.parse(result);
        }),
      getList: publicProcedure.output(categoryListSchema).query(async () => {
        const result = await this.getCategoryListService.execute();
        return categoryListSchema.parse(result);
      }),
    },
  });
}
