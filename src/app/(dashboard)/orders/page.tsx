import { Download } from "lucide-react";
import { Card } from "@/components/card";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { AvatarPhoto } from "@/components/avatar-photo";
import { allOrders } from "@/lib/data";
import { formatNaira, seedFromName } from "@/lib/utils";

const filterTabs = [
  { label: "All", count: 312, active: true },
  { label: "Pending", count: 41 },
  { label: "Shipped", count: 28 },
  { label: "Overdue", count: 6 },
];

export default function OrdersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-[26px] font-semibold tracking-tight text-ink">Orders</h1>
          <p className="mt-1 text-sm text-ink-soft">
            312 orders this month · sample data
          </p>
        </div>
        <button className="flex items-center gap-1.5 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium text-ink-soft hover:bg-ink/3">
          <Download className="h-4 w-4" />
          Export orders
        </button>
      </div>

      <div className="grid grid-cols-4 gap-5">
        <StatCard label="Orders this month" value="312" pill="+8%" note="vs last month" accent="blue" />
        <StatCard label="Awaiting shipment" value="41" note="avg. 1.4 days to ship" accent="amber" />
        <StatCard label="Delivered this week" value="96" note="94% on-time" accent="brand" />
        <StatCard label="Overdue payment" value="6" note="₦412,000 outstanding" accent="red" />
      </div>

      <div className="flex items-center gap-2">
        {filterTabs.map((tab) => (
          <button
            key={tab.label}
            className={
              tab.active
                ? "flex items-center gap-1.5 rounded-xl bg-ink px-4 py-2 text-sm font-medium text-white"
                : "flex items-center gap-1.5 rounded-xl border border-border bg-surface px-4 py-2 text-sm font-medium text-ink-soft hover:bg-ink/3"
            }
          >
            {tab.label}
            <span className={tab.active ? "text-xs text-white/50" : "text-xs text-ink-faint"}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      <Card className="p-0">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border-soft text-left text-xs font-medium text-ink-faint">
              <th className="py-4 pl-6 font-medium">Order</th>
              <th className="py-4 font-medium">Customer</th>
              <th className="py-4 font-medium">Item</th>
              <th className="py-4 font-medium">Payment</th>
              <th className="py-4 text-right font-medium">Total</th>
              <th className="py-4 pl-6 font-medium">Date</th>
              <th className="py-4 pr-6 pl-6 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-soft">
            {allOrders.map((order) => (
              <tr key={order.id}>
                <td className="py-4 pl-6 font-medium text-ink">{order.id}</td>
                <td className="py-4">
                  <div className="flex items-center gap-2.5">
                    <AvatarPhoto seed={seedFromName(order.customer)} alt={order.customer} size="sm" />
                    <span className="text-ink">{order.customer}</span>
                  </div>
                </td>
                <td className="py-4 text-ink-soft">{order.items}</td>
                <td className="py-4 text-ink-soft">{order.payment}</td>
                <td className="font-figure py-4 text-right font-medium text-ink">
                  {formatNaira(order.total)}
                </td>
                <td className="py-4 pl-6 text-ink-soft">{order.date}</td>
                <td className="py-4 pr-6 pl-6">
                  <StatusBadge status={order.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-between border-t border-border-soft px-6 py-4">
          <p className="text-sm text-ink-soft">Showing 1 to 10 of 312 orders</p>
          <div className="flex items-center gap-2">
            <button className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-ink-faint">
              Previous
            </button>
            <button className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-ink-soft hover:bg-ink/3">
              Next
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
