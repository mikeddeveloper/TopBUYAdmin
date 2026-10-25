import {
  Headphones,
  Shirt,
  Smartphone,
  Watch,
  Footprints,
  ShoppingBag,
  Backpack,
  Package,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  "Wireless earbuds": Headphones,
  "Ankara shirt": Shirt,
  "Smartphone 128 GB": Smartphone,
  "Leather handbag": ShoppingBag,
  Smartwatch: Watch,
  "Running sneakers": Footprints,
  "Phone case": Package,
  "Laptop backpack": Backpack,
  "Leather belt": Shirt,
};

export function productIcon(name: string): LucideIcon {
  return iconMap[name] ?? Package;
}
