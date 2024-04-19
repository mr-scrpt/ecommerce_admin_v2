import { DELIVERY_TYPE } from "@prisma/client";

export const deliveryListSeed = [
  {
    id: "delivery_id_1",
    orderId: "orderId_d58Johoj_ORDER_AdminUser",
    deliveryType: DELIVERY_TYPE.PICKUP,
    settlement: "Kyiv",
    pickupPoint: "pickupPoint_1",
  },

  {
    id: "delivery_id_2",
    orderId: "orderId_2158FFFF8_ORDER_2_AdminUser",
    deliveryType: DELIVERY_TYPE.POST,
    settlement: "Kyiv",
    postOffice: "postOffice_1",
  },
  {
    id: "delivery_id_3",
    orderId: "orderId_FEohd84667_ORDER_User",
    deliveryType: DELIVERY_TYPE.COURIER,
    settlement: "Kyiv",
    street: "Shevchenka",
    house: "1",
    apartment: "2",
  },
  {
    id: "delivery_id_4",
    orderId: "orderId_didonhfff557642fd_ORDER_User2",
    deliveryType: DELIVERY_TYPE.POST,
    settlement: "Kyiv",
    postOffice: "postOffice_2",
  },
];
