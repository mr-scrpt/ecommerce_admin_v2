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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, HTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ProductPropertyToSelect } from "../_domain/types";

interface ProductFormOptionsProps extends HTMLAttributes<HTMLDivElement> {
  optionSelectOptionList: Array<ProductPropertyToSelect>;
}

export const ProductFormOptions: FC<ProductFormOptionsProps> = (props) => {
  const { optionSelectOptionList } = props;

  // Dynamic construction of Zod schema
  const productFormSchema = z.object(
    Object.fromEntries(
      optionSelectOptionList.map((option) => {
        if (option.datatype === "mult") {
          return [option.name, z.array(z.string({}))];
        } else {
          return [option.name, z.string({})];
        }
      }),
    ),
  );
  // console.log("output_log: schema =>>>", productFormSchema);

  type ProductFormValues = z.infer<typeof productFormSchema>;

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
  });
  // console.log("output_log: form2 =>>>", form.getValues());

  const handleSubmit = form.handleSubmit(async (data) => {
    console.log("output_log: %%%%!!!!!!data result =>>>", data);
  });

  console.log("output_log:  form value=>>>", form.getValues());
  console.log("output_log:  form error=>>>", form.formState.errors);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-8">
        {optionSelectOptionList &&
          optionSelectOptionList.map((option) => {
            const { datatype } = option;
            if (datatype === PropertyDataTypeEnum.SELECT) {
              return (
                <FormField
                  key={option.name}
                  control={form.control}
                  name={option.name}
                  render={({ field }) => {
                    // console.log("name", option.name);
                    return (
                      <FormItem>
                        <FormLabel>{option.name}</FormLabel>
                        <Select onValueChange={field.onChange}>
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
          })}
        <Button type="submit">Send</Button>
      </form>
    </Form>
  );
};
