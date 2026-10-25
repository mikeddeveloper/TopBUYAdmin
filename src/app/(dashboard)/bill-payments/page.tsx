import { Zap } from "lucide-react";
import { Card } from "@/components/card";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { billPayments } from "@/lib/data";
import { formatNaira } from "@/lib/utils";

export default function BillPaymentsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-[26px] font-semibold tracking-tight text-ink">Bill payments</h1>
        <p className="mt-1 text-sm text-ink-soft">
          Airtime, data and utility bills paid through the app · sample data
        </p>
      </div>

      <div className="grid grid-cols-4 gap-5">
        <StatCard label="Paid this month" value="₦842,000" note="214 transactions" accent="brand" />
        <StatCard label="Pending" value="₦24,500" note="3 transactions" accent="amber" />
        <StatCard label="Failed" value="₦8,000" note="1 transaction" accent="red" />
        <StatCard label="Total volume" value="₦874,500" note="across all billers" accent="blue" />
      </div>

      <Card className="p-0">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border-soft text-left text-xs font-medium text-ink-faint">
              <th className="py-4 pl-6 font-medium">Customer</th>
              <th className="py-4 font-medium">Biller</th>
              <th className="py-4 font-medium">Type</th>
              <th className="py-4 text-right font-medium">Amount</th>
              <th className="py-4 pl-6 font-medium">Date</th>
              <th className="py-4 pr-6 pl-6 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-soft">
            {billPayments.map((bill, index) => (
              <tr key={`${bill.customer}-${index}`}>
                <td className="py-4 pl-6 font-medium text-ink">{bill.customer}</td>
                <td className="py-4">
                  <div className="flex items-center gap-2 text-ink-soft">
                    <Zap className="h-3.5 w-3.5 text-amber" strokeWidth={1.75} />
                    {bill.biller}
                  </div>
                </td>
                <td className="py-4 text-ink-soft">{bill.type}</td>
                <td className="font-figure py-4 text-right font-medium text-ink">
                  {formatNaira(bill.amount)}
                </td>
                <td className="py-4 pl-6 text-ink-soft">{bill.date}</td>
                <td className="py-4 pr-6 pl-6">
                  <StatusBadge status={bill.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
