"use client";
import { UserSelect } from "@/entities/user";
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
import { useConsumerListSearchToSelectModel } from "../_vm/useConsumerListSearch.model";
import { ConsumerSelectFormValues } from "../_domain/form.schema";

interface ConsumerSelectFormProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  onSelectOwner: (ownerId: string) => void;
}

export const ConsumerSelect: FC<ConsumerSelectFormProps> = (props) => {
  const { className, onSelectOwner } = props;

  const { toSearch, searchValue, isPending, userList } =
    useConsumerListSearchToSelectModel();

  const form = useForm<ConsumerSelectFormValues>();

  return (
    <div className={cn(className, "w-full")}>
      <Form {...form}>
        <form className="space-y-6">
          <FormField
            control={form.control}
            name="id"
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
        </form>
      </Form>
    </div>
  );
};
