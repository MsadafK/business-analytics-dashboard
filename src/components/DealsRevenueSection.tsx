import React from 'react';
import { DollarSign, CheckCircle2 } from 'lucide-react';
import type {
  KpiMetrics,
  DealServiceBar,
  RevenueCategoryRow,
  PriorityRow,
  DailyRevenueBar,
} from '../types/analytics';
import { formatINR } from '../utils/formatters';

interface DealsRevenueSectionProps {
  kpis: KpiMetrics;
  dealServiceBars: DealServiceBar[];
  revenueCategories: RevenueCategoryRow[];
  priorityRows: PriorityRow[];
  dailyRevenueBars: DailyRevenueBar[];
}

export const DealsRevenueSection: React.FC<DealsRevenueSectionProps> = ({
  kpis,
  dealServiceBars,
  revenueCategories,
  priorityRows,
  dailyRevenueBars,
}) => {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center gap-1.5">
        <DollarSign className="w-4 h-4 text-blue-600" />
        <h2 className="text-sm font-bold text-slate-900">Deals & Revenue</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-3.5">
        {/* 1. Deals Created vs Deal Revenue (by Service) */}
        <div className="xl:col-span-3 bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs flex flex-col justify-between">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-xs font-bold text-slate-800 leading-snug">
              Deals Created vs Deal Revenue (by Service)
            </h3>
            <div className="flex items-center gap-2 text-[8.5px] text-slate-500 shrink-0">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>Deals Created
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>Deal Revenue (₹)
              </span>
            </div>
          </div>

          <div className="relative h-38 pt-3">
            {/* Left Y-Axis (80, 60, 40, 20, 0) */}
            <div className="absolute left-0 top-3 bottom-5 flex flex-col justify-between text-[8px] text-slate-400">
              <span>80</span>
              <span>60</span>
              <span>40</span>
              <span>20</span>
              <span>0</span>
            </div>

            {/* Right Y-Axis (30L, 20L, 10L, 0) */}
            <div className="absolute right-0 top-3 bottom-5 flex flex-col justify-between text-[8px] text-slate-400 text-right">
              <span>30L</span>
              <span>20L</span>
              <span>10L</span>
              <span>0</span>
            </div>

            <div className="mx-5 h-full flex flex-col justify-end">
              <div className="grid grid-cols-6 gap-1.5 items-end border-b border-slate-200 pb-0.5 h-28">
                {dealServiceBars.map((b) => (
                  <div key={b.service} className="flex flex-col items-center justify-end h-full">
                    <div className="flex items-center gap-0.5 text-[7.5px] font-bold text-slate-800 mb-0.5 whitespace-nowrap">
                      <span>{b.deals}</span>
                      <span>{b.revenueLabel}</span>
                    </div>
                    <div className="w-full flex items-end justify-center gap-0.5">
                      <div className="w-2 bg-blue-600 h-2 rounded-t-xs"></div>
                      <div className="w-2.5 bg-amber-400 h-3.5 rounded-t-xs"></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-6 gap-1 pt-1.5 text-[8px] text-slate-500 text-center">
                {dealServiceBars.map((b) => (
                  <span key={b.service} className="truncate" title={b.service}>
                    {b.shortLabel}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 2. Revenue by Order / Service Category */}
        <div className="xl:col-span-3 bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs flex flex-col justify-between">
          <h3 className="text-xs font-bold text-slate-800 mb-3">
            Revenue by Order / Service Category
          </h3>
          <div className="space-y-2.5 my-auto">
            {revenueCategories.map((c) => (
              <div key={c.category} className="grid grid-cols-12 items-center gap-2 text-[10.5px]">
                <span className="col-span-4 text-slate-600 truncate" title={c.category}>
                  {c.shortLabel}
                </span>
                <div className="col-span-4 bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#2563eb] h-full rounded-full"
                    style={{ width: `${Math.min(100, c.pct * 2.5)}%` }}
                  ></div>
                </div>
                <span className="col-span-4 text-right font-bold text-slate-800 whitespace-nowrap">
                  {c.revenueLabel} ({c.pct}%)
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Priority Breakdown */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs flex flex-col justify-between">
          <h3 className="text-xs font-bold text-slate-800 mb-2">Priority Breakdown</h3>
          <table className="w-full text-left text-[10.5px] my-auto">
            <thead>
              <tr className="text-slate-400 border-b border-slate-100">
                <th className="pb-2 font-medium">Priority</th>
                <th className="pb-2 font-medium text-right">Deals</th>
                <th className="pb-2 font-medium text-right">Revenue</th>
                <th className="pb-2 font-medium text-right">%</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {priorityRows.map((p) => (
                <tr key={p.priority}>
                  <td className="py-2.5 flex items-center gap-1.5 font-medium text-slate-700">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: p.color }}
                    ></span>
                    {p.priority}
                  </td>
                  <td className="py-2.5 text-right text-slate-700">{p.deals}</td>
                  <td className="py-2.5 text-right text-slate-700 whitespace-nowrap">
                    {formatINR(p.revenue)}
                  </td>
                  <td className="py-2.5 text-right font-bold text-slate-900">{p.pct}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 4. Daily Revenue Trend */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between gap-1 mb-2">
            <h3 className="text-xs font-bold text-slate-800">Daily Revenue Trend</h3>
            <div className="flex items-center gap-1.5 text-[8.5px] text-slate-500">
              <span className="flex items-center gap-0.5 text-blue-600">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>Revenue
              </span>
              <span className="flex items-center gap-0.5 text-emerald-600">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Collected
              </span>
            </div>
          </div>

          <div className="h-36 flex items-end justify-between gap-2 pt-3 border-b border-slate-100 px-1">
            {dailyRevenueBars.map((b) => (
              <div key={b.label} className="flex-1 flex flex-col items-center h-full justify-end">
                <div className="w-full flex items-end justify-center gap-0.5 h-full">
                  <div
                    className="w-1.5 bg-[#2563eb] rounded-t-xs"
                    style={{ height: `${b.revenue}%` }}
                  ></div>
                  <div
                    className="w-1.5 bg-[#10b981] rounded-t-xs"
                    style={{ height: `${b.collected}%` }}
                  ></div>
                </div>
                <span className="text-[7.5px] text-slate-400 mt-1 whitespace-nowrap">
                  {b.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Total vs Collected Revenue */}
        <div className="md:col-span-2 xl:col-span-2 bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs flex flex-col justify-between">
          <h3 className="text-xs font-bold text-slate-800 mb-2">Total vs Collected Revenue</h3>

          <div className="space-y-3 my-auto">
            <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0">
                \$
              </div>
              <div>
                <div className="text-[10px] text-blue-600 font-medium">Total Deal Value</div>
                <div className="text-sm font-extrabold text-blue-900">
                  {formatINR(kpis.totalDealValue)}
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-emerald-600 font-medium">
                  Net Collected Revenue
                </div>
                <div className="text-sm font-extrabold text-emerald-700">
                  {formatINR(kpis.netCollectedRevenue)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};