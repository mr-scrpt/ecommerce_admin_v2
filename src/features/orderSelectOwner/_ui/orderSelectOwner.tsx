"use client";
import { UserSelect } from "@/entities/user/user";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { cn } from "@/shared/ui/utils";
import { FC, HTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import { useOrderUserListToSelectModel } from "../_vm/useOrderOwnerList.model";
import { OrderSelectOwnerFormValues } from "@/entities/order";

interface OrderFormProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  onSelectOwner: (ownerId: string) => void;
}

export const OrderSelectOwner: FC<OrderFormProps> = (props) => {
  const { className, onSelectOwner } = props;

  const { toSearch, searchValue, isPending, userList } =
    useOrderUserListToSelectModel();

  // const handleSubmit = async (data: OrderSelectOwnerValues) => {
  //   const { ownerId } = data;
  //   onSelectOwner(ownerId);
  // };

  const form = useForm<OrderSelectOwnerFormValues>();

  return (
    <div className={cn(className, "w-full")}>
      <Form {...form}>
        <form className="space-y-6">
          <FormField
            control={form.control}
            name="ownerId"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col">
                  <FormLabel>User list</FormLabel>
                  <UserSelect
                    control={form.control}
                    userList={userList}
                    toSearch={toSearch}
                    searchValue={searchValue}
                    isPending={isPending}
                    field={field}
                    handleSelect={onSelectOwner}
                  />
                  <FormDescription>Select user to add</FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          {/* <Button type="submit">Add user</Button> */}
        </form>
      </Form>
    </div>
  );
};
