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
  ProductFromFrom,
  ProductPropertyObjectList,
  ProductPropertyToSelect,
  ProductRelation,
} from "../_domain/types";
import { ImgField } from "./imgField";
import { useOptionListTransform } from "@/shared/lib/map";
import { Checkbox } from "@/shared/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import { ProductChechbox } from "./fromField/productChechbox";
import { ProductRadio } from "./fromField/productRadio";
import { ProductSelect } from "./fromField/productSelect";
import { ProductMult } from "./fromField/productMult";

interface ProductFormProps extends HTMLAttributes<HTMLFormElement> {
  product?: ProductRelation;
  handleSubmit?: (data: ProductFromFrom) => void;
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
    const propertyItemListSelected = Object.entries(data.propertyList).flatMap(
      ([_, value]) => {
        if (Array.isArray(value)) {
          return value.map((item) => ({ id: item }));
        }
        return { id: value };
      },
    );

    const res = {
      name: data.name,
      description: data.description,
      about: data.about,
      img: data.img,
      categoryList: data.categoryList,
      propertyItemListSelected,
    };
    onSubmit?.(res);
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
                <ProductSelect
                  key={option.name}
                  name={option.name}
                  propertyList={option.propertyList}
                  control={form.control}
                />
              );
            }
            if (datatype === PropertyDataTypeEnum.CHECKBOX) {
              return (
                <ProductChechbox
                  key={option.name}
                  name={option.name}
                  propertyList={option.propertyList}
                  control={form.control}
                />
              );
            }
            if (datatype === PropertyDataTypeEnum.MULT) {
              return (
                <ProductMult
                  key={option.name}
                  name={option.name}
                  propertyList={option.propertyList}
                  control={form.control}
                  setValue={form.setValue}
                />
              );
            }
            if (datatype === PropertyDataTypeEnum.RADIO) {
              return (
                <ProductRadio
                  key={option.name}
                  name={option.name}
                  propertyList={option.propertyList}
                  control={form.control}
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
