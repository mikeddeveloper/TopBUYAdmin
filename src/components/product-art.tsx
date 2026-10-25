import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export const meshes = [
  "linear-gradient(135deg, #0f7a5c, #0a5d45)",
  "linear-gradient(135deg, #b25f0a, #8a4608)",
  "linear-gradient(135deg, #2b5f96, #1d4570)",
  "linear-gradient(135deg, #a8502f, #7c3a22)",
  "linear-gradient(135deg, #6b3fa0, #4e2d78)",
  "linear-gradient(135deg, #0f7a5c, #b25f0a)",
  "linear-gradient(135deg, #2b5f96, #6b3fa0)",
  "linear-gradient(135deg, #a8502f, #0f7a5c)",
];

const highlight = "radial-gradient(130% 130% at 22% 18%, rgba(255,255,255,0.38), transparent 55%)";

const dimensions = {
  sm: { box: "h-10 w-10 rounded-[10px]", icon: 18 },
  md: { box: "h-11 w-11 rounded-xl", icon: 20 },
  lg: { box: "h-16 w-16 rounded-2xl", icon: 28 },
};

export function ProductArt({
  icon: Icon,
  index,
  size = "md",
  className,
}: {
  icon: LucideIcon;
  index: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const { box, icon } = dimensions[size];
  return (
    <div
      className={cn(
        "bg-grain relative flex shrink-0 items-center justify-center overflow-hidden shadow-[0_2px_6px_-1px_rgba(14,16,19,0.3)]",
        box,
        className
      )}
      style={{ backgroundImage: `${highlight}, ${meshes[index % meshes.length]}` }}
    >
      <Icon
        className="relative text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]"
        width={icon}
        height={icon}
        strokeWidth={1.75}
      />
      <span className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/20" />
    </div>
  );
}
