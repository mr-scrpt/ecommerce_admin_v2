import {
  ConsumerCreateDTO,
  ConsumerGetDTO,
  ConsumerRemoveDTO,
  ConsumerSearchDTO,
  ConsumerUpdateDTO,
} from "@/kernel/domain/consumer/consumer.dto";
import { ConsumerEntity } from "@/kernel/domain/consumer/consumer.type";
import { IConsumerRepository } from "@/kernel/domain/consumer/repository.type";
import { RoleEnum } from "@/kernel/domain/role.type";
import { UserEntity } from "@/kernel/domain/user/user.type";
import { DBClient, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";

@injectable()
export class ConsumerRepository implements IConsumerRepository {
  constructor(readonly db: DBClient) {}

  private consumerFieldRequired: Array<keyof ConsumerEntity> = [
    "name",
    "phone",
    "email",
  ] as const;

  async get(dto: ConsumerGetDTO, db: Tx = this.db): Promise<ConsumerEntity> {
    const user = await db.user.findUniqueOrThrow({
      where: { ...dto, role: RoleEnum.CONSUMER },
    });

    this.checkUserData(user);

    const consumer = this.buildConsumerFromUser(user);

    return consumer;
  }

  async getList(db: Tx = this.db): Promise<ConsumerEntity[]> {
    const userList = await db.user.findMany({
      where: { role: RoleEnum.CONSUMER },
    });

    const filteredUserList = this.filterUserEntity(userList);
    return filteredUserList.map(this.buildConsumerFromUser);
  }

  async getWithRelation<T>(dto: ConsumerGetDTO, db: Tx = this.db): Promise<T> {
    const user = await db.user.findUniqueOrThrow({
      where: { ...dto, role: RoleEnum.CONSUMER },
      include: {
        orderList: true,
        cart: {
          include: {
            cartRowList: true,
          },
        },
        receiverList: true,
      },
    });

    this.checkUserData(user);

    const { orderList, cart, receiverList, ...userData } = user;

    const consumer = this.buildConsumerFromUser(userData);

    const consumerWithRelation = {
      ...consumer,
      orderList,
      cart,
      receiverList,
    } as unknown as T;
    return consumerWithRelation;
  }

  async searchList(
    dto: ConsumerSearchDTO,
    db: Tx = this.db,
  ): Promise<ConsumerEntity[]> {
    const { q } = dto;
    const userList = await db.user.findMany({
      where: {
        role: RoleEnum.CONSUMER,
        OR: [
          {
            name: {
              contains: q,

              mode: "insensitive",
            },
          },
          {
            phone: {
              contains: q,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    const filteredUserList = this.filterUserEntity(userList);
    return filteredUserList.map(this.buildConsumerFromUser);
  }

  async create(
    dto: ConsumerCreateDTO,
    db: Tx = this.db,
  ): Promise<ConsumerEntity> {
    const { data } = dto;
    const user = await db.user.create({
      data: {
        ...data,
        role: RoleEnum.CONSUMER,
      },
    });

    return this.buildConsumerFromUser(user);
  }

  async remove(
    dto: ConsumerRemoveDTO,
    db: Tx = this.db,
  ): Promise<ConsumerEntity> {
    const { selector } = dto;
    const user = await db.user.delete({
      where: { ...selector, role: RoleEnum.CONSUMER },
    });

    this.checkUserData(user);

    return this.buildConsumerFromUser(user);
  }

  async update(
    dto: ConsumerUpdateDTO,
    db: Tx = this.db,
  ): Promise<ConsumerEntity> {
    const { selector, data } = dto;

    const user = await db.user.update({
      where: { ...selector, role: RoleEnum.CONSUMER },
      data,
    });

    this.checkUserData(user);

    return this.buildConsumerFromUser(user);
  }

  private checkUserData(data: UserEntity): void {
    this.consumerFieldRequired.every((field) => {
      if (!data[field]) {
        throw new Error(`Consumer invalid data: ${field}`);
      }
    });
  }

  private filterUserEntity(userList: Array<UserEntity>): Array<UserEntity> {
    return userList.filter((user) =>
      this.consumerFieldRequired.every((field) => user[field]),
    );
  }

  private isValidConsumer(
    user: UserEntity,
  ): user is UserEntity & ConsumerEntity {
    return this.consumerFieldRequired.every(
      (field) => user[field] !== null && user[field] !== undefined,
    );
  }

  private buildConsumerFromUser = (user: UserEntity): ConsumerEntity => {
    if (!this.isValidConsumer(user)) {
      const missingFields = this.consumerFieldRequired.filter(
        (field) => !user[field],
      );

      // TODO: throw error
      throw new Error(
        `Consumer invalid data: missing ${missingFields.join(", ")}`,
      );
    }
    const { id, name, lastName, phone, email, image, createdAt, updatedAt } =
      user;

    return {
      id,
      name,
      lastName,
      phone,
      email,
      image,
      createdAt,
      updatedAt,
    };
  };
}
