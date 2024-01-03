"use client";

import { classNames } from "@/utils";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import React from "react";

export type InputProps = {
  label?: string | undefined;
  type?: React.HTMLInputTypeAttribute | undefined;
  size?: InputSize;
  placeholder?: string;
  helperText?: string;
  errorText?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  value?: string | number | readonly string[] | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement> | undefined;
  containerClassNames?: string | undefined;
  inputClassNames?: string | undefined;
};

export enum InputSize {
  SMALL = "small",
  BASE = "base",
  LARGE = "large",
}

const BASE_CLASSES = "border font-medium rounded-lg block w-full";

const SIZE_CLASSES = {
  [InputSize.SMALL]: "sm:p-2 text-sm",
  [InputSize.BASE]: "p-2.5 text-base",
  [InputSize.LARGE]: "p-4 text-lg",
};

const COLOR_CLASSES =
  "bg-gray-50 text-gray-900 focus:ring-blue-500 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500  shadow-sm dark:shadow-sm-light disabled:cursor-not-allowed";

const BORDER_COLOR_CLASSES =
  "border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500";

const BORDER_ERROR_COLOR_CLASSES = "border-red-300 dark:border-red-600";

const Input = (props: InputProps) => {
  const {
    label,
    type = "text",
    size = InputSize.BASE,
    placeholder,
    helperText,
    errorText,
    value,
    onChange,
    onKeyDown,
    required,
    disabled,
    readOnly,
    containerClassNames,
    inputClassNames,
    ...rest
  } = props;

  const [modifiedType, setModifiedType] = React.useState<string>(type);

  return (
    <>
      <div className={containerClassNames}>
        {label && (
          <label
            htmlFor={label}
            className={classNames(
              "block mb-2 text-sm font-medium",
              !errorText
                ? " text-gray-900 dark:text-white"
                : "text-red-700 dark:text-red-500"
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {type === "password" && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 ">
              {modifiedType === "password" && (
                <EyeIcon
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400 cursor-pointer"
                  onClick={() => setModifiedType("text")}
                />
              )}
              {modifiedType === "text" && (
                <EyeSlashIcon
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400 cursor-pointer"
                  onClick={() => setModifiedType("password")}
                />
              )}
            </div>
          )}
          <input
            type={modifiedType}
            id={label}
            className={classNames(
              BASE_CLASSES,
              SIZE_CLASSES[size],
              COLOR_CLASSES,
              !errorText ? BORDER_COLOR_CLASSES : BORDER_ERROR_COLOR_CLASSES,
              inputClassNames
            )}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            readOnly={readOnly}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            {...rest}
          />
        </div>
        {helperText && (
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {helperText}
          </p>
        )}
        {errorText && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            {errorText}
          </p>
        )}
      </div>
    </>
  );
};

export default Input;
