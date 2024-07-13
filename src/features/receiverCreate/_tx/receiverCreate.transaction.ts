import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { ReceiverCreateTxDTO } from "../_domain/types";
import { IReceiverRepository } from "@/kernel/domain/receiver/repository.type";
import { ReceiverEntity } from "@/kernel/domain/receiver/receiver.type";

@injectable()
export class ReceiverCreateTx extends Transaction {
  constructor(
    readonly db: DBClient,
    private readonly receiverRepo: IReceiverRepository,
  ) {
    super(db);
  }

  async create(dto: ReceiverCreateTxDTO): Promise<ReceiverEntity> {
    const action = async (tx: Tx) => {
      const { receiverData } = dto;
      const { id } = await this.receiverRepo.create({ data: receiverData }, tx);

      return await this.receiverRepo.get({ id }, tx);
    };

    return await this.start(action);
  }
}
