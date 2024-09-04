import { DELIVERY_TYPE } from "@prisma/client";

export const deliveryTypeListSeed = [
  {
    id: "deliveryType_id_1",
    type: DELIVERY_TYPE.POST,
  },

  {
    id: "deliveryType_id_2",
    type: DELIVERY_TYPE.PICKUP,
  },
  {
    id: "deliveryType_id_3",
    type: DELIVERY_TYPE.COURIER,
  },
];
