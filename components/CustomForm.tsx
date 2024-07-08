import "react-phone-number-input/style.css";
import PhoneInput, { type Value } from "react-phone-number-input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Control, useForm } from "react-hook-form";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { FormFieldType } from "./forms/PatientForm";
import { useState } from "react";

interface customProps {
  control: Control<any>;
  fieldType: FormFieldType;
  label?: string;
  name: string;
  placeholder?: string;
  iconSrc?: string | StaticImport;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
}
const RenderField = ({ field, props }: { field: any; props: customProps }) => {
  const { fieldType, iconSrc, iconAlt, placeholder } = props;

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400 ">
          {props.iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || "ICON"}
              height={24}
              width={24}
              className="ml-2 "
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            value={field.value as Value}
            onChange={field.onChange}
            defaultCountry="NG"
            placeholder={placeholder}
            className="input-phone "
            international
            withCountryCallingCode
          />
        </FormControl>
      );

    default:
      break;
  }
};

const CustomForm = (props: customProps) => {
  const { control, fieldType, label, iconSrc, name } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}
          <RenderField field={field} props={props} />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomForm;
