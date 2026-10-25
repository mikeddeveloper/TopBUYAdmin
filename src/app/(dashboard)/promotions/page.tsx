import { Plus, Tag } from "lucide-react";
import { Card } from "@/components/card";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { ProductArt } from "@/components/product-art";
import { promotions } from "@/lib/data";

export default function PromotionsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-[26px] font-semibold tracking-tight text-ink">Promotions</h1>
          <p className="mt-1 text-sm text-ink-soft">
            Discount codes and campaigns · sample data
          </p>
        </div>
        <button className="flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-deep">
          <Plus className="h-4 w-4" />
          New promotion
        </button>
      </div>

      <div className="grid grid-cols-4 gap-5">
        <StatCard label="Active promotions" value="2" note="1 scheduled" accent="brand" />
        <StatCard label="Redemptions" value="2,288" note="this month" accent="blue" />
        <StatCard label="Revenue from promos" value="₦1,640,000" note="vs ₦0 fees waived" accent="amber" />
        <StatCard label="Expiring soon" value="1" note="within 7 days" accent="red" />
      </div>

      <div className="flex flex-col gap-4">
        {promotions.map((promo, index) => (
          <Card key={promo.code} className="card-lift flex items-center justify-between">
            <div className="flex items-center gap-4">
              <ProductArt icon={Tag} index={index} />
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-figure text-sm font-semibold tracking-wide text-ink">
                    {promo.code}
                  </p>
                  <StatusBadge status={promo.status} />
                </div>
                <p className="mt-0.5 text-sm text-ink-soft">{promo.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-8 text-sm">
              <div className="text-right">
                <p className="text-ink-soft">Discount</p>
                <p className="font-figure mt-0.5 font-medium text-ink">{promo.discount}</p>
              </div>
              <div className="text-right">
                <p className="text-ink-soft">Used</p>
                <p className="font-figure mt-0.5 font-medium text-ink">
                  {promo.used} / {promo.limit}
                </p>
              </div>
              <div className="text-right">
                <p className="text-ink-soft">Expires</p>
                <p className="mt-0.5 font-medium text-ink">{promo.expires}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
