import { TrendingUp } from "lucide-react";
import { Sparkline } from "@/components/sparkline";
import { LoginForm } from "@/components/login-form";
import { salesData } from "@/lib/data";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      <div className="mesh-brand bg-grain relative hidden w-[46%] flex-col justify-between overflow-hidden p-12 text-white lg:flex">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 text-[13px] font-semibold font-figure">
            TB
          </div>
          <span className="text-[15px] font-semibold">TOPBUY</span>
        </div>

        <div className="max-w-md">
          <p className="text-sm font-medium text-white/60">Store operations</p>
          <h1 className="mt-3 text-[34px] leading-[1.15] font-semibold tracking-tight">
            Every order, TracPay plan and Naira moving through your store, in one place.
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-white/65">
            Track sales, manage inventory and chase down overdue TracPay payments
            without juggling spreadsheets.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/8 p-5 backdrop-blur-sm">
            <div>
              <p className="text-xs text-white/55">Revenue this month</p>
              <p className="font-figure mt-1 text-2xl font-semibold">₦4,820,000</p>
              <p className="mt-1 flex items-center gap-1 text-xs text-white/70">
                <TrendingUp className="h-3.5 w-3.5" />
                +12% vs last month
              </p>
            </div>
            <Sparkline
              data={salesData.map((d) => d.full)}
              stroke="#ffffff"
              fill="rgba(255,255,255,0.12)"
              width={110}
              height={48}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur-sm">
              <p className="text-xs text-white/55">Active TracPay plans</p>
              <p className="font-figure mt-1 text-xl font-semibold">87</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur-sm">
              <p className="text-xs text-white/55">Orders</p>
              <p className="font-figure mt-1 text-xl font-semibold">312</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center bg-canvas px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-[13px] font-semibold text-white font-figure">
              TB
            </div>
            <span className="text-[15px] font-semibold text-ink">TOPBUY</span>
          </div>

          <h2 className="text-2xl font-semibold tracking-tight text-ink">Welcome back</h2>
          <p className="mt-1.5 text-sm text-ink-soft">
            Sign in to manage your store.
          </p>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}
