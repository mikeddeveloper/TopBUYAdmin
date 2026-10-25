import { Download, Bell } from "lucide-react";
import { Card } from "@/components/card";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { AvatarPhoto } from "@/components/avatar-photo";
import { Checkbox } from "@/components/checkbox";
import { installmentPlans, planTemplates } from "@/lib/data";
import { formatNaira, seedFromName } from "@/lib/utils";

const filterTabs = [
  { label: "All", count: 87, active: true },
  { label: "On track", count: 58 },
  { label: "Due soon", count: 23 },
  { label: "Overdue", count: 6 },
  { label: "Completed", count: 41 },
];

const reminderRules = [
  { label: "3 days before due date", checked: true },
  { label: "On the due date", checked: true },
  { label: "2 days after a missed payment", checked: true },
  { label: "Notify me when a plan defaults", checked: false },
];

function progressColor(status: string) {
  if (status === "Overdue") return "bg-red";
  if (status === "Due soon") return "bg-amber";
  if (status === "Completed") return "bg-ink/20";
  return "bg-brand";
}

export default function TracPayPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-[26px] font-semibold tracking-tight text-ink">
            TracPay
          </h1>
          <p className="mt-1 text-sm text-ink-soft">
            Track every plan, payment and overdue account · sample data
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium text-ink-soft hover:bg-ink/3">
            <Download className="h-4 w-4" />
            Export report
          </button>
          <button className="flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-deep">
            <Bell className="h-4 w-4" />
            Send reminders (6)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-5">
        <StatCard label="Active plans" value="87" note="23 started this month" accent="blue" />
        <StatCard
          label="Collected this month"
          value="₦3,410,000"
          note="94% of what was due"
          accent="brand"
        />
        <StatCard label="Due this week" value="₦1,240,000" note="28 payments" accent="amber" />
        <StatCard
          label="Overdue"
          value="₦412,000"
          valueTone="red"
          note="6 plans, oldest 6 days"
          accent="red"
        />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 flex flex-col gap-4">
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
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border-soft text-left text-xs font-medium text-ink-faint">
                    <th className="py-4 pl-6 font-medium">Customer</th>
                    <th className="py-4 font-medium">Progress</th>
                    <th className="py-4 font-medium">Next due</th>
                    <th className="py-4 text-right font-medium">Amount</th>
                    <th className="py-4 pr-6 pl-6 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-soft">
                  {installmentPlans.map((plan) => (
                    <tr key={`${plan.name}-${plan.item}`}>
                      <td className="py-4 pl-6">
                        <div className="flex items-center gap-3">
                          <AvatarPhoto seed={seedFromName(plan.name)} alt={plan.name} size="sm" />
                          <div>
                            <p className="font-medium text-ink">{plan.name}</p>
                            <p className="text-xs text-ink-soft">{plan.item}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 pr-6">
                        <p className="text-xs text-ink-soft">{plan.progressLabel}</p>
                        <div className="mt-1.5 h-1.5 w-32 overflow-hidden rounded-full bg-ink/8">
                          <div
                            className={`h-full rounded-full ${progressColor(plan.status)}`}
                            style={{ width: `${plan.progressRatio * 100}%` }}
                          />
                        </div>
                      </td>
                      <td className="py-4 text-ink-soft">{plan.nextDue}</td>
                      <td className="font-figure py-4 text-right font-medium text-ink">
                        {plan.amount === 0 ? "₦0" : formatNaira(plan.amount)}
                      </td>
                      <td className="py-4 pr-6 pl-6">
                        <StatusBadge status={plan.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between border-t border-border-soft px-6 py-4">
              <p className="text-sm text-ink-soft">Showing 1 to 7 of 87 plans</p>
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

        <div className="flex flex-col gap-6">
          <Card>
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-ink">Plan templates</h2>
              <button className="flex items-center gap-1 text-sm font-medium text-brand-deep">
                + New plan
              </button>
            </div>
            <div className="mt-4 flex flex-col divide-y divide-border-soft">
              {planTemplates.map((plan) => (
                <div key={plan.name} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium text-ink">{plan.name}</p>
                    <p className="text-xs text-ink-soft">{plan.terms}</p>
                  </div>
                  <StatusBadge status={plan.active ? "Active" : "Off"} />
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-base font-semibold text-ink">Reminder rules</h2>
            <div className="mt-4 flex flex-col gap-3">
              {reminderRules.map((rule) => (
                <Checkbox key={rule.label} label={rule.label} defaultChecked={rule.checked} />
              ))}
            </div>
            <p className="mt-4 text-xs text-ink-faint">
              Reminders go by push notification, SMS and email.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
