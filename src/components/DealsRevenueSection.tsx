import React from 'react';
import { Briefcase, CheckCircle2, Clock } from 'lucide-react';
import type {
  AggregatedMetrics,
  DailyTrendItem,
  Priority,
  ServiceAnalyticsItem,
} from '../types/analytics';
import { formatCompactINR, formatINR } from '../utils/formatters';

interface DealsRevenueSectionProps {
  curr: AggregatedMetrics;
  serviceAnalytics: ServiceAnalyticsItem[];
  dailyTrends: DailyTrendItem[];
}

export const DealsRevenueSection: React.FC<DealsRevenueSectionProps> = ({
  curr,
  serviceAnalytics,
  dailyTrends,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Briefcase className="w-4 h-4 text-blue-600" />
        <h2 className="text-base font-bold text-slate-900">Deals & Revenue</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4">
        {/* 1. Deals Created vs Deal Revenue */}
        <div className="xl:col-span-3 bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-slate-800">
              Deals Created vs Deal Revenue (by Service)
            </h3>
          </div>
          <div className="flex items-center gap-3 text-[10px] mb-2">
            <span className="flex items-center gap-1 text-blue-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>Deals Created
            </span>
            <span className="flex items-center gap-1 text-amber-500 font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>Deal Revenue (₹)
            </span>
          </div>

          <div className="h-36 flex items-end justify-between gap-2 pt-4 px-1 border-b border-slate-100">
            {serviceAnalytics.slice(0, 6).map((s) => {
              const maxRev = Math.max(1, ...serviceAnalytics.map((x) => x.dealRevenue));
              const revPct = Math.max(12, Math.round((s.dealRevenue / maxRev) * 100));
              const dealPct = Math.max(8, Math.min(100, s.dealsCount * 12));
              return (
                <div key={s.service} className="flex-1 flex flex-col items-center h-full justify-end">
                  <span className="text-[9px] font-bold text-slate-700 mb-1">
                    {formatCompactINR(s.dealRevenue)}
                  </span>
                  <div className="w-full flex items-end justify-center gap-1 h-full">
                    <div
                      className="w-2.5 bg-blue-600 rounded-t-xs"
                      style={{ height: `${dealPct}%` }}
                      title={`Deals: ${s.dealsCount}`}
                    ></div>
                    <div
                      className="w-2.5 bg-amber-400 rounded-t-xs"
                      style={{ height: `${revPct}%` }}
                      title={`Revenue: ${formatINR(s.dealRevenue)}`}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-6 gap-1 pt-2 text-[9px] text-slate-500 text-center">
            {serviceAnalytics.slice(0, 6).map((s) => (
              <div key={s.service} className="truncate">
                {s.shortName}
              </div>
            ))}
          </div>
        </div>

        {/* 2. Revenue by Order / Service Category */}
        <div className="xl:col-span-3 bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex flex-col justify-between">
          <h3 className="text-xs font-bold text-slate-800 mb-3">
            Revenue by Order / Service Category
          </h3>
          <div className="space-y-2.5 my-auto">
            {serviceAnalytics.slice(0, 6).map((s) => {
              const pct =
                curr.totalDealValue > 0
                  ? Number(((s.dealRevenue / curr.totalDealValue) * 100).toFixed(1))
                  : 0;
              return (
                <div key={s.service} className="grid grid-cols-12 items-center gap-2 text-[11px]">
                  <span className="col-span-4 text-slate-600 truncate" title={s.service}>
                    {s.shortName}
                  </span>
                  <div className="col-span-4 bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 h-full rounded-full"
                      style={{ width: `${Math.max(6, pct)}%` }}
                    ></div>
                  </div>
                  <span className="col-span-4 text-right font-bold text-slate-800 whitespace-nowrap">
                    {formatCompactINR(s.dealRevenue)} ({pct}%)
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Priority Breakdown & Deal Progress */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-800 mb-3">Priority Breakdown</h3>
            <table className="w-full text-left text-[11px]">
              <thead>
                <tr className="text-slate-400 border-b border-slate-100">
                  <th className="pb-1.5 pr-2">Priority</th>
                  <th className="pb-1.5 px-1 text-center">Deals</th>
                  <th className="pb-1.5 px-1 text-right">Revenue</th>
                  <th className="pb-1.5 pl-1 text-right">%</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {(['High', 'Medium', 'Low'] as Priority[]).map((prio) => {
                  const pDeals = curr.deals.filter((d) => d.priority === prio);
                  const pRev = pDeals.reduce((s, d) => s + d.dealValue, 0);
                  const pct =
                    curr.totalDealValue > 0
                      ? Number(((pRev / curr.totalDealValue) * 100).toFixed(1))
                      : 0;
                  const dotColor =
                    prio === 'High'
                      ? 'bg-rose-500'
                      : prio === 'Medium'
                      ? 'bg-amber-500'
                      : 'bg-emerald-500';
                  return (
                    <tr key={prio}>
                      <td className="py-2 pr-2 flex items-center gap-1.5 font-medium text-slate-700">
                        <span className={`w-2 h-2 rounded-full shrink-0 ${dotColor}`}></span>
                        {prio}
                      </td>
                      <td className="py-2 px-1 text-center font-semibold">{pDeals.length}</td>
                      <td className="py-2 px-1 text-right font-semibold whitespace-nowrap">
                        {formatINR(pRev)}
                      </td>
                      <td className="py-2 pl-1 text-right font-bold text-slate-800">{pct}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="pt-2 border-t border-slate-100 mt-2">
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-slate-500 font-medium">Avg. Deal Progress</span>
              <span className="font-bold text-blue-600">
                {curr.totalDealValue > 0
                  ? Math.round((curr.collectedRevenue / curr.totalDealValue) * 100)
                  : 0}
                %
              </span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full"
                style={{
                  width: `${
                    curr.totalDealValue > 0
                      ? Math.round((curr.collectedRevenue / curr.totalDealValue) * 100)
                      : 0
                  }%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* 4. Daily Revenue Trend */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex flex-col justify-between">
          <div className="flex flex-wrap items-center justify-between gap-1">
            <h3 className="text-xs font-bold text-slate-800">Daily Revenue Trend</h3>
            <div className="flex items-center gap-1.5 text-[9px]">
              <span className="flex items-center gap-1 text-blue-600">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>Revenue
              </span>
              <span className="flex items-center gap-1 text-emerald-600">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Collected
              </span>
            </div>
          </div>

          <div className="h-36 flex items-end justify-between gap-1.5 pt-4 border-b border-slate-100">
            {dailyTrends.slice(-7).map((d) => {
              const maxR = Math.max(1, ...dailyTrends.slice(-7).map((x) => x.revenue));
              const rPct = Math.max(10, Math.round((d.revenue / maxR) * 100));
              const cPct = Math.max(8, Math.round((d.collected / maxR) * 100));
              return (
                <div key={d.date} className="flex-1 flex flex-col items-center h-full justify-end">
                  <div className="w-full flex items-end justify-center gap-0.5 h-full">
                    <div
                      className="w-2 bg-blue-600 rounded-t-xs"
                      style={{ height: `${rPct}%` }}
                      title={`Deal Revenue: ${formatINR(d.revenue)}`}
                    ></div>
                    <div
                      className="w-2 bg-emerald-500 rounded-t-xs"
                      style={{ height: `${cPct}%` }}
                      title={`Collected: ${formatINR(d.collected)}`}
                    ></div>
                  </div>
                  <span className="text-[8px] text-slate-400 mt-1 truncate">{d.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. Total vs Collected & Outstanding Revenue */}
        <div className="md:col-span-2 xl:col-span-2 bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex flex-col justify-between space-y-2">
          <h3 className="text-xs font-bold text-slate-800">Total vs Collected Revenue</h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-1 gap-2">
            <div className="p-2.5 rounded-lg bg-blue-50/70 border border-blue-100 flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-blue-100 text-blue-600 font-bold text-xs shrink-0">
                ₹
              </div>
              <div className="min-w-0">
                <div className="text-[10px] text-blue-600 font-semibold truncate">
                  Total Deal Value
                </div>
                <div className="text-sm font-extrabold text-slate-900">
                  {formatINR(curr.totalDealValue)}
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-100 flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-emerald-100 text-emerald-600 shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] text-emerald-600 font-semibold truncate">
                  Net Collected Revenue
                </div>
                <div className="text-sm font-extrabold text-emerald-700">
                  {formatINR(curr.collectedRevenue)}
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-100 flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-amber-100 text-amber-600 shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] text-amber-700 font-semibold truncate">
                  Outstanding Revenue
                </div>
                <div className="text-sm font-extrabold text-amber-800">
                  {formatINR(curr.outstandingRevenue)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};