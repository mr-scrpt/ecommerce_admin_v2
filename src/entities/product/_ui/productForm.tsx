"use client";
import { useAppearanceDelay } from "@/shared/lib/react";
import { OptionDataTypeEnum } from "@/shared/type/optionDataType.enum";
import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Spinner } from "@/shared/ui/icons/spinner";
import { Input } from "@/shared/ui/input";
import { MultiSelect, MultiSelectOptionItem } from "@/shared/ui/multiSelect";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Textarea } from "@/shared/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, HTMLAttributes, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  ProductFormValues,
  productFormSchema,
} from "../_domain/product.schema";
import { ProductRelation } from "../_domain/types";
import { ImgField } from "./imgField";

interface ProductFormProps extends HTMLAttributes<HTMLFormElement> {
  product?: ProductRelation;
  handleSubmit?: (data: ProductFormValues) => void;
  isPending: boolean;
  submitText?: string;
  categorySelectOptionList: Array<MultiSelectOptionItem>;
  categotySelectOptionListActive?: Array<MultiSelectOptionItem>;
  // optionSelectOptionList: Array<OptionSelect>;
  // optionSelectOptionListActive?: Array<OptionSelect>;
  handleCategorySelectOption: (
    itemList: Array<MultiSelectOptionItem>,
  ) => Array<{ id: string }>;
}
const getDefaultValues = (product?: ProductRelation) => ({
  name: product?.name ?? "",
  description: product?.description ?? "",
  about: product?.about ?? "",
  img: product?.img ?? [],
  categoryList: product?.categoryList ?? [],
});

// const createSchemaFromDatatype = (datatype: OptionDataTypeEnum) => {
//   switch (datatype) {
//     case "radio":
//     case "select":
//       return z.object({
//         id: z.string(),
//       });
//     case "mult":
//       return z.array(z.object({ id: z.string() }));
//     default:
//       return z.object({});
//   }
// };

// Преобразование optionSelectOptionList в объект схемы Zod
// const createSchemaFromOptions = (options: Array<OptionSelect>) => {
//   const schemaArray = options.map((option) => {
//     return z.object({
//       [option.name]: createSchemaFromDatatype(option.datatype),
//     });
//   });
//
//   return z.object(Object.assign({}, ...schemaArray));
// };

export const ProductForm: FC<ProductFormProps> = (props) => {
  const {
    product,
    handleSubmit: onSubmit,
    submitText,
    isPending,
    categorySelectOptionList,
    categotySelectOptionListActive,
    // optionSelectOptionList,
    handleCategorySelectOption,
  } = props;

  // const createSchemaFromDatatype = (datatype: OptionDataTypeEnum) => {
  //   switch (datatype) {
  //     case "radio":
  //     case "select":
  //       return z.object({
  //         id: z.string(),
  //       });
  //     case "mult":
  //       return z.array(z.object({ id: z.string() }));
  //     default:
  //       return z.object({});
  //   }
  // };
  //   const createSchemaFromOptions = (options: Array<OptionSelect>) => {
  //     const schemaObject: { [key: string]: z.ZodType<any> } = {};
  //
  //     options.forEach((option) => {
  //       schemaObject[option.name] = createSchemaFromDatatype(option.datatype);
  //     });
  //
  //     return z.object(schemaObject);
  //   };
  //
  //   const optionSchema = createSchemaFromOptions(optionSelectOptionList);
  //
  //   const combinedSchema = productFormSchema.merge(optionSchema);
  //
  //   const productFormSchemaWithDynamicOptions = combinedSchema;
  //
  //   type ProductFormValues = z.infer<typeof productFormSchemaWithDynamicOptions>;

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: getDefaultValues(product),
  });
  // console.log("output_log: form =>>>", form.getValues());

  useEffect(() => {
    form.reset(getDefaultValues(product));
  }, [product, form]);

  const handleSubmit = form.handleSubmit(async (data) => {
    onSubmit?.(data);
  });

  const handleDeleteimg = (path: string) => {
    const list = form.getValues("img");
    const result = list.filter((item) => item !== path);
    form.setValue("img", result);
  };

  const isPendingAppearance = useAppearanceDelay(isPending);

  const handleSelect = useCallback((value: MultiSelectOptionItem[]) => {
    form.setValue("categoryList", handleCategorySelectOption(value));
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="categoryList"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Category list</FormLabel>
                <FormControl>
                  <MultiSelect
                    optionList={categorySelectOptionList}
                    optionActiveList={categotySelectOptionListActive}
                    onSelected={handleSelect}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        {/* {optionSelectOptionList && */}
        {/*   optionSelectOptionList.map((option) => { */}
        {/*     const { datatype } = option; */}
        {/*     if (datatype === OptionDataTypeEnum.SELECT) { */}
        {/*       return ( */}
        {/*         <FormField */}
        {/*           key={option.name} */}
        {/*           control={form.control} */}
        {/*           name={option.name} */}
        {/*           render={({ field }) => { */}
        {/*             console.log("name", option.name); */}
        {/*             return ( */}
        {/*               <FormItem> */}
        {/*                 <FormLabel>{option.name}</FormLabel> */}
        {/*                 <Select onValueChange={field.onChange}> */}
        {/*                   <FormControl> */}
        {/*                     <SelectTrigger> */}
        {/*                       <SelectValue placeholder="placeholder" /> */}
        {/*                     </SelectTrigger> */}
        {/*                   </FormControl> */}
        {/*                   <SelectContent> */}
        {/*                     {option.optionList.map((row) => ( */}
        {/*                       <SelectItem key={row.value} value={row.value}> */}
        {/*                         {row.label} */}
        {/*                       </SelectItem> */}
        {/*                     ))} */}
        {/*                   </SelectContent> */}
        {/*                 </Select> */}
        {/*                 <FormDescription> */}
        {/*                   You can manage email addresses in your */}
        {/*                 </FormDescription> */}
        {/*                 <FormMessage /> */}
        {/*               </FormItem> */}
        {/*             ); */}
        {/*           }} */}
        {/*         /> */}
        {/*       ); */}
        {/*     } */}
        {/*   })} */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter product name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter product description..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormLabel>About</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter product about..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="img"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar</FormLabel>
              <FormControl>
                <ImgField
                  value={field.value}
                  onChange={field.onChange}
                  onDelete={handleDeleteimg}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPendingAppearance}>
          {isPendingAppearance && (
            <Spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-label="Profile updating..."
            />
          )}
          {submitText}
        </Button>
      </form>
    </Form>
  );
};
