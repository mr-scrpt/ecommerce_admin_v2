import { useAppearanceDelay } from "@/shared/lib/react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, HTMLAttributes, memo, useCallback, useEffect } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
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
import {
  generateDynamicSchema,
  generateProductFormSchema,
} from "../_lib/generateDynamicSchema";
import { propertyToFlatList } from "../_lib/propertyToFlatList";
import { renderFormField } from "./fromField/renderFormField";
import { ImgField as ImgFieldComponent } from "./imgField";
import { cn } from "@/shared/ui/utils";

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

// type ProductFormValuesCombined = z.infer<typeof productFormSchema>;

interface SubmitButtonProps {
  isPending: boolean;
  submitText: string;
}

interface PropertyFieldProps {
  option: ProductPropertyToSelect;
  propertySelectOptionList: Array<ProductPropertyToSelect>;
}

// interface NameFieldProps {
//   control: any;
// }

// interface DescriptionFieldProps {
//   control: any;
// }
//
// interface AboutFieldProps {
//   control: any;
// }

// interface ImgFieldProps {
//   control: any;
//   onDelete: (path: string) => void;
// }

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

type ProductFormType = FC<ProductFormProps> & {
  CategoryListField: FC<CategoryListFieldProps>;
  PropertyField: FC<PropertyFieldProps>;
  NameField: FC<{}>;
  DescriptionField: FC<{}>;
  AboutField: FC<{}>;
  ImgField: FC<{}>;
  SubmitButton: FC<SubmitButtonProps>;
};

export const ProductFormTest: ProductFormType = (props) => {
  const {
    product,
    className,
    children,
    handleSubmit: onSubmit,
    submitText,
    isPending,
    categorySelectOptionList,
    categotySelectOptionListActive,
    propertySelectOptionList,
    propertySelectObjectActive,
    handleCategorySelectOption,
  } = props;

  const productFormSchema = generateProductFormSchema(propertySelectOptionList);

  type ProductFormValuesCombined = z.infer<typeof productFormSchema>;

  const form = useForm<ProductFormValuesCombined>({
    resolver: zodResolver(productFormSchema),
    defaultValues: getDefaultValues(product, propertySelectObjectActive),
  });

  useEffect(() => {
    form.reset(getDefaultValues(product, propertySelectObjectActive));
  }, [product, propertySelectObjectActive, form]);

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

  const handleDeleteImg = (path: string) => {
    const list = form.getValues("img");
    const result = list.filter((item) => item !== path);
    form.setValue("img", result);
  };

  const isPendingAppearance = useAppearanceDelay(isPending);

  const handleSelectCat = useCallback((value: MultiSelectOptionItem[]) => {
    form.setValue("categoryList", handleCategorySelectOption(value));
  }, []);

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

ProductFormTest.displayName = "ProductForm";

interface CategoryListFieldProps {
  categorySelectOptionList: Array<MultiSelectOptionItem>;
  categotySelectOptionListActive?: Array<MultiSelectOptionItem>;
  // propertySelectOptionList: Array<ProductPropertyToSelect>;
  handleCategorySelectOption: (
    itemList: Array<MultiSelectOptionItem>,
  ) => Array<{ id: string; name: string }>;
}

ProductFormTest.CategoryListField = function CategoryListField({
  // propertySelectOptionList,
  categorySelectOptionList,
  categotySelectOptionListActive,
  handleCategorySelectOption,
}: CategoryListFieldProps) {
  // const productFormSchema = generateProductFormSchema(propertySelectOptionList);

  // type ProductFormValuesCombined = z.infer<typeof productFormSchema>;

  const form = useFormContext<ProductFormValues>();

  const handleSelectCat = useCallback((value: MultiSelectOptionItem[]) => {
    form.setValue("categoryList", handleCategorySelectOption(value));
  }, []);

  return (
    <FormField
      control={form.control}
      name="categoryList"
      render={({ field }) => (
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
      )}
    />
  );
};
interface PropertySubmitFieldProps {
  isPending: boolean;
  submitText: string;
}

ProductFormTest.SubmitButton = function SubmitButton({
  isPending,
  submitText,
}: PropertySubmitFieldProps) {
  // const form = useFormContext<ProductFormValuesCombined>();
  // const { submitText, isPendingAppearance } = form.getValues();

  return (
    <Button type="submit" disabled={isPending}>
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

ProductFormTest.PropertyField = function PropertyField({
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

ProductFormTest.NameField = function NameField() {
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

ProductFormTest.DescriptionField = function DescriptionField() {
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

ProductFormTest.AboutField = function AboutField() {
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

// interface ImgFieldProps {
//   control: any;
//   onDelete: (path: string) => void;
//   onChange: (value: string[]) => void;
//   value?: Array<string>;
// }

ProductFormTest.ImgField = function ImgField() {
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
