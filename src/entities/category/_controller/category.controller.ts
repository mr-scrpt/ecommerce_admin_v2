import { Controller } from "@/kernel/lib/trpc/_controller";
import { publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { GetCategoryListService } from "../_service/getCategoryList.service";

@injectable()
export class CategoryController extends Controller {
  constructor(private readonly courseService: GetCategoryListService) {
    super();
  }

  public router = router({
    get: publicProcedure.query(() => this.courseService.execute()),
  });
}
