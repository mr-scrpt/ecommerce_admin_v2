import { $Enums } from "@prisma/client";

export const userListSeed = [
  {
    id: "admin_id_1",
    name: "Admnin User Name",
    email: "admin@gmail.com",
    phone: "+380993282451",
    role: $Enums.ROLE.ADMIN,
    emailVerified: new Date(),
  },

  {
    id: "manager_id_2",
    name: "Manager User Name",
    lastName: "Manager Last Name",
    email: "manager@gmail.com",
    phone: "+46701234567",
    role: $Enums.ROLE.MANAGER,
    emailVerified: new Date(),
  },
  {
    id: "consumer_id_3",
    name: "Consumer User Name",
    lastName: "Consumer Last Name",
    email: "consumer@gmail.com",
    phone: "+4915112345678",
    role: $Enums.ROLE.CONSUMER,
  },
  {
    id: "consumer_id_4",
    email: "consumer_without_name@gmail.com",
    phone: "+4915112345678",
    role: $Enums.ROLE.CONSUMER,
  },
  {
    id: "consumer_id_5",
    name: "Long Name Consumer User Name",
    email: "long_name@gmail.com",
    phone: "+3809987889987",
    role: $Enums.ROLE.CONSUMER,
  },
];
