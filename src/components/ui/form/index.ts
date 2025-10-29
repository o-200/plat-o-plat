import { z } from "zod";

export interface FormFieldProps {
  name: string;
  label: string;
  type?:
    | "text"
    | "email"
    | "password"
    | "tel"
    | "textarea"
    | "checkbox"
    | "radio"
    | "select";
  placeholder?: string;
  defaultValue?: string | boolean;
  validation?: z.ZodType<any>;
  options?: { value: string; label: string }[];
  mask?: string;
  size?: "sm" | "md" | "lg" | "xl";
  groupId?: string;
  colSpan?: number;
  className?: string;
}

export interface FormProps {
  fields: FormFieldProps[];
  onSubmit: (data: any) => void;
  submitButtonText?: string;
  className?: string;
  children?: React.ReactNode;
}
