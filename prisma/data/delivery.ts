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
    postOffice: "169227f4-e1c2-11e3-8c4a-0050568002cf",
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
    postOffice: "7b422fc4-e1b8-11e3-8c4a-0050568002cf",
  },
  {
    id: "delivery_id_5",
    orderId: "orderId5_ssiwwwff55ee5573PP_ORDER_User2",
    deliveryType: DELIVERY_TYPE.POST,
    settlement: "e71f8e8f-4b33-11e4-ab6d-005056801329",
    postOffice: "1692286c-e1c2-11e3-8c4a-0050568002cf",
  },
];
