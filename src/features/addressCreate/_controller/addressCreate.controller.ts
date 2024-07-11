import { Controller, publicProcedure, router } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { createInputSchema } from "../_domain/validator.schema";
import { addressSchema } from "@/kernel/domain/address/address.schema";
import { AddressCreateService } from "../_service/addressCreate.service";

@injectable()
export class AddressCreateController extends Controller {
  constructor(private readonly createAddressService: AddressCreateService) {
    super();
  }

  public router = router({
    addressCreate: {
      create: publicProcedure
        .input(createInputSchema)
        .mutation(async ({ input }) => {
          const result = await this.createAddressService.execute(input);
          return addressSchema.parse(result);
        }),
    },
  });
}
