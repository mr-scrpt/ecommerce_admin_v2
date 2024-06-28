import { Role } from "@/kernel/domain/role.type";
import { User } from "@/kernel/domain/user/user.type";

// NOTE: Queries
export type UserGetDTO = {
  id: string;
};

export type UserSearchDTO = {
  q: string;
};

// NOTE: Mutations
export type UserCreateDTO = {
  data: {
    email: string;
    phone: string;
    name?: string | null;
    image?: string | null;
    role: Role;
  };
};

export type UserUpdateDTO = {
  selector: {
    id: string;
  };
  data: Partial<User>;
};

export type UserRemoveDTO = {
  selector: {
    id: string;
  };
};
