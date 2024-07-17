import { AddressSelectElement } from "@/entities/address";
import { DeliveryFormElements } from "@/entities/delivery";
import { PostSelectElement } from "@/entities/post/_ui/form/elements/postSelectElement";
import { SettlementSelectElement } from "@/entities/settlement";
import { StoreSelectElement } from "@/entities/store";
import { AddressCreateProps } from "@/kernel/domain/address/ui.type";
import { Delivery } from "@/kernel/domain/delivery/delivery.type";
import { Button } from "@/shared/ui/button";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/shared/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, HTMLAttributes, useEffect } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { ZodTypeAny } from "zod";
import {
  DeliveryUpdateFormValues,
  deliveryUpdateFormSchema,
} from "../../../_domain/form.schema";
import { DeliveryTypeField } from "../fields/deliveryTypeField";
import { ReceiverSelectElement } from "@/entities/receiver";
import { ReceiverCreateProps } from "@/kernel/domain/receiver/ui.type";

export interface DeliveryFormElementsProps
  extends HTMLAttributes<HTMLFormElement> {
  delivery: Delivery;
  handleSubmit: (data: DeliveryUpdateFormValues) => void;
  addressAddModal: (props: AddressCreateProps) => void;
  receiverAddModal: (props: ReceiverCreateProps) => void;
  schema?: ZodTypeAny;
}

export interface DeliveryFormElementsFields {
  FieldDeliveryType: FC;
  FieldSettlementSelect: FC;

  FieldPostSelect: FC;

  FieldStoreSelect: FC;
  FieldReceiverSelect: FC;

  FieldAddress: FC;

  SubmitButton: FC<DeliverySubmitFieldProps>;
}

interface IDeliveryFormElements
  extends FC<DeliveryFormElementsProps>,
    DeliveryFormElementsFields {}

const getDefaultValues = (
  delivery: Delivery & {
    addressAddModal: (props: AddressCreateProps) => void;
    receiverAddModal: (props: ReceiverCreateProps) => void;
  },
) => ({
  deliveryType: delivery.deliveryType,
  settlementRef: delivery.settlementRef ?? "",
  postOffice: delivery.postOffice ?? "",
  userId: delivery.userId,
  addressId: delivery.addressId ?? "",
  storeId: delivery.storeId ?? "",
  receiverId: delivery.receiverId,
  addressAddModal: delivery.addressAddModal,
  receiverAddModal: delivery.receiverAddModal,
});

interface DeliveryUpdateFormValuesExtends extends DeliveryUpdateFormValues {
  addressAddModal: (props: AddressCreateProps) => void;
  receiverAddModal: (props: ReceiverCreateProps) => void;
}

export const DeliveryUpdateFormElements: IDeliveryFormElements = (props) => {
  const {
    delivery,
    handleSubmit: onSubmit,
    children,
    addressAddModal,
    receiverAddModal,
  } = props;

  const form = useForm<DeliveryUpdateFormValuesExtends>({
    resolver: zodResolver(deliveryUpdateFormSchema),
    defaultValues: getDefaultValues({
      ...delivery,
      addressAddModal,
      receiverAddModal,
    }),
  });

  useEffect(() => {
    form.reset(
      getDefaultValues({
        ...delivery,
        addressAddModal,
        receiverAddModal,
      }),
    );
  }, [delivery, form, addressAddModal, receiverAddModal]);

  const handleSubmit = form.handleSubmit(async (data) => {
    onSubmit?.(data);
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

DeliveryUpdateFormElements.FieldDeliveryType = function FieldDeliveryType() {
  const { getValues, control } = useFormContext<DeliveryUpdateFormValues>();
  const { settlementRef } = getValues();

  return (
    <FormField
      control={control}
      name="deliveryType"
      render={({ field }) => {
        return (
          <FormItem className="space-y-3">
            <FormLabel>Delivery type</FormLabel>
            <DeliveryTypeField
              settlementRef={settlementRef}
              deliveryType={field.value}
              onChangeDeliveryType={field.onChange}
            />
          </FormItem>
        );
      }}
    />
  );
};

DeliveryUpdateFormElements.FieldSettlementSelect =
  function FieldSettlementSelect() {
    const { control, resetField } = useFormContext<DeliveryUpdateFormValues>();
    return (
      <FormField
        control={control}
        name="settlementRef"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Select settlement</FormLabel>
            <SettlementSelectElement
              settlementActive={field.value}
              onSelectSettlement={(v) => {
                resetField("settlementRef");
                field.onChange(v);
              }}
            />
          </FormItem>
        )}
      />
    );
  };

DeliveryUpdateFormElements.FieldPostSelect = function FieldPostSelect() {
  const { control, getValues } = useFormContext<DeliveryUpdateFormValues>();
  const { settlementRef } = getValues();
  return (
    <FormField
      control={control}
      name="postOffice"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Select post</FormLabel>
          <PostSelectElement
            onSelectPost={field.onChange}
            settlementRef={settlementRef}
            postInit={field.value}
          />
        </FormItem>
      )}
    />
  );
};

DeliveryUpdateFormElements.FieldStoreSelect = function FieldStoreSelect() {
  const { control, getValues } = useFormContext<DeliveryUpdateFormValues>();
  const { settlementRef } = getValues();
  return (
    <FormField
      control={control}
      name="storeId"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Select settlement</FormLabel>
          <StoreSelectElement
            onSelectStore={field.onChange}
            settlementRef={settlementRef}
            storeInit={field.value}
          />
        </FormItem>
      )}
    />
  );
};

DeliveryUpdateFormElements.FieldAddress = function FieldAddressSelect() {
  const { control, getValues } =
    useFormContext<DeliveryUpdateFormValuesExtends>();

  const { userId, settlementRef, addressAddModal } = getValues();

  return (
    <FormField
      control={control}
      name="addressId"
      render={({ field }) => (
        <FormItem className="flex flex-col gap-2">
          <FormLabel>Select settlement</FormLabel>

          <div className="flex items-center space-x-2">
            <AddressSelectElement
              onSelectAddress={field.onChange}
              userId={userId}
              settlementRef={settlementRef}
              addressInit={field.value}
            />
            <Button
              type="button"
              onClick={() => addressAddModal({ userId, settlementRef })}
            >
              Add Address
            </Button>
          </div>
        </FormItem>
      )}
    />
  );
};

DeliveryUpdateFormElements.FieldReceiverSelect =
  function FieldReceiverSelect() {
    const { control, getValues } =
      useFormContext<DeliveryUpdateFormValuesExtends>();
    const { userId, receiverAddModal } = getValues();
    return (
      <FormField
        control={control}
        name="receiverId"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Select receiver</FormLabel>
            <div className="flex items-center space-x-2">
              <ReceiverSelectElement
                onSelectReceiver={field.onChange}
                receiverInit={field.value}
                userId={userId}
              />
              <Button
                type="button"
                onClick={() => receiverAddModal({ userId })}
              >
                Add Receiver
              </Button>
            </div>
          </FormItem>
        )}
      />
    );
  };

interface DeliverySubmitFieldProps {
  isPending?: boolean;
  submitText: string;
  className?: string;
}

DeliveryUpdateFormElements.SubmitButton = DeliveryFormElements.SubmitButton;
