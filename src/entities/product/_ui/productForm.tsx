"use client";
import { OptionSelect } from "@/entities/option";
import { useAppearanceDelay } from "@/shared/lib/react";
import { OptionDataTypeEnum } from "@/shared/type/optionDataType.enum";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
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
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
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
  optionSelectOptionList: Array<OptionSelect>;
  // optionSelectOptionListActive?: Array<OptionSelect>;
  handleCategorySelectOption: (
    itemList: Array<MultiSelectOptionItem>,
  ) => Array<{ id: string }>;
}

const getDefaultValues = (
  product?: ProductRelation,
  // optionList?: Array<OptionSelect>,
) => ({
  name: product?.name ?? "",
  description: product?.description ?? "",
  about: product?.about ?? "",
  img: product?.img ?? [],
  categoryList: product?.categoryList ?? [],
  // optionList: optionList ?? [],
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
    handleCategorySelectOption,
  } = props;

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: getDefaultValues(product),
  });

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
        {optionSelectOptionList &&
          optionSelectOptionList.map((item) => {
            const { datatype } = item;
            if (datatype === OptionDataTypeEnum.SELECT) {
              return (
                <FormField
                  key={item.name}
                  control={form.control}
                  name="optionList"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{item.name}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        // defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="placeholder" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {item.optionList.map((item) => (
                            <SelectItem key={item.value} value="m@example.com">
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        You can manage email addresses in your
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            }
            if (datatype === OptionDataTypeEnum.MULT) {
              return (
                <FormField
                  key={item.name}
                  control={form.control}
                  name="optionList"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{item.name}</FormLabel>
                      <FormControl>
                        <MultiSelect
                          optionList={item.optionList}
                          optionActiveList={[]}
                          onSelected={() => {}}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            }
            if (datatype === OptionDataTypeEnum.RADIO) {
              return (
                <FormField
                  key={item.name}
                  control={form.control}
                  name="optionList"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{item.name}</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          // defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          {item.optionList.map((item) => (
                            <FormItem
                              key={item.value}
                              className="flex items-center space-x-3 space-y-0"
                            >
                              <FormControl>
                                <RadioGroupItem value={item.value} />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item.label}
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
            if (datatype === OptionDataTypeEnum.CHECKBOX) {
              return (
                <FormField
                  key={item.name}
                  control={form.control}
                  name="optionList"
                  render={({ field }) => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">{item.name}</FormLabel>
                        <FormDescription>
                          Select the items you want to display in the sidebar.
                        </FormDescription>
                      </div>
                      {item.optionList.map((item) => (
                        <FormField
                          key={item.value}
                          control={form.control}
                          name="optionList"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.value}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                  // checked={field.value?.includes(item.value)}
                                  // onCheckedChange={(checked) => {
                                  //   return checked
                                  //     ? field.onChange([
                                  //         ...field.value,
                                  //         item.id,
                                  //       ])
                                  //     : field.onChange(
                                  //         field.value?.filter(
                                  //           (value) => value !== item.id,
                                  //         ),
                                  //       );
                                  // }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {item.label}
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
};
