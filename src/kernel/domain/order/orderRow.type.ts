// NOTE: Base
export type OrderRowBase = {
  orderId: string;

  productId: string;
  productName: string;
  productArticle: string;
  productImg: string;

  quantity: number;
  price: number;
};

// NOTE: Entity
export type OrderRowEntity = OrderRowBase & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

// NOTE: Projetions
export type OrderRow = OrderRowBase & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};
