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
import { SelectVirtualItem } from "./formField/postOfficeSelectItem";
import { ComboboxVirtual } from "@/shared/ui/combobox/comboboxVirtual";
import { ComboboxVirtual2 } from "@/shared/ui/combobox/comboboxVirtual2";

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
  FieldPickupPoint: FC<{}>;
  SubmitButton: FC<DeliverySubmitFieldProps>;
};

const getDefaultValues = (delivery: Delivery) => ({
  deliveryType: delivery.deliveryType,
  settlement: delivery.settlement,
  street: delivery.street ?? "",
  house: delivery.house ?? "",
  apartment: delivery.apartment ?? "",
  postOffice: delivery.postOffice ?? "",
  pickupPoint: delivery.pickupPoint ?? "",
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
  const { postOfficeListToSelect } = props;
  return <DeliveryTypeRadio postOfficeListToSelect={postOfficeListToSelect} />;
};

DeliveryFormElements.FieldSettlement = function FieldSettlement(props) {
  const { settlementListToSelect, toSearch, handleSelect } = props;
  const { control } = useFormContext<DeliveryFormDefaultValues>();

  // return (
  //   <FormField
  //     control={control}
  //     name="settlement"
  //     render={({ field }) => (
  //       <ComboboxVirtual
  //         control={control}
  //         className="w-full"
  //         name="settlement"
  //         citiesList={settlementListToSelect}
  //         isPending={false}
  //         toSearch={toSearch}
  //         handleSelect={handleSelect}
  //         field={field}
  //       />
  //     )}
  //   />
  // );

  return (
    <ComboboxVirtual2
      control={control}
      className="w-full"
      name="settlement"
      citiesList={settlementListToSelect}
      isPending={false}
      toSearch={toSearch}
      handleSelect={handleSelect}
      maxHeight="300px"
    />
  );
  // const options = [
  //   "test1",
  //   "test2",
  //   "test3",
  //   "test4",
  //   "test5",
  //   "test6",
  //   "test7",
  //   "test8",
  //   "test9",
  //   "test10",
  //   "test12",
  //   "test13",
  //   "test14",
  //   "test15",
  //   "test16",
  //   "test17",
  // ];
  // return <VirtualizedCombobox options={options} height="200" />;
};

DeliveryFormElements.FieldPostOffice = function FieldPostOffice(props) {
  const { postOfficeListToSelect } = props;
  const { control } = useFormContext<DeliveryFormDefaultValues>();

  // const renderItem = ({
  //   index,
  //   style,
  //   data,
  // }: ListChildComponentProps<PostOfficeToSelect[]>) => {
  //   const item = data[index];
  //   return (
  //     <SelectItem value={item.value} key={item.value} style={style}>
  //       {item.label}
  //     </SelectItem>
  //   );
  // };

  return (
    <SelectVirtual<PostOfficeToSelect>
      items={postOfficeListToSelect}
      control={control}
      name="postOffice"
      renderItem={SelectVirtualItem}
    />
  );

  // return (
  //   <PostOfficeSelect
  //     control={control}
  //     postOfficeListToSelect={postOfficeListToSelect}
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

DeliveryFormElements.FieldPickupPoint = function FieldPickupPoint() {
  const { control } = useFormContext<DeliveryFormDefaultValues>();
  return (
    <FormField
      control={control}
      name="pickupPoint"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Pickup point</FormLabel>
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
