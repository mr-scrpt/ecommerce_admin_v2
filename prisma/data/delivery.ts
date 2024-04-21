import { DELIVERY_TYPE } from "@prisma/client";

export const deliveryListSeed = [
  {
    id: "delivery_id_1",
    orderId: "orderId_d58Johoj_ORDER_AdminUser",
    deliveryType: DELIVERY_TYPE.PICKUP,
    settlement: "0e8cc768-4b3a-11e4-ab6d-005056801329",
    pickupPoint: "pickupPoint_1",
  },

  {
    id: "delivery_id_2",
    orderId: "orderId_2158FFFF8_ORDER_2_AdminUser",
    deliveryType: DELIVERY_TYPE.POST,
    settlement: "e71f8842-4b33-11e4-ab6d-005056801329",
    postOffice: "postOffice_1",
  },
  {
    id: "delivery_id_3",
    orderId: "orderId_FEohd84667_ORDER_User",
    deliveryType: DELIVERY_TYPE.COURIER,
    settlement: "0ddbfc76-4b3a-11e4-ab6d-005056801329",
    street: "Shevchenka",
    house: "1",
    apartment: "2",
  },
  {
    id: "delivery_id_4",
    orderId: "orderId_didonhfff557642fd_ORDER_User2",
    deliveryType: DELIVERY_TYPE.POST,
    settlement: "e71c2a15-4b33-11e4-ab6d-005056801329",
    postOffice: "postOffice_2",
  },
];
