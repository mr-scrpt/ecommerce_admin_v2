import { Tx } from "@/shared/lib/db/db";
import {
  ConsumerCreateDTO,
  ConsumerGetDTO,
  ConsumerRemoveDTO,
  ConsumerSearchDTO,
  ConsumerUpdateDTO,
} from "./consumer.dto";
import { ConsumerEntity } from "./consumer.type";

export abstract class IConsumerRepository {
  abstract get(dto: ConsumerGetDTO, db?: Tx): Promise<ConsumerEntity>;

  abstract getWithRelation<T>(dto: ConsumerGetDTO, db?: Tx): Promise<T>;

  abstract getList(db?: Tx): Promise<ConsumerEntity[]>;

  abstract searchList(
    dto: ConsumerSearchDTO,
    db?: Tx,
  ): Promise<ConsumerEntity[]>;

  abstract create(dto: ConsumerCreateDTO, db?: Tx): Promise<ConsumerEntity>;

  abstract remove(dto: ConsumerRemoveDTO, db?: Tx): Promise<ConsumerEntity>;

  abstract update(dto: ConsumerUpdateDTO, db?: Tx): Promise<ConsumerEntity>;
}
