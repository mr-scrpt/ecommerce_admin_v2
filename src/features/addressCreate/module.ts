import { ContainerModule } from "inversify";
import { IAddressCreateTx } from "./_domain/transaction.type";
import { AddressCreateTx } from "./_tx/addressCreate.transaction";
import { Controller } from "@/kernel/lib/trpc/_controller";
import { AddressCreateController } from "./_controller/addressCreate.controller";
import { AddressCreateService } from "./_service/addressCreate.service";

export const AddressCreateModule = new ContainerModule((bind) => {
  bind(IAddressCreateTx).to(AddressCreateTx);

  bind(AddressCreateService).toSelf();

  bind(Controller).to(AddressCreateController);
});
