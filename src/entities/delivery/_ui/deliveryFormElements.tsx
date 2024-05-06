"use client";
import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Spinner } from "@/shared/ui/icons/spinner";
import { Input } from "@/shared/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, HTMLAttributes, useEffect } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { ZodTypeAny } from "zod";
import { Delivery } from "../_domain/delivery.types";
import {
  DeliveryFormDefaultValues,
  deliveryFormDefaultSchema,
} from "../_domain/form.schema";
import { DeliveryTypeRadio } from "./formField/deliveryTypeRadio";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { PostOfficeToSelect } from "../_domain/postOffice.type";
import {
  SettleToSelect,
  SettlementSelect,
} from "@/shared/ui/select/settlementSelect";
import { PostOfficeSelect } from "./formField/__postOfficeSelect";
import { SelectVirtual } from "@/shared/ui/select/selectVirtual";
import { ListChildComponentProps } from "react-window";
import { PostOfficeSelectItem } from "./formField/postOfficeSelectItem";
import { ComboboxVirtualItem } from "@/shared/ui/combobox/comboboxVirtualItem";
import { ComboboxVirtualSettlementItem } from "./formField/comboboxVirtualSettlementItem";
import { ComboboxVirtual } from "@/shared/ui/combobox/comboboxVirtual";
import { SelectVirtualItem } from "@/shared/ui/select/selectVirtualItem";
import { StoreToSelect } from "@/entities/store";
import { StoreSelectItem } from "./formField/storeSelectItem";

interface DeliveryFormElementsProps extends HTMLAttributes<HTMLFormElement> {
  delivery: Delivery;
  handleSubmit: (data: DeliveryFormDefaultValues) => void;
  schema?: ZodTypeAny;
}

interface DeliverySubmitFieldProps {
  isPending?: boolean;
  submitText: string;
  className?: string;
}

type DeliveryFormElementsType = FC<DeliveryFormElementsProps> & {
  FieldDeliveryType: FC<{
    postOfficeListToSelect: PostOfficeToSelect[];
    storeListToSelect: StoreToSelect[];
  }>;

  FieldSettlement: FC<{
    settlementListToSelect: SettleToSelect[];
    toSearch: (q: string) => void;
    handleSelect?: (value: string) => void;
  }>;
  FieldStreet: FC<{}>;
  FieldHouse: FC<{}>;
  FieldApartment: FC<{}>;
  FieldPostOffice: FC<{
    postOfficeListToSelect: PostOfficeToSelect[];
  }>;
  FieldPickupPoint: FC<{
    storeListToSelect: StoreToSelect[];
  }>;
  SubmitButton: FC<DeliverySubmitFieldProps>;
};

const getDefaultValues = (delivery: Delivery) => ({
  deliveryType: delivery.deliveryType,
  settlement: delivery.settlement,
  pickupPoint: delivery.pickupPoint ?? "",
  street: delivery.street ?? "",
  house: delivery.house ?? "",
  apartment: delivery.apartment ?? "",
  postOffice: delivery.postOffice ?? "",
});

export const DeliveryFormElements: DeliveryFormElementsType = (props) => {
  const { delivery, handleSubmit: onSubmit, schema, children } = props;

  const form = useForm<DeliveryFormDefaultValues>({
    resolver: zodResolver(schema ?? deliveryFormDefaultSchema),
    defaultValues: getDefaultValues(delivery),
  });

  useEffect(() => {
    form.reset(getDefaultValues(delivery));
  }, [delivery, form]);

  const handleSubmit = form.handleSubmit(async (data) => {
    onSubmit(data);
  });

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={handleSubmit} className="w-full space-y-8">
          {children}
        </form>
      </Form>
    </FormProvider>
  );
};

DeliveryFormElements.FieldDeliveryType = function FieldDeliveryType(props) {
  const { postOfficeListToSelect, storeListToSelect } = props;
  return (
    <DeliveryTypeRadio
      postOfficeListToSelect={postOfficeListToSelect}
      storeListToSelect={storeListToSelect}
    />
  );
};

DeliveryFormElements.FieldSettlement = function FieldSettlement(props) {
  const { settlementListToSelect, toSearch, handleSelect } = props;
  const { control } = useFormContext<DeliveryFormDefaultValues>();

  return (
    <ComboboxVirtual
      control={control}
      className="w-full"
      name="settlement"
      itemList={settlementListToSelect}
      toSearch={toSearch}
      placeholder="Select settlement"
      handleSelect={handleSelect}
      maxHeight="300px"
      renderItem={ComboboxVirtualSettlementItem}
    />
  );
};

DeliveryFormElements.FieldPostOffice = function FieldPostOffice(props) {
  const { postOfficeListToSelect } = props;
  const { control } = useFormContext<DeliveryFormDefaultValues>();

  // return (
  //   <ComboboxVirtual
  //     control={control}
  //     className="w-full"
  //     name="postOffice"
  //     itemList={postOfficeListToSelect}
  //     toSearch={() => {}}
  //     placeholder="Select settlement"
  //     handleSelect={() => {}}
  //     maxHeight="300px"
  //     renderItem={PostOfficeSelectItem}
  //   />
  // );

  return (
    <SelectVirtual
      itemList={postOfficeListToSelect}
      control={control}
      name="postOffice"
      renderItem={PostOfficeSelectItem}
    />
  );
};

DeliveryFormElements.FieldPickupPoint = function FieldPickupPoint(props) {
  const { storeListToSelect } = props;
  const { control } = useFormContext<DeliveryFormDefaultValues>();
  console.log(
    "output_log: in field store list to select =>>>",
    storeListToSelect,
  );
  // return <div>1</div>;

  return (
    <SelectVirtual
      itemList={storeListToSelect}
      control={control}
      name="postOffice"
      renderItem={StoreSelectItem}
    />
  );
  // return (
  //   <FormField
  //     control={control}
  //     name="pickupPoint"
  //     render={({ field }) => (
  //       <FormItem>
  //         <FormLabel>Pickup point</FormLabel>
  //         <FormControl>
  //           <Input placeholder="" {...field} />
  //         </FormControl>
  //         <FormMessage />
  //       </FormItem>
  //     )}
  //   />
  // );
};

DeliveryFormElements.FieldStreet = function FieldStreet() {
  const { control } = useFormContext<DeliveryFormDefaultValues>();
  return (
    <FormField
      control={control}
      name="street"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Street</FormLabel>
          <FormControl>
            <Input placeholder="" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

DeliveryFormElements.FieldHouse = function FieldHouse() {
  const { control } = useFormContext<DeliveryFormDefaultValues>();
  return (
    <FormField
      control={control}
      name="house"
      render={({ field }) => (
        <FormItem>
          <FormLabel>House</FormLabel>
          <FormControl>
            <Input placeholder="" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

DeliveryFormElements.FieldApartment = function FieldApartment() {
  const { control } = useFormContext<DeliveryFormDefaultValues>();
  return (
    <FormField
      control={control}
      name="apartment"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Apartment</FormLabel>
          <FormControl>
            <Input placeholder="" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

DeliveryFormElements.SubmitButton = function SubmitButton(props) {
  const { isPending, submitText } = props;
  return (
    <Button type="submit" disabled={isPending}>
      {isPending && (
        <Spinner
          className="mr-2 h-4 w-4 animate-spin"
          aria-label="Delivery updating..."
        />
      )}
      {submitText}
    </Button>
  );
};
