import { cn } from "@/lib/utils";

const sizes = {
  sm: 36,
  md: 44,
  lg: 56,
  xl: 72,
};

const ringStyles = {
  neutral: "ring-ink/8",
  brand: "ring-brand/50",
  red: "ring-red/50",
  none: "",
};

export function AvatarPhoto({
  seed,
  alt,
  size = "md",
  ring = "neutral",
}: {
  seed: number;
  alt: string;
  size?: "sm" | "md" | "lg" | "xl";
  ring?: "neutral" | "brand" | "red" | "none";
}) {
  const px = sizes[size];
  const id = ((seed - 1) % 70) + 1;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://i.pravatar.cc/${px * 2}?img=${id}`}
      alt={alt}
      width={px}
      height={px}
      className={cn("shrink-0 rounded-full object-cover ring-2", ringStyles[ring])}
      style={{ width: px, height: px }}
    />
  );
}
