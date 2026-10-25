"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutGrid,
  Shapes,
  Layers,
  ClipboardList,
  Users,
  CalendarClock,
  Zap,
  CreditCard,
  Megaphone,
  UserCog,
  Settings,
  LogOut,
} from "lucide-react";
import { cn, seedFromName } from "@/lib/utils";
import { AvatarPhoto } from "@/components/avatar-photo";
import { createClient } from "@/lib/supabase/client";

const storeNav = [
  { label: "Dashboard", href: "/", icon: LayoutGrid },
  { label: "Products", href: "/products", icon: Shapes },
  { label: "Categories", href: "/categories", icon: Layers },
  { label: "Orders", href: "/orders", icon: ClipboardList },
  { label: "Customers", href: "/customers", icon: Users },
];

const moneyNav = [
  { label: "TracPay", href: "/tracpay", icon: CalendarClock },
  { label: "Bill payments", href: "/bill-payments", icon: Zap },
  { label: "Payments", href: "/payments", icon: CreditCard },
];

const manageNav = [
  { label: "Promotions", href: "/promotions", icon: Megaphone },
  { label: "Staff and roles", href: "/staff", icon: UserCog },
  { label: "Settings", href: "/settings", icon: Settings },
];

function NavSection({
  title,
  items,
  pathname,
}: {
  title: string;
  items: typeof storeNav;
  pathname: string;
}) {
  return (
    <div>
      <p className="px-3 text-[11px] font-medium tracking-wide text-white/30">
        {title}
      </p>
      <div className="mt-2 flex flex-col gap-0.5">
        {items.map((item) => {
          const isActive =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-2.5 rounded-lg py-2 pr-3 pl-3.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-white/6 text-white"
                  : "text-white/45 hover:bg-white/4 hover:text-white/80"
              )}
            >
              <span
                className={cn(
                  "absolute top-1/2 left-0 h-4 w-[3px] -translate-y-1/2 rounded-full bg-brand transition-opacity",
                  isActive ? "opacity-100" : "opacity-0"
                )}
              />
              <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function Sidebar({ userEmail }: { userEmail: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  const displayName = userEmail.split("@")[0] || "Staff";

  return (
    <aside className="flex h-screen w-[220px] shrink-0 flex-col bg-linear-to-b from-sidebar to-sidebar-deep">
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-[13px] font-semibold text-white font-figure">
          TB
        </div>
        <span className="text-[15px] font-semibold text-white">TOPBUY</span>
      </div>

      <nav className="flex flex-1 flex-col gap-6 overflow-y-auto px-3">
        <NavSection title="Store" items={storeNav} pathname={pathname} />
        <NavSection title="Money" items={moneyNav} pathname={pathname} />
        <NavSection title="Manage" items={manageNav} pathname={pathname} />
      </nav>

      <div className="mx-3 mb-4 flex items-center gap-2.5 rounded-xl border border-white/8 bg-white/4 px-3 py-2.5">
        <AvatarPhoto seed={seedFromName(userEmail || "staff")} alt={displayName} size="sm" ring="none" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-white capitalize">{displayName}</p>
          <p className="truncate text-xs text-white/40">{userEmail}</p>
        </div>
        <button
          onClick={handleSignOut}
          title="Sign out"
          className="shrink-0 rounded-lg p-1.5 text-white/40 transition-colors hover:bg-white/8 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
}
