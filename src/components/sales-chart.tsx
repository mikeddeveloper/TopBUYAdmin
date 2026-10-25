"use client";

import {
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { salesData } from "@/lib/data";

function formatShort(value: number) {
  if (value === 0) return "0";
  return `${value / 1000000}M`;
}

export function SalesChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={salesData} margin={{ top: 10, right: 8, left: -12, bottom: 0 }}>
        <defs>
          <linearGradient id="fullGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0f7a5c" stopOpacity={0.16} />
            <stop offset="100%" stopColor="#0f7a5c" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="#ece9e2" />
        <XAxis
          dataKey="day"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#9298a0", fontSize: 12 }}
          dy={8}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#9298a0", fontSize: 12 }}
          tickFormatter={formatShort}
          domain={[0, 6000000]}
          ticks={[0, 1500000, 3000000, 4500000, 6000000]}
        />
        <Tooltip
          formatter={(value) => `₦${Number(value).toLocaleString("en-NG")}`}
          contentStyle={{
            borderRadius: 12,
            border: "1px solid #e7e4de",
            fontSize: 12,
          }}
        />
        <Area
          type="monotone"
          dataKey="full"
          stroke="#0f7a5c"
          strokeWidth={2.5}
          fill="url(#fullGradient)"
          dot={false}
          activeDot={{ r: 5, fill: "#0f7a5c", stroke: "#fff", strokeWidth: 2 }}
        />
        <Line
          type="monotone"
          dataKey="installment"
          stroke="#b25f0a"
          strokeWidth={2.5}
          strokeDasharray="6 5"
          dot={false}
          activeDot={{ r: 5, fill: "#b25f0a", stroke: "#fff", strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
