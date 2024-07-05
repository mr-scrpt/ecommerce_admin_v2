import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { addressRelationSchema } from "../_domain/address.schema";
import {
  getByUserInputSchema,
  getInputSchema,
  getListOutputSchema,
} from "../_domain/validator.schema";
import { AddressRelationGetService } from "../_service/addressRelationGet.service";
import { AddressListGetByUserService } from "../_service/addressListGetByUser.service";

@injectable()
export class AddressController extends Controller {
  constructor(
    private readonly getAddressListByUserService: AddressListGetByUserService,
    // private readonly getAddressRelationService: AddressRelationGetService,
  ) {
    super();
  }

  public router = router({
    address: {
      // getRelation: publicProcedure
      //   .input(getInputSchema)
      //   .query(async ({ input }) => {
      //     const result = await this.getAddressRelationService.execute(input);
      //
      //     return addressRelationSchema.parse(result);
      //   }),
      getListByUser: publicProcedure
        .input(getByUserInputSchema)
        .query(async ({ input }) => {
          const result = await this.getAddressListByUserService.execute(input);

          return getListOutputSchema.parse(result);
        }),
    },
  });
}
