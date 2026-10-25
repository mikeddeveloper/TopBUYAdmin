import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  pill,
  pillTone = "brand",
  note,
  accent = "brand",
  valueTone,
}: {
  label: string;
  value: string;
  pill?: string;
  pillTone?: "brand" | "red" | "amber" | "blue";
  note?: string;
  accent?: "brand" | "red" | "amber" | "blue" | "none";
  valueTone?: "default" | "red";
}) {
  const pillStyles: Record<string, string> = {
    brand: "bg-brand-wash text-brand-deep",
    red: "bg-red-wash text-red",
    amber: "bg-amber-wash text-amber",
    blue: "bg-blue-wash text-blue",
  };

  const accentStyles: Record<string, string> = {
    brand: "bg-brand",
    red: "bg-red",
    amber: "bg-amber",
    blue: "bg-blue",
    none: "bg-transparent",
  };

  return (
    <div className="card-lift relative overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-[0_1px_2px_rgba(14,16,19,0.03)]">
      <span className={cn("absolute top-0 left-0 h-[3px] w-full", accentStyles[accent])} />
      <p className="text-sm font-medium text-ink-soft">{label}</p>
      <p
        className={cn(
          "font-figure mt-2 text-[28px] font-semibold tracking-tight",
          valueTone === "red" ? "text-red" : "text-ink"
        )}
      >
        {value}
      </p>
      <div className="mt-3 flex items-center gap-2 text-sm">
        {pill && (
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
              pillStyles[pillTone]
            )}
          >
            {pill}
          </span>
        )}
        {note && <span className="text-ink-faint">{note}</span>}
      </div>
    </div>
  );
}
