import React from 'react';
import { FileText } from 'lucide-react';
import type {
  KpiMetrics,
  QuoteCategoryBar,
  QuoteValueFunnelItem,
  ServiceQuoteDetailRow,
} from '../types/analytics';
import { formatINR } from '../utils/formatters';

interface QuotationAnalyticsSectionProps {
  kpis: KpiMetrics;
  quoteCategories: QuoteCategoryBar[];
  quoteFunnel: QuoteValueFunnelItem[];
  serviceQuoteDetails: ServiceQuoteDetailRow[];
  onRowClick: () => void;
}

export const QuotationAnalyticsSection: React.FC<QuotationAnalyticsSectionProps> = ({
  kpis,
  quoteCategories,
  quoteFunnel,
  serviceQuoteDetails,
  onRowClick,
}) => {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center gap-2">
        <FileText className="w-4 h-4 text-blue-600" />
        <h2 className="text-sm font-bold text-slate-900">Quotation Analytics</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-3.5">
        {/* 1. Quotations by Service / Order Category */}
        <div className="xl:col-span-3 bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs flex flex-col justify-between">
          <h3 className="text-xs font-bold text-slate-800 mb-2">
            Quotations by Service / Order Category
          </h3>

          <div className="relative h-42 pt-2">
            {/* Y-Axis labels (200, 150, 100, 50, 0) */}
            <div className="absolute left-0 top-5 bottom-6 flex flex-col justify-between text-[8px] text-slate-400">
              <span>200</span>
              <span>150</span>
              <span>100</span>
              <span>50</span>
              <span>0</span>
            </div>

            <div className="ml-6 h-full flex flex-col justify-between">
              {/* Top Counts Row (56, 16, 8, 5, 5, 2) */}
              <div className="grid grid-cols-6 gap-1.5 text-center">
                {quoteCategories.map((c) => (
                  <span key={c.service} className="text-[10px] font-bold text-slate-800">
                    {c.count}
                  </span>
                ))}
              </div>

              {/* Bars scaled against 200 */}
              <div className="flex-1 grid grid-cols-6 gap-2 items-end border-b border-slate-200 pb-0.5 pt-4">
                {quoteCategories.map((c) => {
                  const hPct = Math.max(4, Math.min(100, (c.count / 200) * 100));
                  return (
                    <div key={c.service} className="h-full flex items-end justify-center">
                      <div
                        className="w-full bg-[#2563eb] rounded-t-xs"
                        style={{ height: `${hPct}%` }}
                      ></div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom X-axis labels */}
              <div className="grid grid-cols-6 gap-1 pt-1.5 text-[8.5px] text-slate-500 text-center">
                {quoteCategories.map((c) => (
                  <span key={c.service} className="truncate" title={c.service}>
                    {c.shortLabel}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 2. Quotation Value by Service (Inverted Triangle Funnel + Leader Lines) */}
        <div className="xl:col-span-3 bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs flex flex-col justify-between">
          <h3 className="text-xs font-bold text-slate-800 mb-2">Quotation Value by Service</h3>

          <div className="my-auto">
            <svg viewBox="0 0 295 145" className="w-full h-40 overflow-visible">
              {quoteFunnel.map((item, i) => {
                const y1 = 6 + i * 22;
                const y2 = y1 + 20;
                const topHalf = 52 - i * 8;
                const botHalf = 52 - (i + 1) * 8;
                const cx = 56;
                const points = `${cx - topHalf},${y1} ${cx + topHalf},${y1} ${cx + botHalf},${y2} ${cx - botHalf},${y2}`;
                const midY = (y1 + y2) / 2;
                const rightEdgeX = cx + (topHalf + botHalf) / 2;

                return (
                  <g key={item.service}>
                    <polygon points={points} fill={item.color} />
                    {/* Leader Line */}
                    <line
                      x1={rightEdgeX}
                      y1={midY}
                      x2="118"
                      y2={midY}
                      stroke="#cbd5e1"
                      strokeWidth="1"
                    />
                    <circle cx="122" cy={midY} r="2" fill={item.color} />
                    <text
                      x="128"
                      y={midY + 3}
                      className="text-[8.5px] fill-slate-600 font-medium"
                    >
                      {item.service}
                    </text>
                    <text
                      x="292"
                      y={midY + 3}
                      textAnchor="end"
                      className="text-[8.5px] fill-slate-900 font-bold"
                    >
                      {formatINR(item.value)} ({item.pct}%)
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* 3. Service Wise Quotation Details Table */}
        <div className="md:col-span-2 xl:col-span-4 bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs overflow-x-auto">
          <h3 className="text-xs font-bold text-slate-800 mb-3">
            Service Wise Quotation Details
          </h3>
          <table className="w-full text-left border-collapse text-[10.5px]">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400">
                <th className="pb-2 font-medium">Service / Order</th>
                <th className="pb-2 px-1.5 font-medium text-right">Quotations</th>
                <th className="pb-2 px-1.5 font-medium text-right">
                  <div>Quoted</div>
                  <div>Amount</div>
                </th>
                <th className="pb-2 px-1.5 font-medium text-right">Accepted</th>
                <th className="pb-2 px-1.5 font-medium text-right">Pending</th>
                <th className="pb-2 px-1.5 font-medium text-right">Rejected</th>
                <th className="pb-2 pl-1.5 font-medium text-right">
                  <div>Conv.</div>
                  <div>Rate</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {serviceQuoteDetails.map((row) => (
                <tr
                  key={row.service}
                  onClick={onRowClick}
                  className="hover:bg-slate-50 cursor-pointer"
                >
                  <td className="py-2.5 pr-2 font-semibold text-slate-800 whitespace-nowrap">
                    {row.service}
                  </td>
                  <td className="py-2.5 px-1.5 text-right text-slate-700">{row.quotations}</td>
                  <td className="py-2.5 px-1.5 text-right text-slate-600 whitespace-nowrap">
                    {formatINR(row.quotedAmount)}
                  </td>
                  <td className="py-2.5 px-1.5 text-right text-slate-600">{row.accepted}</td>
                  <td className="py-2.5 px-1.5 text-right text-slate-700">{row.pending}</td>
                  <td className="py-2.5 px-1.5 text-right text-slate-600">{row.rejected}</td>
                  <td className="py-2.5 pl-1.5 text-right font-bold text-slate-900">
                    {row.convRate}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 4. Quote to Deal Conversion Rate */}
        <div className="md:col-span-2 xl:col-span-2 bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs flex flex-col items-center justify-between">
          <h3 className="text-xs font-bold text-slate-800 self-start">
            Quote to Deal Conversion Rate
          </h3>

          <div className="relative w-28 h-28 flex items-center justify-center my-2">
            <svg viewBox="0 0 36 36" className="w-28 h-28 -rotate-90">
              <circle cx="18" cy="18" r="14" fill="none" stroke="#e2e8f0" strokeWidth="3.8" />
              <circle
                cx="18"
                cy="18"
                r="14"
                fill="none"
                stroke="#2563eb"
                strokeWidth="3.8"
                strokeLinecap="round"
                strokeDasharray={`${kpis.quoteToDealRate} ${100 - kpis.quoteToDealRate}`}
              />
            </svg>
            <span className="absolute text-base font-extrabold text-slate-900">
              {kpis.quoteToDealRate}%
            </span>
          </div>

          <div className="text-[11px] text-slate-500 font-medium">
            {kpis.dealsCreated} Deals / {kpis.quotationsCreated} Quotations
          </div>
        </div>
      </div>
    </div>
  );
};