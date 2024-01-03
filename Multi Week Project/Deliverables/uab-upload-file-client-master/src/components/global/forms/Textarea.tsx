import { classNames } from "@/utils";

type TextareaProps = {
  label?: string | undefined;
  rows?: number | undefined;
  size?: TextareaSize;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  value?: string | number | readonly string[] | undefined;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement> | undefined;
  containerClassNames?: string | undefined;
  inputClassNames?: string | undefined;
};

export enum TextareaSize {
  SMALL = "small",
  BASE = "base",
  LARGE = "large",
}

const BASE_CLASSES = "block w-full rounded-lg border";

const SIZE_CLASSES = {
  [TextareaSize.SMALL]: "sm:p-2 text-sm",
  [TextareaSize.BASE]: "p-2.5 text-base",
  [TextareaSize.LARGE]: "p-4 text-lg",
};

const COLOR_CLASSES =
  "text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

const Textarea = (props: TextareaProps) => {
  const {
    label,
    rows = 4,
    size = TextareaSize.BASE,
    placeholder,
    value,
    onChange,
    required,
    disabled,
    readOnly,
    containerClassNames,
    inputClassNames,
    ...rest
  } = props;
  return (
    <>
      <div className={containerClassNames}>
        {label && (
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            {label}
          </label>
        )}
        <textarea
          rows={rows}
          className={classNames(
            BASE_CLASSES,
            SIZE_CLASSES[size],
            COLOR_CLASSES,
            inputClassNames
          )}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          value={value}
          onChange={onChange}
          {...rest}
        />
      </div>
    </>
  );
};

export default Textarea;
