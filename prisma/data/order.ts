import { ORDER_STATUS, ORDER_PAYMENT_STATUS } from "@prisma/client";

export const orderListSeed = [
  {
    id: "orderId_d58Johoj_ORDER_AdminUser",
    orderNo: "1",

    userId: "admin_fdsfsddfew789879",

    orderStatus: ORDER_STATUS.NEW,
    paymentStatus: ORDER_PAYMENT_STATUS.NOT_PAID,
    priceTotal: 56558,
  },
  {
    id: "orderId_2158FFFF8_ORDER_2_AdminUser",
    orderNo: "2",

    userId: "admin_fdsfsddfew789879",

    orderStatus: ORDER_STATUS.COMPLETED,
    paymentStatus: ORDER_PAYMENT_STATUS.PAID,
    priceTotal: 7854,
  },
  {
    id: "orderId_FEohd84667_ORDER_User",
    orderNo: "3",

    userId: "user_fdseojeioui54645678",

    orderStatus: ORDER_STATUS.NEW,
    paymentStatus: ORDER_PAYMENT_STATUS.CONTACT_PAID,
    priceTotal: 3421,
  },
  {
    id: "orderId_didonhfff557642fd_ORDER_User2",
    orderNo: "4",

    userId: "user_2_fdfoer56468dfsdf",

    orderStatus: ORDER_STATUS.NEW,
    paymentStatus: ORDER_PAYMENT_STATUS.POSTAL_PAID,
    priceTotal: 8423,
  },
];
