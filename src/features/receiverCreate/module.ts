import { ContainerModule } from "inversify";
import { IReceiverCreateTx } from "./_domain/transaction.type";
import { ReceiverCreateTx } from "./_tx/receiverCreate.transaction";
import { Controller } from "@/kernel/lib/trpc/_controller";
import { ReceiverCreateController } from "./_controller/receiverCreate.controller";
import { ReceiverCreateService } from "./_service/receiverCreate.service";

export const ReceiverCreateModule = new ContainerModule((bind) => {
  bind(IReceiverCreateTx).to(ReceiverCreateTx);

  bind(ReceiverCreateService).toSelf();

  bind(Controller).to(ReceiverCreateController);
});
