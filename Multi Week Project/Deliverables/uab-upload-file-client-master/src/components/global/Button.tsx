import { classNames } from "@/utils";
import React, { ButtonHTMLAttributes, MouseEventHandler } from "react";

export enum ButtonColor {
  BLUE = "blue",
  ALT = "alternative",
  DARK = "dark",
  LIGHT = "light",
  GREEN = "green",
  CYAN = "cyan",
  TEAL = "teal",
  LIME = "lime",
  RED = "red",
  PINK = "pink",
  PURPLE = "purple",
}

export enum ButtonSize {
  EXTRA_SMALL = "extra-small",
  SMALL = "small",
  BASE = "base",
  LARGE = "large",
  EXTRA_LARGE = "extra-large",
}

export enum ButtonVariant {
  DEFAULT = "default",
  OUTLINE = "outline",
  GRADIENT_MONO = "gradient-monochrome",
  /*   GRADIENT_DUO = "gradient-duotone",
  GRADIENT_OUTLINE = "gradient-outline", */
}

type ButtonProps = {
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  label: string;
  color?: ButtonColor;
  size?: ButtonSize;
  Icon?: React.FC<Omit<React.SVGProps<SVGSVGElement>, "ref">>;
  variant?: ButtonVariant;
  pilled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  processing?: boolean;
  disabled?: boolean;
  customClassNames?: string | undefined;
};

const BASE_CLASSES =
  "inline-flex justify-center items-center focus:ring-4 focus:outline-none font-medium text-center disabled:cursor-not-allowed ease-in duration-600";

const SIZE_CLASSES = {
  [ButtonSize.EXTRA_SMALL]: "px-3 py-2 text-xs",
  [ButtonSize.SMALL]: "px-3 py-2 text-sm",
  [ButtonSize.BASE]: "text-base px-5 py-2.5",
  [ButtonSize.LARGE]: "px-5 py-3 text-lg",
  [ButtonSize.EXTRA_LARGE]: "text-xl px-6 py-3.5",
} as const;

const COLOR_CLASSES = {
  [ButtonColor.BLUE]: {
    [ButtonVariant.DEFAULT]:
      "text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ",
    [ButtonVariant.GRADIENT_MONO]:
      "text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800",
    [ButtonVariant.OUTLINE]:
      "text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-blue-300 font-medium dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800",
  },
  [ButtonColor.ALT]: {
    [ButtonVariant.DEFAULT]:
      "text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700",
    [ButtonVariant.GRADIENT_MONO]: "",
    [ButtonVariant.OUTLINE]: "",
  },
  [ButtonColor.DARK]: {
    [ButtonVariant.DEFAULT]:
      "text-white bg-gray-800 hover:bg-gray-900 focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700",
    [ButtonVariant.GRADIENT_MONO]: "",
    [ButtonVariant.OUTLINE]:
      "text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-gray-300 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800",
  },
  [ButtonColor.LIGHT]: {
    [ButtonVariant.DEFAULT]:
      "text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700",
    [ButtonVariant.GRADIENT_MONO]: "",
    [ButtonVariant.OUTLINE]:
      "text-gray-900 hover:text-white border border-gray-300 hover:bg-gray-900 focus:ring-gray-300 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800",
  },
  [ButtonColor.GREEN]: {
    [ButtonVariant.DEFAULT]: "",
    [ButtonVariant.GRADIENT_MONO]: "",
    [ButtonVariant.OUTLINE]: "",
  },
  [ButtonColor.CYAN]: {
    [ButtonVariant.DEFAULT]: "",
    [ButtonVariant.GRADIENT_MONO]: "",
    [ButtonVariant.OUTLINE]: "",
  },
  [ButtonColor.TEAL]: {
    [ButtonVariant.DEFAULT]: "",
    [ButtonVariant.GRADIENT_MONO]: "",
    [ButtonVariant.OUTLINE]: "",
  },
  [ButtonColor.LIME]: {
    [ButtonVariant.DEFAULT]: "",
    [ButtonVariant.GRADIENT_MONO]: "",
    [ButtonVariant.OUTLINE]: "",
  },
  [ButtonColor.RED]: {
    [ButtonVariant.DEFAULT]:
      "text-white bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900",
    [ButtonVariant.GRADIENT_MONO]: "",
    [ButtonVariant.OUTLINE]: "",
  },
  [ButtonColor.PINK]: {
    [ButtonVariant.DEFAULT]: "",
    [ButtonVariant.GRADIENT_MONO]: "",
    [ButtonVariant.OUTLINE]: "",
  },
  [ButtonColor.PURPLE]: {
    [ButtonVariant.DEFAULT]: "",
    [ButtonVariant.GRADIENT_MONO]: "",
    [ButtonVariant.OUTLINE]: "",
  },
};

const ButtonSpinner = () => (
  <svg
    aria-hidden="true"
    role="status"
    className="inline w-4 h-4 mr-3 text-white animate-spin"
    viewBox="0 0 100 101"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
      fill="#E5E7EB"
    />
    <path
      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
      fill="currentColor"
    />
  </svg>
);

const Button = (props: ButtonProps) => {
  const {
    type = "button",
    label,
    color = ButtonColor.BLUE,
    variant = ButtonVariant.DEFAULT,
    size = ButtonSize.BASE,
    Icon,
    pilled = false,
    onClick,
    disabled,
    processing,
    customClassNames,
  } = props;

  const pilledClasses = pilled ? "rounded-full" : "rounded-lg";

  return (
    <button
      type={type}
      className={classNames(
        BASE_CLASSES,
        COLOR_CLASSES[color][variant],
        SIZE_CLASSES[size],
        pilledClasses,
        customClassNames,
        disabled || processing ? "input-disabled" : ""
      )}
      disabled={disabled || processing}
      onClick={onClick}
    >
      {Icon && <Icon className="w-5 h-5 mr-2 -ml-1" />}
      {processing && <ButtonSpinner />}
      {label}
    </button>
  );
};

export default Button;
