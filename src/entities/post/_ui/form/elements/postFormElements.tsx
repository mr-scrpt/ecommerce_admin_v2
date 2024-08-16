"use client";
import { PostOffice } from "@/kernel/domain/post/post.type";
import { Button } from "@/shared/ui/button";
import { FormField, FormItem, FormLabel } from "@/shared/ui/form";
import { Spinner } from "@/shared/ui/icons/spinner";
import { cn } from "@/shared/ui/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, HTMLAttributes, useEffect } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { ZodTypeAny } from "zod";
import {
  PostFormDefaultValues,
  postFormDefaultSchema,
} from "../../../_domain/form.schema";
import { PostSelectElement } from "./postSelectElement";

interface PostFormElementsProps extends HTMLAttributes<HTMLFormElement> {
  postData?: PostOffice;
  handleSubmit: (data: PostFormDefaultValues) => void;
  schema?: ZodTypeAny;
}

type PostFormElementsType = FC<PostFormElementsProps> & {
  // TODO: Select settlement entities
  // FieldSettlement: FC<{
  //   settlementListToSelect: SettleToSelect[];
  //   toSearch: (q: string) => void;
  //   handleSelect?: (value: string) => void;
  // }>;
  FieldPostList: FC;
  SubmitButton: FC<{
    isPending: boolean;
    submitText: string;
    className?: string;
  }>;
};

const getDefaultValues = (postData?: PostOffice) => ({
  settlementRef: postData?.settlementRef ?? "",
  postId: postData?.id ?? "",
});

export const PostFormElements: PostFormElementsType = (props) => {
  const { postData, handleSubmit: onSubmit, schema, children } = props;

  const form = useForm<PostFormDefaultValues>({
    resolver: zodResolver(schema ?? postFormDefaultSchema),
    defaultValues: getDefaultValues(postData),
  });

  useEffect(() => {
    form.reset(getDefaultValues(postData));
  }, [postData, form]);

  const handleSubmit = form.handleSubmit(async (data) => {
    onSubmit(data);
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit} className="space-y-8">
        {children}
      </form>
    </FormProvider>
  );
};

// PostFormElements.FieldSettlement = function FieldSettlement(props) {
//   const { settlementListToSelect, toSearch, handleSelect } = props;
//   const { control } = useFormContext<PostFormDefaultValues>();
//   // TODO: Do like FieldPostList - get list in field?
//   return (
//     <FormField
//       control={control}
//       name="settlementRef"
//       render={({ field }) => (
//         <SettlementSelect
//           control={control}
//           className="w-full"
//           name="settlement"
//           citiesList={settlementListToSelect}
//           isPending={false}
//           toSearch={toSearch}
//           handleSelect={handleSelect}
//           field={field}
//         />
//       )}
//     />
//   );
// };

PostFormElements.FieldPostList = function PostList() {
  const { control } = useFormContext<PostFormDefaultValues>();
  // TODO: Like example get ref from field
  const { settlementRef } = control._formValues;
  // TODO: Fields name change "id", "settlement"?
  return (
    <FormField
      control={control}
      name="postId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Post list</FormLabel>
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

// PostFormElements.FieldName = function FieldName() {
//   const { control } = useFormContext<PostFormDefaultValues>();
//   return (
//     <FormField
//       control={control}
//       name="name"
//       render={({ field }) => (
//         <FormItem>
//           <FormLabel>Settlement Name</FormLabel>
//           <FormControl>
//             <Input placeholder="" {...field} />
//           </FormControl>
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   );
// };

// PostFormElements.FieldAddress = function FieldAddress() {
//   const { control } = useFormContext<PostFormDefaultValues>();
//   return (
//     <FormField
//       control={control}
//       name="address"
//       render={({ field }) => (
//         <FormItem>
//           <FormLabel>Street</FormLabel>
//           <FormControl>
//             <Input placeholder="" {...field} />
//           </FormControl>
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   );
// };

PostFormElements.SubmitButton = function SubmitButton({
  isPending,
  submitText,
  className,
}) {
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
