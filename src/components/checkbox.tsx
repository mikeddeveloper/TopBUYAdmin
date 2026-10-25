"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function Checkbox({
  name,
  value = "on",
  defaultChecked = false,
  label,
  className,
}: {
  name?: string;
  value?: string;
  defaultChecked?: boolean;
  label?: string;
  className?: string;
}) {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <label
      className={cn(
        "group flex cursor-pointer items-center gap-2.5 text-left text-sm text-ink-soft",
        !label && "inline-flex",
        className
      )}
    >
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={(event) => setChecked(event.target.checked)}
        className="peer sr-only"
      />
      <span
        className={cn(
          "flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-md border transition-colors",
          "peer-focus-visible:ring-2 peer-focus-visible:ring-brand/40 peer-focus-visible:ring-offset-2",
          checked ? "border-brand bg-brand" : "border-border bg-surface group-hover:border-ink/25"
        )}
      >
        <Check
          className={cn("h-3 w-3 text-white transition-opacity", checked ? "opacity-100" : "opacity-0")}
          strokeWidth={3}
        />
      </span>
      {label}
    </label>
  );
}
