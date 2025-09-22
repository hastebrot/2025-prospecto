import { classNames } from "../helpers/clsx";

export const ToolbarButton = (props: {
  children?: React.ReactNode;
  hasIcon?: boolean;
  isDisabled?: boolean;
  color?: string;
  onPress?: () => void;
  isSelected?: boolean;
}) => {
  return (
    <button
      type="button"
      className={classNames(
        "h-[28px] flex items-center gap-1 px-2 rounded-md text-nowrap select-none",
        !props.hasIcon && "bg-(--bg-layer)",
        props.isDisabled && "text-(--fg-muted) cursor-default",
        !props.isDisabled && "text-(--fg-base) hover:bg-(--bg-layer-active) cursor-pointer",
        !props.isDisabled && props.isSelected && "!bg-(--bg-accent) hover:!brightness-85",
        props.color === "green" && "!bg-green-200 hover:brightness-85 saturate-50",
        props.color === "yellow" && "!bg-yellow-200 hover:brightness-85  saturate-50",
        props.color === "red" && "!bg-red-200 hover:brightness-85 saturate-50",
        props.color === "blue" && "!bg-blue-200 hover:brightness-85 saturate-50",
      )}
      onClick={props.onPress}
      disabled={props.isDisabled}
    >
      {props.children}
    </button>
  );
};
