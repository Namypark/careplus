import "react-phone-number-input/style.css";
import PhoneInput, { type Value } from "react-phone-number-input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Control, useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { FormFieldType } from "./forms/PatientForm";
import { useState } from "react";
import { Doctor } from "@/constants";

interface customProps {
  control: Control<any>;
  fieldType: FormFieldType;
  label?: string;
  name: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  renderSkeleton?: any;
  options?: Doctor[];
  consent?: string[];
  children?: React.ReactNode;
}
const RenderField = ({ field, props }: { field: any; props: customProps }) => {
  const {
    fieldType,
    iconSrc,
    iconAlt,
    placeholder,
    showTimeSelect,
    dateFormat,
    renderSkeleton,
    options,
    consent,
    label,
  } = props;
  const [date, setDate] = useState(new Date());

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

    case FormFieldType.DATEPICKER:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400 ">
          <Image
            src={iconSrc}
            alt={iconAlt || "ICON"}
            height={24}
            width={24}
            className="ml-2 "
          />

          <FormControl>
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              showTimeSelect={showTimeSelect ?? false}
              // dateFormat={dateFormat ?? "MMMM d, yyyy"}
              timeInputLabel="Time"
              wrapperClassName="date-picker"
              placeholderText={placeholder}
            />
          </FormControl>
        </div>
      );
    case FormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;
    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={placeholder}
            className="shad-textArea "
            disabled={props.disabled}
            {...field}
          />
        </FormControl>
      );
    case FormFieldType.SELECT:
      return (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger className="shad-select-trigger">
              <SelectValue placeholder={props.placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent className="shad-select-content">
            {props.children}
          </SelectContent>
        </Select>
      );
    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
              className=" "
            />
            <label className="checkbox-label" htmlFor={props.name}>
              {label}
            </label>
          </div>
        </FormControl>
      );
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
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel className="text-dark-700">{label}</FormLabel>
          )}
          <RenderField field={field} props={props} />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomForm;
