import { Card } from "@/components/card";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { paymentMethods, transactions } from "@/lib/data";
import { formatNaira } from "@/lib/utils";

const barColors = ["bg-brand", "bg-blue", "bg-amber", "bg-ink/30"];

export default function PaymentsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-[26px] font-semibold tracking-tight text-ink">Payments</h1>
        <p className="mt-1 text-sm text-ink-soft">
          Every transaction processed across the store · sample data
        </p>
      </div>

      <div className="grid grid-cols-4 gap-5">
        <StatCard label="Total processed" value="₦4,230,000" pill="+9%" note="this month" accent="brand" />
        <StatCard label="Card payments" value="₦1,860,000" note="44% of volume" accent="blue" />
        <StatCard label="Bank transfer" value="₦1,520,000" note="36% of volume" accent="amber" />
        <StatCard label="Failed payments" value="₦18,500" note="2 transactions" accent="red" />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Card>
          <h2 className="text-base font-semibold text-ink">Payment methods</h2>
          <div className="mt-5 flex flex-col gap-4">
            {paymentMethods.map((method, index) => (
              <div key={method.label}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ink-soft">{method.label}</span>
                  <span className="font-figure font-medium text-ink">
                    {formatNaira(method.amount)}
                  </span>
                </div>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-ink/6">
                  <div
                    className={`h-full rounded-full ${barColors[index % barColors.length]}`}
                    style={{ width: `${method.share}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="col-span-2 p-0">
          <div className="flex items-center justify-between p-6 pb-0">
            <h2 className="text-base font-semibold text-ink">Recent transactions</h2>
          </div>
          <table className="mt-4 w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border-soft text-left text-xs font-medium text-ink-faint">
                <th className="py-3 pl-6 font-medium">Reference</th>
                <th className="py-3 font-medium">Customer</th>
                <th className="py-3 font-medium">Method</th>
                <th className="py-3 text-right font-medium">Amount</th>
                <th className="py-3 pr-6 pl-6 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-soft">
              {transactions.map((tx) => (
                <tr key={tx.reference}>
                  <td className="py-3 pl-6 font-medium text-ink">{tx.reference}</td>
                  <td className="py-3 text-ink-soft">{tx.customer}</td>
                  <td className="py-3 text-ink-soft">{tx.method}</td>
                  <td className="font-figure py-3 text-right font-medium text-ink">
                    {formatNaira(tx.amount)}
                  </td>
                  <td className="py-3 pr-6 pl-6">
                    <StatusBadge status={tx.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}
