import { classNames } from "../helpers/clsx";

export const Table = (props: { children?: React.ReactNode }) => {
  return <table>{props.children}</table>;
};

export const TableHeader = (props: { children?: React.ReactNode }) => {
  return (
    <thead>
      <tr>{props.children}</tr>
    </thead>
  );
};

export const TableColumn = ({
  ...props
}: {
  children?: React.ReactNode;
  textAlign?: "left" | "right";
}) => {
  props.textAlign = props.textAlign ?? "left";
  return (
    <th
      className={classNames(
        "p-1.5 pb-4 text-sm text-left align-top",
        "first:pl-2",
        "text-(--fg-subtle) bg-(--bg-layer) border-y not-last:border-r border-(--border-base)",
        props.textAlign === "left" && "pr-4 text-left",
        props.textAlign === "right" && "pl-4 text-right",
      )}
    >
      {props.children}
    </th>
  );
};

export const TableBody = (props: { children?: React.ReactNode }) => {
  return <tbody>{props.children}</tbody>;
};

export const TableRow = (props: { children?: React.ReactNode; decorateAs?: string }) => {
  return (
    <tr
      tabIndex={-1}
      className={classNames(
        "relative cursor-pointer even:bg-(--bg-layer)",
        "focus:bg-(--bg-accent)",
        props.decorateAs && [
          "after:absolute after:left-0 after:top-0 after:h-full after:w-1",
          "after:bg-(--border-highlight)",
          "after:pointer-events-none",
        ],
      )}
    >
      {props.children}
    </tr>
  );
};

export const TableCell = ({
  ...props
}: {
  children?: React.ReactNode;
  textAlign?: "left" | "right";
  noPadding?: boolean;
}) => {
  props.textAlign = props.textAlign ?? "left";
  return (
    <td
      className={classNames(
        "relative p-1.5 py-2 text-left align-top text-nowrap",
        "first:pl-2 last:w-full",
        "border-y border-(--border-base)",
        props.textAlign === "left" && "pr-4 text-left",
        props.textAlign === "right" && "pl-4 text-right",
        props.noPadding && "pb-0",
      )}
    >
      {props.children}
    </td>
  );
};
