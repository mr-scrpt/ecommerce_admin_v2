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
  description: product?.description ?? "",
  about: product?.about ?? "",
  img: product?.img ?? [],
  categoryList: product?.categoryList ?? [],
  propertyList: propertyList ?? {},
});

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
  console.log("output_log:  product =>>>", product);

  type ProductFormValuesCombined = z.infer<typeof productFormSchema>;

  const form = useForm<ProductFormValuesCombined>({
    resolver: zodResolver(productFormSchema),
    defaultValues: getDefaultValues(product, propertySelectObjectActive),
    // defaultValues: getDefaultValues(
    //   {
    //     id: product?.id ?? "",
    //     name: product?.name ?? "",
    //     description: product?.description ?? "",
    //     about: product?.about ?? "",
    //     img: product?.img ?? [],
    //     slug: product?.slug ?? "",
    //     categoryLit: product?.categoryList ?? [],
    //     propertyItemListSelected: product?.propertyItemListSelected ?? [],
    //   },
    // propertySelectObjectActive,
    // ),
  });
  // console.log("output_log: product =>>>", product);

  useEffect(() => {
    form.reset(getDefaultValues(product, propertySelectObjectActive));
  }, [propertySelectObjectActive, form, product]);

  const handleSubmit = form.handleSubmit(async (data) => {
    const propertyItemListSelected = propertyToFlatList(data.propertyList);

    onSubmit?.({
      name: data.name,
      description: data.description,
      about: data.about,
      img: data.img,
      categoryList: data.categoryList,
      propertyItemListSelected,
    });
  });

  console.log("outsut_log: value in form =>>>", form.getValues());
  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={handleSubmit} className={cn(className, "w-full")}>
          {children}
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
    console.log("output_log: CHANGE =>>>");
    // form.setValue("categoryList", handleCategorySelectOption(value));
    handleCategorySelectOption(value);
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
  // console.log("output_log: getValues img =>>>", getValues("img"));
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
