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
import {
  OrderStatusFormValues,
  OrderFormValues,
  orderFormGeneralSchema,
} from "../../_domain/order.schema";
import {
  OrderStatusGroup,
  OrderStatusEnum,
  OrderPaymentStatusEnum,
} from "../../_domain/order.types";

interface OrderFormProps extends HTMLAttributes<HTMLFormElement> {
  orderStatus: OrderStatusGroup;
  handleSubmit: (data: OrderStatusFormValues) => void;
}

type OrderFormType = FC<OrderFormProps> & {
  SubmitButton: FC<OrderSubmitFieldProps>;
  SelectStatus: FC;
};

const getDefaultValues = (orderStatus: OrderStatusGroup) => ({
  orderStatus: orderStatus.orderStatus ?? OrderStatusEnum.NEW,
  paymentStatus: orderStatus.paymentStatus ?? OrderPaymentStatusEnum.NOT_PAID,
});

export const OrderStatusFormElements: OrderFormType = (props) => {
  const { handleSubmit: onSubmit, orderStatus, children } = props;

  const form = useForm<OrderStatusFormValues>({
    resolver: zodResolver(orderFormGeneralSchema),
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
        <form onSubmit={handleSubmit} className="space-y-8">
          {children}
        </form>
      </Form>
    </FormProvider>
  );
};

interface OrderSubmitFieldProps {
  isPending?: boolean;
  submitText: string;
  className?: string;
}

OrderStatusFormElements.SubmitButton = function SubmitButton({
  isPending,
  submitText,
  className,
}: OrderSubmitFieldProps) {
  return (
    <Button type="submit" disabled={isPending} className={cn(className)}>
      {isPending && (
        <Spinner
          className="mr-2 h-4 w-4 animate-spin"
          aria-label="Profile updating..."
        />
      )}
      {submitText}
    </Button>
  );
};

OrderStatusFormElements.SelectStatus = function OrderSelectStatus() {
  const { control } = useFormContext<OrderFormValues>();
  return (
    <FormField
      control={control}
      name={"orderStatus"}
      render={({ field }) => {
        return (
          <FormItem>
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

// OrderForm.OrderSelectPayment = function OrderSelectPayment() {
//   const { control } = useFormContext<OrderFormValues>();
//   return (
//     <FormField
//       control={control}
//       name={"paymentStatus"}
//       render={({ field }) => {
//         return (
//           <FormItem>
//             <FormLabel>Payment Status</FormLabel>
//             <Select onValueChange={field.onChange} defaultValue={field.value}>
//               <FormControl>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select vatiants" />
//                 </SelectTrigger>
//               </FormControl>
//               <SelectContent>
//                 {Object.values(OrderPaymentStatusEnum).map((row) => (
//                   <SelectItem key={row} value={row}>
//                     {row}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//             <FormMessage />
//           </FormItem>
//         );
//       }}
//     />
//   );
// };
