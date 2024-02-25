"use client";
import { OptionSelect } from "@/entities/option";
import { useAppearanceDelay } from "@/shared/lib/react";
import { OptionDataTypeEnum } from "@/shared/type/optionDataType.enum";
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
import { z } from "zod";
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
  optionSelectOptionList: Array<OptionSelect>;
  optionSelectOptionListActive?: OptionListValues;
  handleCategorySelectOption: (
    itemList: Array<MultiSelectOptionItem>,
  ) => Array<{ id: string }>;
}
type OptionListValues = {
  [key: string]: string | string[];
};
const getDefaultValues = (
  product?: ProductRelation,
  optionList?: OptionListValues,
) => ({
  name: product?.name ?? "",
  description: product?.description ?? "",
  about: product?.about ?? "",
  img: product?.img ?? [],
  categoryList: product?.categoryList ?? [],
  optionList: optionList ?? {},
});

export const ProductForm: FC<ProductFormProps> = (props) => {
  const {
    product,
    handleSubmit: onSubmit,
    submitText,
    isPending,
    categorySelectOptionList,
    categotySelectOptionListActive,
    optionSelectOptionList,
    optionSelectOptionListActive,
    handleCategorySelectOption,
  } = props;

  const dynamicOptionSchema: Record<string, z.ZodType<any, any>> = {};
  for (const option of optionSelectOptionList) {
    if (option.datatype === "mult") {
      dynamicOptionSchema[option.name] = z.array(z.string());
    } else {
      dynamicOptionSchema[option.name] = z.string();
    }
  }

  // Объединение динамически созданной схемы с исходной схемой данных
  const finalProductFormSchema = productFormSchema.extend({
    optionList: z.object(dynamicOptionSchema),
  });
  type FinalProductFormValues = z.infer<typeof finalProductFormSchema>;

  const form = useForm<FinalProductFormValues>({
    resolver: zodResolver(finalProductFormSchema),
    defaultValues: getDefaultValues(product, optionSelectOptionListActive),
  });

  useEffect(() => {
    form.reset(getDefaultValues(product));
  }, [product, form]);

  const handleSubmit = form.handleSubmit(async (data) => {
    // console.log("output_log: submit data  =>>>", data);
    // onSubmit?.(data);
  });
  console.log("output_log:  form.getValues() =>>>", form.getValues());
  // console.log("output_log:  form error=>>>", form.formState.errors);

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
        {optionSelectOptionList &&
          optionSelectOptionList.map((option) => {
            const { datatype } = option;
            if (datatype === OptionDataTypeEnum.SELECT) {
              return (
                <FormField
                  key={option.name}
                  control={form.control}
                  name={`optionList.${option.name}`}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>{option.name}</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="placeholder" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {option.optionList.map((row) => (
                              <SelectItem key={row.value} value={row.value}>
                                {row.label}
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
            }
          })}
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
