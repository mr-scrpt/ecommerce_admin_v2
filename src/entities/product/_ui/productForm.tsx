"use client";
import { useAppearanceDelay } from "@/shared/lib/react";
import { PropertyDataTypeEnum } from "@/shared/type/propertyDataType.enum";
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
import { Checkbox } from "@/shared/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";

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
    if (option.datatype === PropertyDataTypeEnum.MULT) {
      dynamicOptionSchema[option.name] = z.array(z.string());
    } else if (option.datatype === PropertyDataTypeEnum.CHECKBOX) {
      dynamicOptionSchema[option.name] = z.array(z.string());
      // .refine((value) => value.some((item) => item));
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

  const handleSelectCat = useCallback((value: MultiSelectOptionItem[]) => {
    form.setValue("categoryList", handleCategorySelectOption(value));
  }, []);

  // const handleMultSelect = (
  //   value: MultiSelectOptionItem[],
  //   fieldName: string,
  // ) => {
  //   console.log("output_log: handleSelect =>>>", value);
  //   form.setValue(fieldName, value);
  // };
  // const handleSelectMu = useCallback((value: MultiSelectOptionItem[]) => {
  //   form.setValue("categoryList", handleCategorySelectOption(value));
  // }, []);

  console.log("output_log: form values =>>>", form.getValues());

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
                    onSelected={handleSelectCat}
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
              return (
                <FormField
                  control={form.control}
                  key={option.name}
                  name={`propertyList.${option.name}`}
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">
                          {option.name}
                        </FormLabel>
                        <FormDescription>
                          Select the items {option.name.toLowerCase()}
                        </FormDescription>
                      </div>
                      {option.propertyList.map((row) => (
                        <FormField
                          key={row.value}
                          control={form.control}
                          name={`propertyList.${option.name}`}
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={row.value}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(row.value)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            row.value,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value: string) =>
                                                value !== row.value,
                                            ),
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {row.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            }
            if (datatype === PropertyDataTypeEnum.MULT) {
              return (
                <FormField
                  control={form.control}
                  key={option.name}
                  name={`propertyList.${option.name}`}
                  render={({ field }) => {
                    console.log("output_log: field mutl =>>>", field);
                    // console.log(
                    //   "output_log:  =>>>",
                    //   option.propertyList.map((row) => ({
                    //     value: row.value,
                    //     label: row.label,
                    //   })),
                    // );
                    return (
                      <FormItem>
                        <FormLabel>{option.name}</FormLabel>
                        <FormControl>
                          <MultiSelect
                            optionList={option.propertyList.map((row) => ({
                              value: row.value,
                              label: row.label,
                            }))}
                            optionActiveList={option.propertyList.filter(
                              (row) => field.value?.includes(row.value),
                            )}
                            // optionActiveList={categotySelectOptionListActive}
                            // optionActiveList={toOptionList(field.value)}
                            onSelected={(value) => {
                              form.setValue(
                                `propertyList.${option.name}`,
                                value.map((row) => row.value),
                              );
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              );
            }
            if (datatype === PropertyDataTypeEnum.RADIO) {
              return (
                <FormField
                  control={form.control}
                  key={option.name}
                  name={`propertyList.${option.name}`}
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>{option.name}</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          {option.propertyList.map((row) => (
                            <FormItem
                              key={row.value}
                              className="flex items-center space-x-3 space-y-0"
                            >
                              <FormControl>
                                <RadioGroupItem value={row.value} />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {row.label}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
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
