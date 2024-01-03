"use client";

import { useField } from "formik";
import Input, { InputProps } from "../Input";

type FormikInputProps = InputProps & {
  name: string;
};

const FormikInput = (props: FormikInputProps) => {
  const { name, label, type, ...rest } = props;
  const [field, meta] = useField({ name, type });

  return (
    <Input
      label={label}
      type={type}
      {...field}
      {...rest}
      errorText={meta.error && meta.touched ? meta.error : undefined}
    />
  );
};

export default FormikInput;
