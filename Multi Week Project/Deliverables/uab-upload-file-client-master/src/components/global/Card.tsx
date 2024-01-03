import { classNames } from "@/utils";
import MountTransition from "./transitions/MountTransition";

type CardProps = {
  children?: React.ReactNode;
  customClassNames?: string | undefined;
};

const Card = (props: CardProps) => {
  return (
    <MountTransition
      className={classNames(
        "block w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700",
        props.customClassNames
      )}
    >
      {props.children}
    </MountTransition>
  );
};

export default Card;
