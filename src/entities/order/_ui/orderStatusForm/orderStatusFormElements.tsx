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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { cn } from "@/shared/ui/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, HTMLAttributes, useEffect } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { OrderStatusGroup } from "../../_domain/order.types";
import {
  OrderStatusFormValues,
  orderStatusFormSchema,
} from "../../_domain/form.schema";
import {
  OrderPaymentStatusEnum,
  OrderStatusEnum,
} from "@/kernel/domain/order/order.type";

interface OrderFormProps extends HTMLAttributes<HTMLFormElement> {
  orderStatus: OrderStatusGroup;
  handleSubmit: (data: OrderStatusFormValues) => void;
}

interface OrderSubmitFieldProps {
  isPending?: boolean;
  submitText: string;
  className?: string;
}

type OrderFormType = FC<OrderFormProps> & {
  SubmitButton: FC<OrderSubmitFieldProps>;
  SelectStatus: FC<HTMLAttributes<HTMLDivElement>>;
  SelectPayment: FC<HTMLAttributes<HTMLDivElement>>;
};

const getDefaultValues = (orderStatus: OrderStatusGroup) => ({
  orderStatus: orderStatus.orderStatus ?? OrderStatusEnum.NEW,
  paymentStatus: orderStatus.paymentStatus ?? OrderPaymentStatusEnum.NOT_PAID,
});

export const OrderStatusFormElements: OrderFormType = (props) => {
  const { handleSubmit: onSubmit, orderStatus, children, className } = props;

  const form = useForm<OrderStatusFormValues>({
    resolver: zodResolver(orderStatusFormSchema),
    defaultValues: getDefaultValues(orderStatus),
  });

  useEffect(() => {
    form.reset(getDefaultValues(orderStatus));
  }, [orderStatus, form]);

  const handleSubmit = form.handleSubmit(async (data) => {
    onSubmit?.(data);
  });

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form
          action={() => handleSubmit}
          className={cn(className, "space-y-4")}
        >
          {children}
        </form>
      </Form>
    </FormProvider>
  );
};

OrderStatusFormElements.SubmitButton = function SubmitButton(props) {
  const { isPending, submitText, className } = props;
  return (
    <Button type="submit" disabled={isPending} className={cn(className)}>
      {isPending && (
        <Spinner
          className="mr-2 h-4 w-4 animate-spin"
          aria-label="Order updating..."
        />
      )}
      {submitText}
    </Button>
  );
};

OrderStatusFormElements.SelectStatus = function OrderSelectStatus(props) {
  const { className } = props;
  const { control } = useFormContext<OrderStatusFormValues>();
  return (
    <FormField
      control={control}
      name={"orderStatus"}
      render={({ field }) => {
        return (
          <FormItem className={cn("flex flex-col", className)}>
            <FormLabel>Order Status</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select vatiants" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Object.values(OrderStatusEnum).map((row) => (
                  <SelectItem key={row} value={row}>
                    {row}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

OrderStatusFormElements.SelectPayment = function OrderSelectPayment(props) {
  const { className } = props;
  const { control } = useFormContext<OrderStatusFormValues>();
  return (
    <FormField
      control={control}
      name={"paymentStatus"}
      render={({ field }) => {
        return (
          <FormItem className={cn("flex flex-col", className)}>
            <FormLabel>Payment Status</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select vatiants" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Object.values(OrderPaymentStatusEnum).map((row) => (
                  <SelectItem key={row} value={row}>
                    {row}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
