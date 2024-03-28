import { $Enums } from "@prisma/client";

export const userListSeed = [
  {
    id: "admin_fdsfsddfew789879",
    email: "admin@gmail.com",
    phone: "123456789",
    name: "ADMIN",
    // testPassword: "1234",
    role: $Enums.ROLE.ADMIN,
  },

  {
    id: "user_fdseojeioui54645678",
    email: "user@gmail.com",
    phone: "123456789",
    // testPassword: "1234",
    role: $Enums.ROLE.USER,
  },

  {
    id: "user_2_fdfoer56468dfsdf",
    email: "user2@gmail.com",
    phone: "123456789",
    // testPassword: "1234",
    role: $Enums.ROLE.USER,
  },
];
