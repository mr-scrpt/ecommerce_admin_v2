import { $Enums } from "@prisma/client";

export const userListSeed = [
  {
    id: "admin_fdsfsddfew789879",
    name: "ADMIN",
    email: "admin@gmail.com",
    phone: "+380993282451",
    role: $Enums.ROLE.ADMIN,
  },

  {
    id: "user_fdseojeioui54645678",
    name: "",
    email: "user@gmail.com",
    phone: "+46701234567",
    role: $Enums.ROLE.USER,
  },

  {
    id: "user_2_fdfoer56468dfsdf",
    name: "",
    email: "user2@gmail.com",
    phone: "+4915112345678",
    role: $Enums.ROLE.USER,
  },
];
