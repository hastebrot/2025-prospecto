import { type CSSProperties } from "react";

export const Theme = (props: { children?: React.ReactNode; theme: "light" | "dark" }) => {
  const style = {
    "--color-zinc-350": "color-mix(in oklch, var(--color-zinc-300), var(--color-zinc-400))",
  } as CSSProperties;
  const lightMode = {
    "--bg-base": "var(--color-white)",
    "--bg-layer": "var(--color-zinc-100)",
    "--bg-layer-active": "var(--color-zinc-200)",
    "--fg-base": "var(--color-zinc-900)",
    "--fg-subtle": "var(--color-zinc-500)",
    "--fg-muted": "var(--color-zinc-350)",
    "--border-base": "var(--color-zinc-200)",
    "--border-active": "var(--color-zinc-300)",
    "--fg-accent": "var(--color-blue-500)",
    "--bg-accent": "var(--color-blue-100)",
    "--border-accent": "var(--color-blue-200)",
    "--fg-highlight": "var(--color-amber-600)",
    "--bg-highlight": "var(--color-amber-200)",
    "--border-highlight": "var(--color-amber-400)",
  } as CSSProperties;
  const darkMode = {
    "--bg-base": "var(--color-neutral-900)",
    "--bg-layer": "var(--color-neutral-800)",
    "--bg-layer-active": "var(--color-neutral-700)",
    "--fg-base": "var(--color-neutral-100)",
    "--fg-subtle": "var(--color-neutral-300)",
    "--fg-muted": "var(--color-neutral-500)",
    "--border-base": "var(--color-neutral-700)",
    "--border-active": "var(--color-neutral-600)",
    "--fg-accent": "var(--color-sky-300)",
    "--bg-accent": "var(--color-slate-700)",
    "--border-accent": "var(--color-slate-500)",
    "--fg-highlight": "var(--color-amber-600)",
    "--bg-highlight": "var(--color-amber-400)",
    "--border-highlight": "var(--color-amber-400)",
  } as CSSProperties;
  return (
    <div
      className="font-sans font-normal text-base grid"
      style={{ ...style, ...(props.theme === "light" ? lightMode : darkMode) }}
      data-theme={props.theme}
    >
      {props.children}
    </div>
  );
};
