import Image from "next/image";
import { FC, HTMLAttributes } from "react";
import { OrderRowRelation } from "../../_domain/orderRow/orderRow.types";

interface OrderRowItemProps extends HTMLAttributes<HTMLDivElement> {
  orderRow: OrderRowRelation;
  slotFirst: React.ReactNode;
  slotSecond: React.ReactNode;
}

export const OrderRowItem: FC<OrderRowItemProps> = (props) => {
  const { orderRow, slotFirst, slotSecond } = props;
  const { product } = orderRow;
  if (!product) {
    return null;
  }
  const { name, article, imgList, price } = product;
  const [firstImg] = imgList;
  return (
    <div key={orderRow.id} className="flex w-full flex-row border p-2">
      <div className="flex w-full flex-row">
        <div className="flex w-1/5 min-w-[180px] flex-col gap-2 border p-2">
          <div className="flex w-full justify-center">
            <div className="text-center">{name}</div>
          </div>
          <div className="flex w-full justify-center">
            <div className="text-center text-sm text-gray-400">
              Article: #{article}
            </div>
          </div>
          <div className="flex w-full justify-center">
            <Image src={firstImg} alt={name} width={120} height={120} />
          </div>
          <div className="flex w-full justify-center">Price: {price}</div>
        </div>
        <div className="flex flex-grow items-center gap-4 p-4">{slotFirst}</div>
        <div className="ml-auto flex items-center gap-4 p-4">
          {slotSecond}
          {/* <Button */}
          {/*   onClick={() => { */}
          {/*     orderRowRemove(); */}
          {/*   }} */}
          {/* > */}
          {/*   Remove */}
          {/* </Button> */}
        </div>
      </div>
    </div>
  );
};
