// import { ForbiddenError } from "@/shared/lib/errors";
// import { Option, OptionEntity, OptionId } from "../../_domain/option/types";
// import { SessionEntity } from "@/shared/lib/user";
// import {
//   OptionRepository,
//   optionRepository,
// } from "../../_repository/option.repo";
// import { createOptionAbility } from "../../_domain/option/option.ability";
//
// type UpdateOption = {
//   optionId: OptionId;
//   optionData: Partial<Option>;
//   session: SessionEntity;
// };
//
// class UpdateOptionUseCase {
//   constructor(private readonly optionRepo: OptionRepository) {}
//
//   async exec(data: UpdateOption): Promise<OptionEntity> {
//     const { optionId, optionData, session } = data;
//     const { canUpdateOption } = createOptionAbility(session);
//
//     if (!canUpdateOption()) {
//       throw new ForbiddenError();
//     }
//
//     //return await this.optionRepo.updateOption(optionId, optionData);
//   }
// }
//
// export const updateOptionUseCase = new UpdateOptionUseCase(optionRepository);
