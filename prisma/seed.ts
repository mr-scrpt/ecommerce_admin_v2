import { PrismaClient } from "@prisma/client";
import { categoryListSeed } from "./data/category";
import { categoryRelationsSeed } from "./data/categoryRelations";
import { productListSeed } from "./data/product";
import { propertyListSeed } from "./data/property";
import { propertyItemListSeed } from "./data/propertyItem";
import { userListSeed } from "./data/user";
import { productRelationsSeed } from "./data/productRelations";
import { cartListSeed } from "./data/cart";
import { cartRelationsSeed } from "./data/cartRelations";
import { cartRowListSeed } from "./data/cartRow";
import { orderListSeed } from "./data/order";
import { orderRowListSeed } from "./data/orderRow";
import { receiverListSeed } from "./data/receiver";
import { deliveryListSeed } from "./data/delivery";
import { settlementListSeed } from "./data/settlement";
import { storeListSeed } from "./data/store";
import { addressListSeed } from "./data/address";
import { deliveryTypeListSeed } from "./data/deliveryType";
import {
  orderStatusPaymentListSeed,
  orderStatusStateListSeed,
} from "./data/orderStatus";

const prisma = new PrismaClient();

async function main() {
  for await (const user of userListSeed) {
    await prisma.user.create({ data: user });
    console.log("user created", user);
  }

  for await (const property of propertyListSeed) {
    await prisma.property.create({
      data: {
        ...property,
      },
    });
    console.log("property created", property);
  }

  for await (const propertyItem of propertyItemListSeed) {
    await prisma.propertyItem.create({ data: propertyItem });
    console.log("property item created", propertyItem);
  }

  for await (const category of categoryListSeed) {
    await prisma.category.create({ data: category });
    console.log("category created", category);
  }

  for await (const product of productListSeed) {
    await prisma.product.create({ data: product });
    console.log("product created", product);
  }

  for await (const cart of cartListSeed) {
    await prisma.cart.create({ data: cart });
    console.log("cart created", cart);
  }

  for await (const cartRow of cartRowListSeed) {
    await prisma.cartRow.create({ data: cartRow });
    console.log("cart created", cartRow);
  }

  for await (const settlementRow of settlementListSeed) {
    await prisma.settlement.create({ data: settlementRow });
    console.log("settlementRow created", settlementRow);
  }

  for await (const address of addressListSeed) {
    await prisma.address.create({ data: address });
    console.log("address created", address);
  }

  for await (const storeRow of storeListSeed) {
    console.log("output_log: store row =>>>", storeRow);
    await prisma.store.create({ data: storeRow });
    console.log("store created", storeRow);
  }

  for await (const receiver of receiverListSeed) {
    try {
      await prisma.receiver.create({ data: receiver });
      console.log("receiver created", receiver);
    } catch (error) {
      console.log("output_log: receiver error =>>>", error);
    }
  }

  for await (const orderStatusState of orderStatusStateListSeed) {
    try {
      await prisma.orderStatusState.create({ data: orderStatusState });
      console.log("order status state created", orderStatusState);
    } catch (error) {
      console.log("output_log: order status state error =>>>", error);
    }
  }

  for await (const orderStatusPayment of orderStatusPaymentListSeed) {
    try {
      await prisma.orderStatusPayment.create({ data: orderStatusPayment });
      console.log("order status payment created", orderStatusPayment);
    } catch (error) {
      console.log("output_log: order status payment error =>>>", error);
    }
  }

  for await (const order of orderListSeed) {
    try {
      await prisma.order.create({ data: order });
      console.log("order created", order);
    } catch (error) {
      console.log("output_log: order error =>>>", error);
    }
  }

  for await (const deliveryType of deliveryTypeListSeed) {
    try {
      await prisma.deliveryType.create({ data: deliveryType });
      console.log("delivery created", deliveryType);
    } catch (error) {
      console.log("output_log: delivery error =>>>", error);
    }
  }

  for await (const delivery of deliveryListSeed) {
    try {
      await prisma.delivery.create({ data: delivery });
      console.log("delivery created", delivery);
    } catch (error) {
      console.log("output_log: delivery error =>>>", error);
    }
  }

  for await (const orderRow of orderRowListSeed) {
    await prisma.orderRow.create({ data: orderRow });
    console.log("orderRow created", orderRow);
  }

  // Relation
  //
  // for await (const user of userRelationListSeed) {
  //   await prisma.user.update({ where: { id: user.id }, data: user });
  //   console.log("user created relation", user);
  // }

  for await (const category of categoryRelationsSeed) {
    await prisma.category.update({
      where: { id: category.id },
      data: category,
    });
    console.log("category created relation", category);
  }

  for await (const product of productRelationsSeed) {
    await prisma.product.update({ where: { id: product.id }, data: product });
    console.log("product created relation", product);
  }

  for await (const cart of cartRelationsSeed) {
    await prisma.cart.update({ where: { id: cart.id }, data: cart });
    console.log("product created relation", cart);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
