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
import { Delivery, SettleToSelect } from "../_domain/delivery.types";
import {
  DeliveryFormDefaultValues,
  deliveryFormDefaultSchema,
} from "../_domain/form.schema";
import { DeliveryTypeRadio } from "./formField/deliveryTypeRadio";
import { DeliveryCitySelect } from "./formField/deliveryCitySelect";

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
  FieldDeliveryType: FC<{}>;
  FieldCity: FC<{ settlementListToSelect: SettleToSelect[] }>;
  FieldStreet: FC<{}>;
  FieldHouse: FC<{}>;
  FieldApartment: FC<{}>;
  FieldPostOffice: FC<{}>;
  FieldPickupPoint: FC<{}>;
  SubmitButton: FC<DeliverySubmitFieldProps>;
};

const getDefaultValues = (delivery: Delivery) => ({
  deliveryType: delivery.deliveryType,
  city: delivery.city,
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

DeliveryFormElements.FieldDeliveryType = function FieldDeliveryType() {
  return <DeliveryTypeRadio />;
};

DeliveryFormElements.FieldCity = function FieldCity(props) {
  const { settlementListToSelect } = props;
  const { control } = useFormContext<DeliveryFormDefaultValues>();
  return (
    <FormField
      control={control}
      name="street"
      render={({ field }) => (
        <DeliveryCitySelect
          control={control}
          className="w-full"
          name="city"
          citiesList={settlementListToSelect}
          isPending={false}
          // handleSelect={(value: string)=>console.log(value)}
          field={field}
        />
      )}
    />
  );
  // return (
  //   <FormField
  //     control={control}
  //     name="city"
  //     render={({ field }) => (
  //       <FormItem>
  //         <FormLabel>City</FormLabel>
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

DeliveryFormElements.FieldPostOffice = function FieldPostOffice() {
  const { control } = useFormContext<DeliveryFormDefaultValues>();
  return (
    <FormField
      control={control}
      name="postOffice"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Post office</FormLabel>
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
