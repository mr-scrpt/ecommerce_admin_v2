import { Service } from "@/app/initAction";
import { SessionService } from "@/kernel/lib/nextauth/session.service";
import { injectable } from "inversify";
import { z } from "zod";
import { createCategoryAbility } from "../_domain/category.ability";
import { categorySchema } from "../_domain/category.schema";
import { Category, CategoryRelation } from "../_domain/types";
import { CategoryRepository } from "../_repository/category.repo";
import { AuthorizatoinError } from "@/shared/lib/errors";

const propsSchema = z.object({
  categoryId: z.string().optional(),
  categorySlug: z.string().optional(),
});

const resultSchema = z.object({
  category: categorySchema,
});

type ResultT = { category: CategoryRelation };

@injectable()
export class GetCategoryService extends Service {
  constructor(
    private readonly categoryRepo: CategoryRepository,
    private readonly sessionService: SessionService,
  ) {
    super();
  }

  async operation(props: z.infer<typeof propsSchema>) {
    const { categoryId, categorySlug } = props;
    return {
      categoryId: categoryId
        ? await this.categoryRepo.getCategory(categoryId)
        : null,
      categorySlug: categorySlug
        ? await this.categoryRepo.getCategoryBySlug(categorySlug)
        : null,
    };
  }

  async execute(props: z.infer<typeof propsSchema>): Promise<ResultT> {
    console.log("output_log: in get category execute =>>>");
    const { categoryId, categorySlug } = propsSchema.parse(props);

    const { canGetCategory } = createCategoryAbility(await this.getSession());

    if (!canGetCategory()) {
      throw new AuthorizatoinError();
    }

    if (!categoryId && !categorySlug) {
      throw new Error("categoryId or categorySlug is required");
    }

    const res = await this.operation(props);

    console.log("output_log: res =>>>", res);

    const category = resultSchema.parseAsync({
      category: res,
    });

    return category;
  }

  async getSession() {
    return await this.sessionService.getStrict();
  }
}
