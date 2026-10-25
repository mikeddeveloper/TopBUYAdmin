import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
  Paid: "bg-brand-wash text-brand-deep",
  Shipped: "bg-blue-wash text-blue",
  Pending: "bg-amber-wash text-amber",
  Overdue: "bg-red-wash text-red",
  Published: "bg-brand-wash text-brand-deep",
  Draft: "bg-ink/5 text-ink-soft",
  Archived: "bg-red-wash text-red",
  "On track": "bg-brand-wash text-brand-deep",
  "Due soon": "bg-amber-wash text-amber",
  Completed: "bg-ink/5 text-ink-soft",
  Active: "bg-brand-wash text-brand-deep",
  Off: "bg-ink/5 text-ink-faint",
  Delivered: "bg-brand-wash text-brand-deep",
  "Good standing": "bg-brand-wash text-brand-deep",
  "Has overdue": "bg-red-wash text-red",
  Failed: "bg-red-wash text-red",
  Successful: "bg-brand-wash text-brand-deep",
  Invited: "bg-amber-wash text-amber",
  Scheduled: "bg-blue-wash text-blue",
  Expired: "bg-ink/5 text-ink-faint",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        styles[status] ?? "bg-ink/5 text-ink-soft"
      )}
    >
      {status}
    </span>
  );
}
