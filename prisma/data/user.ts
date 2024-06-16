import { $Enums } from "@prisma/client";

export const userListSeed = [
  {
    id: "admin_fdsfsddfew789879",
    name: "ADMIN",
    email: "admin@gmail.com",
    phone: "+380993282451",
    // testPassword: "1234",
    role: $Enums.ROLE.ADMIN,
    emailVerified: new Date(),
  },

  {
    id: "user_fdseojeioui54645678",
    email: "user@gmail.com",
    phone: "+46701234567",
    // testPassword: "1234",
    role: $Enums.ROLE.USER,
    emailVerified: new Date(),
  },

  {
    id: "user_2_fdfoer56468dfsdf",
    email: "user2@gmail.com",
    phone: "+4915112345678",
    // testPassword: "1234",
    role: $Enums.ROLE.USER,
  },
];
