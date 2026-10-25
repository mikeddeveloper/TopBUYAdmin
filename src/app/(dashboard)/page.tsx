import Link from "next/link";
import { Search, Plus, TrendingUp } from "lucide-react";
import { Card } from "@/components/card";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { AvatarPhoto } from "@/components/avatar-photo";
import { ProductArt } from "@/components/product-art";
import { Sparkline } from "@/components/sparkline";
import { SalesChart } from "@/components/sales-chart";
import {
  lowStockItems,
  overdueInstallments,
  recentOrders,
  salesData,
} from "@/lib/data";
import { formatNaira, seedFromName } from "@/lib/utils";
import { productIcon } from "@/lib/product-icon";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-[26px] font-semibold tracking-tight text-ink">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-ink-soft">
            Tuesday, 20 October · sample data
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-ink-faint" />
            <input
              type="text"
              placeholder="Search orders, products, customers"
              className="w-72 rounded-xl border border-border bg-surface py-2.5 pl-9 pr-3 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-brand/25"
            />
          </div>
          <Link
            href="/products/new"
            className="flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-deep"
          >
            <Plus className="h-4 w-4" />
            Add product
          </Link>
          <AvatarPhoto seed={12} alt="Ayomide D." />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-5">
        <div className="mesh-brand bg-grain card-lift relative col-span-2 flex flex-col justify-between overflow-hidden rounded-2xl p-6 text-white">
          <div className="flex items-start justify-between">
            <p className="text-sm font-medium text-white/65">Revenue this month</p>
            <span className="flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium">
              <TrendingUp className="h-3.5 w-3.5" />
              +12%
            </span>
          </div>
          <div className="mt-6 flex items-end justify-between gap-6">
            <p className="font-figure text-[38px] leading-none font-semibold tracking-tight">
              ₦4,820,000
            </p>
            <Sparkline
              data={salesData.map((d) => d.full)}
              stroke="#ffffff"
              fill="rgba(255,255,255,0.14)"
              width={130}
              height={46}
            />
          </div>
        </div>

        <StatCard label="Orders" value="312" pill="+8%" note="41 waiting to ship" accent="blue" />
        <StatCard
          label="Active TracPay plans"
          value="87"
          pill="6 overdue"
          pillTone="red"
          note="₦2.1M still to collect"
          accent="red"
        />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Card className="col-span-2">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-base font-semibold text-ink">
                Sales, last 7 days
              </h2>
              <div className="mt-2 flex items-center gap-4 text-xs text-ink-soft">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-brand" />
                  Full payment
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-amber" />
                  TracPay payments
                </span>
              </div>
            </div>
            <div className="flex items-center rounded-lg bg-ink/5 p-1 text-xs font-medium text-ink-soft">
              <button className="rounded-md bg-surface px-3 py-1.5 text-ink shadow-sm">
                7 days
              </button>
              <button className="px-3 py-1.5">30 days</button>
              <button className="px-3 py-1.5">90 days</button>
            </div>
          </div>
          <div className="mt-4">
            <SalesChart />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-ink">
              TracPay this week
            </h2>
            <a href="/tracpay" className="text-sm font-medium text-brand-deep hover:underline">
              View all
            </a>
          </div>

          <div className="mt-4 flex items-end justify-between">
            <div>
              <p className="text-xs text-ink-soft">Collected</p>
              <p className="font-figure mt-1 text-xl font-semibold text-ink">₦860,000</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-ink-soft">Due</p>
              <p className="font-figure mt-1 text-xl font-semibold text-ink">₦1,240,000</p>
            </div>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-ink/8">
            <div className="h-full rounded-full bg-brand" style={{ width: "40%" }} />
          </div>

          <p className="mt-5 text-xs font-medium text-ink-faint">
            Overdue
          </p>
          <div className="mt-3 flex flex-col divide-y divide-border-soft">
            {overdueInstallments.map((row) => (
              <div
                key={row.name}
                className="flex items-center justify-between border-l-2 border-red/40 py-3 pl-3"
              >
                <div className="flex items-center gap-3">
                  <AvatarPhoto seed={seedFromName(row.name)} alt={row.name} size="sm" />
                  <div>
                    <p className="text-sm font-medium text-ink">{row.name}</p>
                    <p className="text-xs text-ink-soft">{row.item}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-figure text-sm font-medium text-ink">
                    {formatNaira(row.amount)}
                  </p>
                  <p className="text-xs font-medium text-red">{row.late}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-4 w-full rounded-xl border border-border py-2.5 text-sm font-medium text-ink-soft hover:bg-ink/3">
            Send reminders to all overdue
          </button>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Card className="col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-ink">Recent orders</h2>
            <a href="/orders" className="text-sm font-medium text-brand-deep hover:underline">
              View all orders
            </a>
          </div>
          <table className="mt-4 w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border-soft text-left text-xs font-medium text-ink-faint">
                <th className="pb-3 font-medium">Order</th>
                <th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 font-medium">Payment</th>
                <th className="pb-3 text-right font-medium">Total</th>
                <th className="pb-3 pl-6 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-soft">
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="py-3 font-medium text-ink">{order.id}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2.5">
                      <AvatarPhoto seed={seedFromName(order.customer)} alt={order.customer} size="sm" />
                      <span className="text-ink">{order.customer}</span>
                    </div>
                  </td>
                  <td className="py-3 text-ink-soft">{order.payment}</td>
                  <td className="font-figure py-3 text-right font-medium text-ink">
                    {formatNaira(order.total)}
                  </td>
                  <td className="py-3 pl-6">
                    <StatusBadge status={order.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-ink">Low stock</h2>
              <p className="mt-0.5 text-xs text-ink-soft">14 items · 3 sold out</p>
            </div>
            <a href="/products" className="text-sm font-medium text-brand-deep hover:underline">
              Restock
            </a>
          </div>
          <div className="mt-4 flex flex-col divide-y divide-border-soft">
            {lowStockItems.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <ProductArt icon={productIcon(item.name)} index={index} size="sm" />
                  <div>
                    <p className="text-sm font-medium text-ink">{item.name}</p>
                    <p className="text-xs text-ink-soft">{item.detail}</p>
                  </div>
                </div>
                <span
                  className={
                    item.left === "1 left"
                      ? "rounded-full bg-red-wash px-2.5 py-1 text-xs font-medium text-red"
                      : "rounded-full bg-amber-wash px-2.5 py-1 text-xs font-medium text-amber"
                  }
                >
                  {item.left}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
