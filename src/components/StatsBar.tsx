import { Building2, DollarSign, Trophy, Users } from "lucide-react";
import type { LeadRecord } from "@/data/dummyData";
import { formatCurrency } from "@/lib/utils";

interface StatsBarProps {
  data: LeadRecord[];
}

export function StatsBar({ data }: StatsBarProps) {
  const totalLeads = data.length;
  const uniqueCompanies = new Set(data.map((item) => item.company_name)).size;
  const firstTimeAwardees = data.filter((item) => item.is_first_time_awardee).length;
  
  const totalAmount = data.reduce((sum, item) => sum + item.award_amount, 0);
  const averageAmount = totalLeads > 0 ? totalAmount / totalLeads : 0;

  const stats = [
    {
      name: "Total Matching Leads",
      value: totalLeads.toLocaleString(),
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      name: "Unique Companies",
      value: uniqueCompanies.toLocaleString(),
      icon: Building2,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
    },
    {
      name: "First-Time Awardees",
      value: firstTimeAwardees.toLocaleString(),
      icon: Trophy,
      color: "text-amber-600",
      bgColor: "bg-amber-100",
    },
    {
      name: "Average Award Size",
      value: formatCurrency(averageAmount),
      icon: DollarSign,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="relative overflow-hidden rounded-lg bg-white p-5 shadow-sm border border-slate-200"
        >
          <dt>
            <div className={`absolute rounded-md p-3 ${stat.bgColor}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} aria-hidden="true" />
            </div>
            <p className="ml-16 truncate text-sm font-medium text-slate-500">
              {stat.name}
            </p>
          </dt>
          <dd className="ml-16 flex items-baseline pb-1 sm:pb-2">
            <p className="text-2xl font-semibold text-slate-900">{stat.value}</p>
          </dd>
        </div>
      ))}
    </div>
  );
}
