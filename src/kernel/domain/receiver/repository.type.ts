import { Tx } from "@/shared/lib/db/db";
import {
  ReceiverCreateDTO,
  ReceiverGetByUserDTO,
  ReceiverGetDTO,
  ReceiverRemoveDTO,
  ReceiverUpdateDTO,
  ReceiverBindToOrderDTO,
  ReceiverGetByOrderDTO,
} from "./receiver.dto";
import { ReceiverEntity } from "./receiver.type";

export abstract class IReceiverRepository {
  abstract get(dto: ReceiverGetDTO, db?: Tx): Promise<ReceiverEntity>;

  abstract getWithRelation<T>(dto: ReceiverGetDTO, db?: Tx): Promise<T>;

  abstract getListByUser(
    dto: ReceiverGetByUserDTO,
    db?: Tx,
  ): Promise<ReceiverEntity[]>;

  // abstract getListByOrder(
  //   dto: ReceiverGetByOrderDTO,
  //   db?: Tx,
  // ): Promise<ReceiverEntity[]>;

  abstract create(dto: ReceiverCreateDTO, db?: Tx): Promise<ReceiverEntity>;

  abstract update(dto: ReceiverUpdateDTO, db?: Tx): Promise<ReceiverEntity>;

  abstract remove(dto: ReceiverRemoveDTO, db?: Tx): Promise<ReceiverEntity>;

  abstract bindToOrder(
    dto: ReceiverBindToOrderDTO,
    db?: Tx,
  ): Promise<ReceiverEntity>;
}
