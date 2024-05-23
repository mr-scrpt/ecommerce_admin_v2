// import { SessionService } from "@/kernel/lib/nextauth/session.service";
// import { AuthorizatoinError } from "@/shared/lib/errors";
// import { injectable } from "inversify";
// import { z } from "zod";
// import { createCategoryAbility } from "../_domain/category.ability";
// import { categorySchema } from "../_domain/category.schema";
// import { CategoryRelation } from "../_domain/types";
// import { CategoryRepository } from "../_repository/category.repo";
//
// const propsSchema = z.object({
//   categoryId: z.string().optional(),
//   categorySlug: z.string().optional(),
// });
//
// const resultSchema = z.object({
//   category: categorySchema,
// });
//
// type ResultT = { category: CategoryRelation };
//
// @injectable()
// export class GetCategoryService {
//   constructor(
//     private readonly categoryRepo: CategoryRepository,
//     private readonly sessionService: SessionService,
//   ) {}
//
//   async operation(props: z.infer<typeof propsSchema>) {
//     const { categoryId, categorySlug } = props;
//     console.log("output_log:  =>>>", categoryId, categorySlug);
//     return {
//       categoryId: categoryId
//         ? await this.categoryRepo.getCategory(categoryId)
//         : null,
//       categorySlug: categorySlug
//         ? await this.categoryRepo.getCategoryBySlug(categorySlug)
//         : null,
//     };
//   }
//
//   async execute(props: z.infer<typeof propsSchema>): Promise<ResultT> {
//     console.log("output_log: in get category execute =>>>");
//     const { categoryId, categorySlug } = propsSchema.parse(props);
//
//     const { canGetCategory } = createCategoryAbility(await this.getSession());
//
//     if (!canGetCategory()) {
//       throw new AuthorizatoinError();
//     }
//
//     if (!categoryId && !categorySlug) {
//       throw new Error("categoryId or categorySlug is required");
//     }
//
//     const res = await this.operation(props);
//
//     console.log("output_log: res =>>>", res);
//
//     const category = resultSchema.parseAsync({
//       category: res,
//     });
//
//     return category;
//   }
//
//   async getSession() {
//     return await this.sessionService.getStrict();
//   }
// }
