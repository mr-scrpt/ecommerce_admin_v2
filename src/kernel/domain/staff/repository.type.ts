import { Tx } from "@/shared/lib/db/db";
import {
  StaffCreateDTO,
  StaffGetDTO,
  StaffRemoveDTO,
  StaffSearchDTO,
  StaffUpdateDTO,
} from "./staff.dto";
import { StaffEntity } from "./staff.type";
import { StaffRelationEntity } from "@/entities/staff/_domain/staff.type";

export abstract class IStaffRepository {
  abstract get(dto: StaffGetDTO, db?: Tx): Promise<StaffEntity>;

  abstract getWithRelation(
    dto: StaffGetDTO,
    db?: Tx,
  ): Promise<StaffRelationEntity>;

  abstract getList(db?: Tx): Promise<StaffEntity[]>;

  abstract searchList(dto: StaffSearchDTO, db?: Tx): Promise<StaffEntity[]>;

  abstract create(dto: StaffCreateDTO, db?: Tx): Promise<StaffEntity>;

  abstract remove(dto: StaffRemoveDTO, db?: Tx): Promise<StaffEntity>;

  abstract update(dto: StaffUpdateDTO, db?: Tx): Promise<StaffEntity>;
}
