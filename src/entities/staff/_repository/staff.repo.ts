import {
  StaffCreateDTO,
  StaffGetDTO,
  StaffRemoveDTO,
  StaffSearchDTO,
  StaffUpdateDTO,
} from "@/kernel/domain/staff/staff.dto";
import { StaffEntity } from "@/kernel/domain/staff/staff.type";
import { IStaffRepository } from "@/kernel/domain/staff/repository.type";
import { RoleEnum, RoleStaff } from "@/kernel/domain/role.type";
import { UserEntity } from "@/kernel/domain/user/user.type";
import { DBClient, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { StaffRelationEntity } from "../_domain/staff.type";

@injectable()
export class StaffRepository implements IStaffRepository {
  constructor(readonly db: DBClient) {}

  private staffFieldRequired: Array<keyof StaffEntity> = [
    "name",
    "phone",
    "email",
  ] as const;

  async get(dto: StaffGetDTO, db: Tx = this.db): Promise<StaffEntity> {
    const user = await db.user.findUniqueOrThrow({
      where: { ...dto, role: { in: RoleStaff } },
    });

    this.checkStaffData(user);

    const staff = this.buildStaffFromUser(user);

    return staff;
  }

  async getList(db: Tx = this.db): Promise<StaffEntity[]> {
    const userList = await db.user.findMany({
      where: { role: { in: RoleStaff } },
    });

    console.log("output_log: Staff users =>>>", userList);

    const filteredUserList = this.filterStaffEntity(userList);
    return filteredUserList.map(this.buildStaffFromUser);
  }

  async getWithRelation<T>(dto: StaffGetDTO, db: Tx = this.db): Promise<T> {
    const user = await db.user.findUniqueOrThrow({
      where: { ...dto, role: { in: RoleStaff } },
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

    this.checkStaffData(user);

    const { orderList, cart, receiverList, ...userData } = user;

    const staff = this.buildStaffFromUser(userData);

    const staffWithRelation: StaffRelationEntity = {
      ...staff,
      orderList,
      cart,
      receiverList,
    };
    return staffWithRelation as T;
  }

  async searchList(
    dto: StaffSearchDTO,
    db: Tx = this.db,
  ): Promise<StaffEntity[]> {
    const { q } = dto;
    const userList = await db.user.findMany({
      where: {
        role: { in: RoleStaff },
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

    const filteredUserList = this.filterStaffEntity(userList);
    return filteredUserList.map(this.buildStaffFromUser);
  }

  async create(dto: StaffCreateDTO, db: Tx = this.db): Promise<StaffEntity> {
    const { data } = dto;
    const user = await db.user.create({
      data: {
        ...data,
        role: RoleEnum.MANAGER,
      },
    });

    return this.buildStaffFromUser(user);
  }

  async remove(dto: StaffRemoveDTO, db: Tx = this.db): Promise<StaffEntity> {
    const { selector } = dto;
    const user = await db.user.delete({
      where: { ...selector, role: { in: RoleStaff } },
    });

    this.checkStaffData(user);

    return this.buildStaffFromUser(user);
  }

  async update(dto: StaffUpdateDTO, db: Tx = this.db): Promise<StaffEntity> {
    const { selector, data } = dto;

    const user = await db.user.update({
      where: { ...selector, role: { in: RoleStaff } },
      data,
    });

    this.checkStaffData(user);

    return this.buildStaffFromUser(user);
  }

  private checkStaffData(data: UserEntity): void {
    this.staffFieldRequired.every((field) => {
      if (!data[field]) {
        throw new Error(`Staff invalid data: ${field}`);
      }
    });
  }

  private filterStaffEntity(userList: Array<UserEntity>): Array<UserEntity> {
    return userList.filter((user) =>
      this.staffFieldRequired.every((field) => user[field]),
    );
  }

  private isValidStaff(user: UserEntity): user is UserEntity & StaffEntity {
    return this.staffFieldRequired.every(
      (field) => user[field] !== null && user[field] !== undefined,
    );
  }

  private buildStaffFromUser = (user: UserEntity): StaffEntity => {
    if (!this.isValidStaff(user)) {
      const missingFields = this.staffFieldRequired.filter(
        (field) => !user[field],
      );

      // TODO: throw error
      throw new Error(
        `Staff invalid data: missing ${missingFields.join(", ")}`,
      );
    }
    const {
      id,
      name,
      lastName,
      phone,
      email,
      image,
      createdAt,
      updatedAt,
      role,
    } = user;

    return {
      id,
      name,
      lastName,
      phone,
      role,
      email,
      image,
      createdAt,
      updatedAt,
    };
  };
}
