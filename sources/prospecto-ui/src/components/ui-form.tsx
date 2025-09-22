import { classNames } from "../helpers/clsx";

export const FormLabel = (props: { children?: React.ReactNode; decoration?: string }) => {
  return (
    <div
      className={classNames(
        props.decoration && [
          "bg-(--bg-highlight) rounded-l-md",
          "-my-px py-px",
          "-ml-2 pl-2",
          "-mr-2.5 pr-2.5",
        ],
      )}
    >
      <div
        className={classNames(
          // "font-semibold text-sm text-(--fg-subtle)",
          "h-[30px] flex items-center text-nowrap",
        )}
      >
        {props.children}
      </div>
    </div>
  );
};

export const FormControl = ({
  ...props
}: {
  children?: React.ReactNode;
  isSearchField?: boolean;
  isReadOnlyField?: boolean;
  textAlign?: "left" | "right";
  decorateAs?: string;
}) => {
  props.textAlign = props.textAlign ?? "left";

  return (
    <div
      className={classNames(
        props.decorateAs && [
          "bg-(--bg-highlight) rounded-r-md",
          "-my-px py-px",
          "-ml-2.5 pl-2.5",
          "-mr-px pr-px",
        ],
      )}
    >
      <div
        tabIndex={-1}
        className={classNames(
          "h-[30px] flex items-center px-2 cursor-text text-nowrap",
          props.isReadOnlyField && "border-b border-(--border-base) brightness-95",
          props.isSearchField &&
            "!justify-between bg-(--bg-base) border border-(--border-base) rounded-md",
          props.textAlign === "left" && "text-left justify-start",
          props.textAlign === "right" && "text-right justify-end",
          props.decorateAs && "outline-(--border-highlight) outline-2 -outline-offset-1",
          props.isSearchField &&
            "focus:outline-(--fg-accent) focus:outline-2 focus:-outline-offset-1",
        )}
      >
        {props.children}
      </div>
    </div>
  );
};
