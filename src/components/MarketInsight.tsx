"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp } from "lucide-react";
import { useMarket } from "@/context/MarketContext";

export function MarketInsight() {
  const { market } = useMarket();
  const { vocab, contractChartData, contractChartSeries } = market;

  return (
    <div className="rounded-xl bg-zinc-900/80 border border-zinc-800/60 p-6 mb-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-indigo-400" />
            <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
              {vocab.contractChartTitle}
            </h2>
          </div>
          <p className="text-zinc-500 text-sm">{vocab.contractChartSub}</p>
        </div>
        <div className="flex items-center gap-4 text-xs flex-wrap">
          {contractChartSeries.map((s) => (
            <div key={s.key} className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
              <span className="text-zinc-500">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={contractChartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <defs>
              {contractChartSeries.map((s) => (
                <linearGradient key={s.key} id={`gradContract-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={s.color} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={s.color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
            <XAxis
              dataKey="month"
              stroke="#3f3f46"
              tick={{ fill: "#71717a", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#3f3f46"
              tick={{ fill: "#71717a", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${vocab.contractChartYPrefix}${v}${vocab.contractChartYSuffix}`}
            />
            <Tooltip
              contentStyle={{
                background: "#18181b",
                border: "1px solid #27272a",
                borderRadius: "8px",
                fontSize: "12px",
                color: "#d4d4d8",
              }}
              formatter={(value, name) => {
                const v = typeof value === "number" ? value : Number(value);
                const key = String(name);
                const series = contractChartSeries.find((s) => s.key === key);
                const formatted = vocab.contractChartYSuffix === "B"
                  ? `${vocab.contractChartYPrefix}${v.toFixed(1)}${vocab.contractChartYSuffix}`
                  : `${v.toLocaleString()} ${vocab.contractChartTooltipUnit}`;
                return [formatted, series?.label || key];
              }}
              labelStyle={{ color: "#a1a1aa", marginBottom: "4px" }}
            />
            {contractChartSeries.map((s, i) => (
              <Area
                key={s.key}
                type="monotone"
                dataKey={s.key}
                stroke={s.color}
                strokeWidth={i === 0 ? 2 : 1.5}
                fill={`url(#gradContract-${s.key})`}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
