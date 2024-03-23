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
import { Textarea } from "@/shared/ui/textarea";
import { cn } from "@/shared/ui/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, HTMLAttributes, useCallback, useEffect } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { ProductFormValues } from "../_domain/product.schema";
import {
  ProductFromFrom,
  ProductPropertyObjectList,
  ProductPropertyToSelect,
  ProductRelation,
} from "../_domain/types";
import { generateProductFormSchema } from "../_lib/generateDynamicSchema";
import { propertyToFlatList } from "../_lib/propertyToFlatList";
import { renderFormField } from "./fromField/renderFormField";
import { ImgField as ImgFieldComponent } from "./imgField";

interface ProductFormProps extends HTMLAttributes<HTMLFormElement> {
  product?: ProductRelation;
  handleSubmit?: (data: ProductFromFrom) => void;
  propertySelectOptionList: Array<ProductPropertyToSelect>;
  propertySelectObjectActive?: ProductPropertyObjectList;
}

type ProductFormType = FC<ProductFormProps> & {
  CategoryListField: FC<PropertyFieldCategoryListProps>;
  PropertyField: FC<PropertyFieldProps>;
  NameField: FC<{}>;
  ArticleField: FC<{}>;
  PriceField: FC<{}>;
  InStockField: FC<{}>;
  DescriptionField: FC<{}>;
  AboutField: FC<{}>;
  ImgField: FC<{}>;
  SubmitButton: FC<PropertySubmitFieldProps>;
};

const getDefaultValues = (
  product?: Partial<ProductRelation>,
  propertyList?: ProductPropertyObjectList,
) => ({
  name: product?.name ?? "",
  article: product?.article ?? "",
  price: product?.price ?? 0,
  inStock: product?.inStock ?? 0,
  description: product?.description ?? "",
  about: product?.about ?? "",
  img: product?.img ?? [],
  categoryList: product?.categoryList ?? [],
  propertyList: propertyList ?? {},
});
import { DevTool } from "@hookform/devtools";

export const ProductForm: ProductFormType = (props) => {
  const {
    product,
    className,
    children,
    handleSubmit: onSubmit,
    propertySelectOptionList,
    propertySelectObjectActive,
  } = props;

  const productFormSchema = generateProductFormSchema(propertySelectOptionList);

  type ProductFormValuesCombined = z.infer<typeof productFormSchema>;

  const form = useForm<ProductFormValuesCombined>({
    resolver: zodResolver(productFormSchema),
    defaultValues: getDefaultValues(product, propertySelectObjectActive),
  });

  useEffect(() => {
    form.reset(getDefaultValues(product, propertySelectObjectActive));
  }, [propertySelectObjectActive, form, product]);

  const handleSubmit = form.handleSubmit(async (data) => {
    const propertyItemListSelected = propertyToFlatList(data.propertyList);

    // console.log("output_log: data on submit =>>>", data);
    onSubmit?.({
      name: data.name,
      article: data.article,
      price: +data.price,
      inStock: +data.inStock,
      description: data.description,
      about: data.about,
      img: data.img,
      categoryList: data.categoryList,
      propertyItemListSelected,
    });
  });
  // console.log("output_log: errors =>>>", form.formState.errors);
  // console.log("output_log: form value =>>>", form.getValues());

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={handleSubmit} className={cn(className, "w-full")}>
          {children}
          {/* <DevTool control={form.control} /> */}
        </form>
      </Form>
    </FormProvider>
  );
};

ProductForm.displayName = "ProductForm";

interface PropertyFieldCategoryListProps {
  categorySelectOptionList: Array<MultiSelectOptionItem>;
  categotySelectOptionListActive?: Array<MultiSelectOptionItem>;
  handleCategorySelectOption: (
    itemList: Array<MultiSelectOptionItem>,
  ) => Array<{ id: string; name: string }>;
}

ProductForm.CategoryListField = function CategoryListField({
  categorySelectOptionList,
  categotySelectOptionListActive,
  handleCategorySelectOption,
}: PropertyFieldCategoryListProps) {
  const form = useFormContext<ProductFormValues>();

  const handleSelectCat = useCallback((value: MultiSelectOptionItem[]) => {
    form.setValue("categoryList", handleCategorySelectOption(value));
    // handleCategorySelectOption(value);
  }, []);

  return (
    <FormField
      control={form.control}
      name="categoryList"
      render={({ field }) => {
        // console.log("output_log: field =>>>", field);
        return (
          <FormItem>
            <FormLabel>Category list</FormLabel>
            <FormControl>
              <MultiSelect
                optionList={categorySelectOptionList}
                optionActiveList={categotySelectOptionListActive}
                onSelected={handleSelectCat}
                // onSelected={(value) => {
                //   console.log("output_log: value on change =>>>", value);
                //   field.onChange(handleCategorySelectOption(value));
                // }}
                // onSelected={() => {}}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

interface PropertySubmitFieldProps {
  isPending?: boolean;
  submitText: string;
  className?: string;
}

ProductForm.SubmitButton = function SubmitButton({
  isPending,
  submitText,
  className,
}: PropertySubmitFieldProps) {
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

interface PropertyFieldProps {
  option: ProductPropertyToSelect;
  propertySelectOptionList: Array<ProductPropertyToSelect>;
}

ProductForm.PropertyField = function PropertyField({
  option,
  propertySelectOptionList,
}: PropertyFieldProps) {
  const productFormSchema = generateProductFormSchema(propertySelectOptionList);

  type ProductFormValuesCombined = z.infer<typeof productFormSchema>;

  const { control, setValue } = useFormContext<ProductFormValuesCombined>();

  return renderFormField({
    option,
    control,
    setValue,
  });
};

ProductForm.NameField = function NameField() {
  const { control } = useFormContext<ProductFormValues>();

  return (
    <FormField
      control={control}
      name="name"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input placeholder="Enter product name..." {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

ProductForm.ArticleField = function ArticleField() {
  const { control } = useFormContext<ProductFormValues>();
  return (
    <FormField
      control={control}
      name="article"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>Article</FormLabel>
          <FormControl>
            <Input placeholder="Enter product article..." {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

ProductForm.PriceField = function PriceField() {
  const { control } = useFormContext<ProductFormValues>();
  return (
    <FormField
      control={control}
      name="price"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>Price</FormLabel>
          <FormControl>
            <Input
              type="number"
              placeholder="Enter product price..."
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

ProductForm.InStockField = function InStockField() {
  const { control } = useFormContext<ProductFormValues>();
  return (
    <FormField
      control={control}
      name="inStock"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>In stock</FormLabel>
          <FormControl>
            <Input
              type="number"
              placeholder="Enter product in stock..."
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

ProductForm.DescriptionField = function DescriptionField() {
  const { control } = useFormContext<ProductFormValues>();
  return (
    <FormField
      control={control}
      name="description"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea placeholder="Enter product description..." {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

ProductForm.AboutField = function AboutField() {
  const { control } = useFormContext<ProductFormValues>();
  return (
    <FormField
      control={control}
      name="about"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>About</FormLabel>
          <FormControl>
            <Textarea placeholder="Enter product about..." {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

ProductForm.ImgField = function ImgField() {
  const { control, getValues, setValue } = useFormContext<ProductFormValues>();
  const handleDeleteImg = (path: string) => {
    const list = getValues("img");
    const result = list.filter((item) => item !== path);
    setValue("img", result);
  };
  return (
    <FormField
      control={control}
      name="img"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Avatar</FormLabel>
          <FormControl>
            <ImgFieldComponent
              value={field.value as string[]} // добавить тип string[]
              onChange={field.onChange}
              onDelete={handleDeleteImg}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
