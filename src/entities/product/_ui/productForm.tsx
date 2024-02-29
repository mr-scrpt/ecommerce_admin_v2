"use client";
import { useAppearanceDelay } from "@/shared/lib/react";
import { PropertyDataTypeEnum } from "@/shared/type/propertyDataType.enum";
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
import { FC, HTMLAttributes, memo, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  ProductFormValues,
  productFormSchema,
} from "../_domain/product.schema";
import {
  ProductPropertyObjectList,
  ProductPropertyToSelect,
  ProductRelation,
} from "../_domain/types";
import { ImgField } from "./imgField";
import { useOptionListTransform } from "@/shared/lib/map";

interface ProductFormProps extends HTMLAttributes<HTMLFormElement> {
  product?: ProductRelation;
  handleSubmit?: (data: ProductFormValues) => void;
  isPending: boolean;
  submitText?: string;
  categorySelectOptionList: Array<MultiSelectOptionItem>;
  categotySelectOptionListActive?: Array<MultiSelectOptionItem>;
  propertySelectOptionList: Array<ProductPropertyToSelect>;
  propertySelectObjectActive?: ProductPropertyObjectList;
  handleCategorySelectOption: (
    itemList: Array<MultiSelectOptionItem>,
  ) => Array<{ id: string; name: string }>;
}

const getDefaultValues = (
  product?: ProductRelation,
  propertyList?: ProductPropertyObjectList,
) => ({
  name: product?.name ?? "",
  description: product?.description ?? "",
  about: product?.about ?? "",
  img: product?.img ?? [],
  categoryList: product?.categoryList ?? [],
  propertyList: propertyList ?? {},
});

export const ProductForm: FC<ProductFormProps> = memo((props) => {
  const {
    product,
    handleSubmit: onSubmit,
    submitText,
    isPending,
    categorySelectOptionList,
    categotySelectOptionListActive,
    propertySelectOptionList,
    propertySelectObjectActive,
    handleCategorySelectOption,
  } = props;

  const dynamicOptionSchema: Record<string, z.ZodType<any, any>> = {};

  for (const option of propertySelectOptionList) {
    if (option.datatype === "mult" || option.datatype === "checkbox") {
      dynamicOptionSchema[option.name] = z.array(z.string());
    } else {
      dynamicOptionSchema[option.name] = z.string();
    }
  }

  const finalProductFormSchema = productFormSchema.extend({
    propertyList: z.object(dynamicOptionSchema),
  });

  type FinalProductFormValues = z.infer<typeof finalProductFormSchema>;

  const form = useForm<FinalProductFormValues>({
    resolver: zodResolver(finalProductFormSchema),
    defaultValues: getDefaultValues(product, propertySelectObjectActive),
  });

  const { toOptionList } = useOptionListTransform();

  useEffect(() => {
    form.reset(getDefaultValues(product, propertySelectObjectActive));
  }, [product, propertySelectObjectActive, form]);

  const handleSubmit = form.handleSubmit(async (data) => {
    // onSubmit?.(data);
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

  console.log("output_log:  =>>>", form.getValues());

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
                    // optionActiveList={toOptionList(field.value)}
                    onSelected={handleSelect}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        {propertySelectOptionList &&
          propertySelectOptionList.map((option) => {
            const { datatype } = option;
            if (datatype === PropertyDataTypeEnum.SELECT) {
              return (
                <FormField
                  key={option.name}
                  control={form.control}
                  name={`propertyList.${option.name}`}
                  render={({ field }) => {
                    console.log("output_log: field =>>>", field);
                    console.log("output_log: value default =>>>", field.value);
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
                            {option.propertyList.map((row) => (
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
            if (datatype === PropertyDataTypeEnum.CHECKBOX) {
              return "Checkbox";
            }
            if (datatype === PropertyDataTypeEnum.MULT) {
              return "MULT";
            }
            if (datatype === PropertyDataTypeEnum.RADIO) {
              return "RADIO";
            }
          })}
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
});

ProductForm.displayName = "ProductForm";
