import { UserPlus, Crown } from "lucide-react";
import { Card } from "@/components/card";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { AvatarPhoto } from "@/components/avatar-photo";
import { customers } from "@/lib/data";
import { formatNaira, seedFromName } from "@/lib/utils";

const topCustomers = [...customers].sort((a, b) => b.spent - a.spent).slice(0, 3);

export default function CustomersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-[26px] font-semibold tracking-tight text-ink">Customers</h1>
          <p className="mt-1 text-sm text-ink-soft">
            1,840 customers · sample data
          </p>
        </div>
        <button className="flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-deep">
          <UserPlus className="h-4 w-4" />
          Add customer
        </button>
      </div>

      <div className="grid grid-cols-4 gap-5">
        <StatCard label="Total customers" value="1,840" pill="+6%" note="vs last month" accent="blue" />
        <StatCard label="New this month" value="126" note="68% from referrals" accent="brand" />
        <StatCard label="Repeat customers" value="54%" note="of all orders" accent="brand" />
        <StatCard label="Avg. order value" value="₦58,400" note="across all orders" accent="amber" />
      </div>

      <div>
        <h2 className="text-sm font-medium text-ink-soft">Top customers this month</h2>
        <div className="mt-3 grid grid-cols-3 gap-6">
          {topCustomers.map((customer, index) => (
            <Card key={customer.email} className="card-lift flex items-center gap-4">
              <div className="relative shrink-0">
                <AvatarPhoto
                  seed={seedFromName(customer.name)}
                  alt={customer.name}
                  size="xl"
                  ring={customer.standing === "Good standing" ? "brand" : "red"}
                />
                <span
                  className={
                    index === 0
                      ? "absolute -right-1 -bottom-1 flex h-6 w-6 items-center justify-center rounded-full bg-amber text-white ring-2 ring-surface"
                      : "font-figure absolute -right-1 -bottom-1 flex h-6 w-6 items-center justify-center rounded-full bg-ink text-xs font-semibold text-white ring-2 ring-surface"
                  }
                >
                  {index === 0 ? <Crown className="h-3.5 w-3.5" strokeWidth={2} /> : index + 1}
                </span>
              </div>
              <div className="min-w-0">
                <p className="truncate font-medium text-ink">{customer.name}</p>
                <p className="font-figure mt-0.5 text-lg font-semibold text-ink">
                  {formatNaira(customer.spent)}
                </p>
                <p className="text-xs text-ink-soft">{customer.orders} orders</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Card className="p-0">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border-soft text-left text-xs font-medium text-ink-faint">
              <th className="py-4 pl-6 font-medium">Customer</th>
              <th className="py-4 text-right font-medium">Orders</th>
              <th className="py-4 text-right font-medium">Total spent</th>
              <th className="py-4 pl-6 font-medium">Standing</th>
              <th className="py-4 pr-6 pl-6 font-medium">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-soft">
            {customers.map((customer) => (
              <tr key={customer.email}>
                <td className="py-4 pl-6">
                  <div className="flex items-center gap-3">
                    <AvatarPhoto
                      seed={seedFromName(customer.name)}
                      alt={customer.name}
                      size="sm"
                      ring={customer.standing === "Good standing" ? "brand" : "red"}
                    />
                    <div>
                      <p className="font-medium text-ink">{customer.name}</p>
                      <p className="text-xs text-ink-soft">{customer.email}</p>
                    </div>
                  </div>
                </td>
                <td className="font-figure py-4 text-right text-ink">{customer.orders}</td>
                <td className="font-figure py-4 text-right font-medium text-ink">
                  {formatNaira(customer.spent)}
                </td>
                <td className="py-4 pl-6">
                  <StatusBadge status={customer.standing} />
                </td>
                <td className="py-4 pr-6 pl-6 text-ink-soft">{customer.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-between border-t border-border-soft px-6 py-4">
          <p className="text-sm text-ink-soft">Showing 1 to 7 of 1,840 customers</p>
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
