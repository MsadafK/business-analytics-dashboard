import React from 'react';
import { FileText, ChevronRight } from 'lucide-react';
import type { AggregatedMetrics, ServiceAnalyticsItem } from '../types/analytics';
import { formatINR } from '../utils/formatters';

interface QuotationAnalyticsSectionProps {
  curr: AggregatedMetrics;
  serviceAnalytics: ServiceAnalyticsItem[];
  onViewLeadHistory: () => void;
}

export const QuotationAnalyticsSection: React.FC<QuotationAnalyticsSectionProps> = ({
  curr,
  serviceAnalytics,
  onViewLeadHistory,
}) => {
  const sortedByValue = [...serviceAnalytics].sort((a, b) => b.quotedAmount - a.quotedAmount);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-blue-600" />
          <h2 className="text-base font-bold text-slate-900">Quotation Analytics</h2>
        </div>
        <button
          onClick={onViewLeadHistory}
          className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
        >
          View Lead-Wise Quotation History <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4">
        {/* 1. Quotations by Service / Order Category */}
        <div className="xl:col-span-3 bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex flex-col justify-between">
          <h3 className="text-xs font-bold text-slate-800 mb-3">
            Quotations by Service / Order Category
          </h3>
          <div className="h-44 flex items-end justify-between gap-2 pt-4 px-1 border-b border-slate-100">
            {serviceAnalytics.slice(0, 6).map((s) => {
              const maxQ = Math.max(1, ...serviceAnalytics.map((x) => x.quotesCount));
              const hPct = Math.max(12, Math.round((s.quotesCount / maxQ) * 100));
              return (
                <div
                  key={s.service}
                  className="flex-1 flex flex-col items-center h-full justify-end group"
                >
                  <span className="text-[10px] font-bold text-slate-700 mb-1">
                    {s.quotesCount}
                  </span>
                  <div
                    className="w-full bg-blue-600 rounded-t-md transition-all group-hover:bg-blue-700"
                    style={{ height: `${hPct}%` }}
                  ></div>
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-6 gap-1 pt-2 text-[9px] text-slate-500 text-center">
            {serviceAnalytics.slice(0, 6).map((s) => (
              <div key={s.service} className="truncate" title={s.service}>
                {s.shortName}
              </div>
            ))}
          </div>
        </div>

        {/* 2. Quotation Value by Service (Centered Funnel) */}
        <div className="xl:col-span-3 bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex flex-col justify-between">
          <h3 className="text-xs font-bold text-slate-800 mb-3">Quotation Value by Service</h3>
          <div className="space-y-2 my-auto">
            {(() => {
              const totalQVal = Math.max(
                1,
                sortedByValue.reduce((acc, s) => acc + s.quotedAmount, 0)
              );
              const funnelColors = [
                'bg-blue-600',
                'bg-cyan-500',
                'bg-emerald-500',
                'bg-amber-400',
                'bg-orange-500',
                'bg-indigo-500',
              ];
              return sortedByValue.slice(0, 6).map((s, idx) => {
                const pct = Math.round((s.quotedAmount / totalQVal) * 100);
                const widthPct = Math.max(36, 100 - idx * 12);
                return (
                  <div
                    key={s.service}
                    className="grid grid-cols-12 items-center gap-1.5 text-[10px] 2xl:text-[11px]"
                  >
                    <div className="col-span-5 flex justify-center">
                      <div
                        className={`${funnelColors[idx]} h-5 text-white text-[9px] font-bold flex items-center justify-center shadow-2xs`}
                        style={{
                          width: `${widthPct}%`,
                          clipPath: 'polygon(0 0, 100% 0, 90% 100%, 10% 100%)',
                        }}
                      >
                        {pct}%
                      </div>
                    </div>
                    <span className="col-span-3 text-slate-600 truncate" title={s.service}>
                      {s.shortName}
                    </span>
                    <span className="col-span-4 text-right font-bold text-slate-800 whitespace-nowrap">
                      {formatINR(s.quotedAmount)} ({pct}%)
                    </span>
                  </div>
                );
              });
            })()}
          </div>
        </div>

        {/* 3. Service Wise Quotation Details Table - Fits 100% at 1440px */}
        <div className="md:col-span-2 xl:col-span-4 bg-white rounded-xl border border-slate-200 p-4 shadow-2xs overflow-x-auto">
          <h3 className="text-xs font-bold text-slate-800 mb-3">
            Service Wise Quotation Details
          </h3>
          <table className="w-full text-left border-collapse text-[10px] 2xl:text-[11px]">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400">
                <th className="pb-2 pr-1.5 font-semibold">Service / Order</th>
                <th className="pb-2 px-1 font-semibold text-right">Quotes</th>
                <th className="pb-2 px-1 font-semibold text-right">Quoted Amt</th>
                <th className="pb-2 px-1 font-semibold text-right">Accepted</th>
                <th className="pb-2 px-1 font-semibold text-right">Pending</th>
                <th className="pb-2 px-1 font-semibold text-right">Rejected</th>
                <th className="pb-2 pl-1 font-semibold text-right">Conv.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {serviceAnalytics.slice(0, 5).map((s) => (
                <tr key={s.service} className="hover:bg-slate-50">
                  <td
                    className="py-2.5 pr-1.5 font-medium text-slate-800 truncate max-w-[115px] 2xl:max-w-[150px]"
                    title={s.service}
                  >
                    {s.service}
                  </td>
                  <td className="py-2.5 px-1 text-right font-semibold">{s.quotesCount}</td>
                  <td className="py-2.5 px-1 text-right text-slate-600 whitespace-nowrap">
                    {formatINR(s.quotedAmount)}
                  </td>
                  <td className="py-2.5 px-1 text-right text-emerald-600 font-semibold">
                    {s.accepted}
                  </td>
                  <td className="py-2.5 px-1 text-right text-amber-600">{s.pending}</td>
                  <td className="py-2.5 px-1 text-right text-rose-500">{s.rejected}</td>
                  <td className="py-2.5 pl-1 text-right font-bold text-slate-900">
                    {s.convRate}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 4. Quote to Deal Conversion Rate */}
        <div className="md:col-span-2 xl:col-span-2 bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex flex-col items-center justify-between">
          <h3 className="text-xs font-bold text-slate-800 self-start">
            Quote to Deal Conversion Rate
          </h3>
          <div className="relative w-28 h-28 flex items-center justify-center my-3">
            <svg viewBox="0 0 36 36" className="w-28 h-28 -rotate-90">
              <circle cx="18" cy="18" r="14" fill="none" stroke="#e2e8f0" strokeWidth="4" />
              <circle
                cx="18"
                cy="18"
                r="14"
                fill="none"
                stroke="#2563eb"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${curr.quoteToDealRate} ${100 - curr.quoteToDealRate}`}
              />
            </svg>
            <span className="absolute text-lg font-extrabold text-slate-900">
              {curr.quoteToDealRate}%
            </span>
          </div>
          <div className="text-[11px] text-slate-500 font-medium text-center">
            {curr.deals.length} Deals / {curr.quotations.length} Quotations
          </div>
        </div>
      </div>
    </div>
  );
};