import { ChevronDown } from "lucide-react";
import { Card } from "@/components/card";
import { Checkbox } from "@/components/checkbox";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-1.5 text-sm font-medium text-ink-soft">{children}</p>;
}

function TextInput({ defaultValue }: { defaultValue?: string }) {
  return (
    <input
      type="text"
      defaultValue={defaultValue}
      className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/25"
    />
  );
}

function Select({ value }: { value: string }) {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-between rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-ink"
    >
      {value}
      <ChevronDown className="h-4 w-4 text-ink-faint" />
    </button>
  );
}

const notificationRules = [
  { label: "New order placed", checked: true },
  { label: "TracPay payment overdue", checked: true },
  { label: "Product running low on stock", checked: true },
  { label: "New staff invite accepted", checked: false },
];

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-[26px] font-semibold tracking-tight text-ink">Settings</h1>
          <p className="mt-1 text-sm text-ink-soft">
            Store details, currency and app preferences
          </p>
        </div>
        <button className="rounded-xl bg-brand px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-deep">
          Save changes
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 flex flex-col gap-6">
          <Card>
            <h2 className="text-base font-semibold text-ink">Store details</h2>
            <div className="mt-4 flex flex-col gap-4">
              <div>
                <FieldLabel>Store name</FieldLabel>
                <TextInput defaultValue="TOPBUY" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FieldLabel>Support email</FieldLabel>
                  <TextInput defaultValue="support@topbuy.ng" />
                </div>
                <div>
                  <FieldLabel>Support phone</FieldLabel>
                  <TextInput defaultValue="+234 801 234 5678" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FieldLabel>Currency</FieldLabel>
                  <Select value="Nigerian Naira (₦)" />
                </div>
                <div>
                  <FieldLabel>Timezone</FieldLabel>
                  <Select value="Africa/Lagos (GMT+1)" />
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-base font-semibold text-ink">TracPay defaults</h2>
            <p className="mt-1 text-sm text-ink-soft">
              Applied to new products unless overridden per product.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <FieldLabel>Default minimum deposit</FieldLabel>
                <TextInput defaultValue="30%" />
              </div>
              <div>
                <FieldLabel>Default plan length</FieldLabel>
                <Select value="3 months" />
              </div>
            </div>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card>
            <h2 className="text-base font-semibold text-ink">Notifications</h2>
            <div className="mt-4 flex flex-col gap-3">
              {notificationRules.map((rule) => (
                <Checkbox key={rule.label} label={rule.label} defaultChecked={rule.checked} />
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-base font-semibold text-ink">Danger zone</h2>
            <p className="mt-1 text-sm text-ink-soft">
              Pausing the store hides it from the shopping app immediately.
            </p>
            <button className="mt-4 w-full rounded-xl border border-red/30 py-2.5 text-sm font-medium text-red hover:bg-red-wash">
              Pause store
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
}
