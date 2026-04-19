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
import { chartData } from "@/data";
import { TrendingUp } from "lucide-react";

export function MarketInsight() {
  return (
    <div className="rounded-xl bg-zinc-900/80 border border-zinc-800/60 p-6 mb-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-indigo-400" />
            <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
              Contract Velocity by Sector
            </h2>
          </div>
          <p className="text-zinc-500 text-sm">
            Federal contract award volume (in $B) — trailing 12 months
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-blue-500" />
            <span className="text-zinc-500">Defense</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-zinc-500">Healthcare</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-amber-500" />
            <span className="text-zinc-500">Construction</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-violet-500" />
            <span className="text-zinc-500">Technology</span>
          </div>
        </div>
      </div>

      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="gradDefense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradHealthcare" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradConstruction" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradTechnology" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
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
              tickFormatter={(v) => `$${v}B`}
            />
            <Tooltip
              contentStyle={{
                background: "#18181b",
                border: "1px solid #27272a",
                borderRadius: "8px",
                fontSize: "12px",
                color: "#d4d4d8",
              }}
              formatter={(value: number, name: string) => [
                `$${value.toFixed(1)}B`,
                name.charAt(0).toUpperCase() + name.slice(1),
              ]}
              labelStyle={{ color: "#a1a1aa", marginBottom: "4px" }}
            />
            <Area
              type="monotone"
              dataKey="defense"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#gradDefense)"
            />
            <Area
              type="monotone"
              dataKey="healthcare"
              stroke="#10b981"
              strokeWidth={1.5}
              fill="url(#gradHealthcare)"
            />
            <Area
              type="monotone"
              dataKey="construction"
              stroke="#f59e0b"
              strokeWidth={1.5}
              fill="url(#gradConstruction)"
            />
            <Area
              type="monotone"
              dataKey="technology"
              stroke="#8b5cf6"
              strokeWidth={1.5}
              fill="url(#gradTechnology)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
