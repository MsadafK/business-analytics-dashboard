import React from 'react';
import { TrendingUp } from 'lucide-react';
import type {
  AggregatedMetrics,
  DailyTrendItem,
  SourceBreakdownItem,
} from '../types/analytics';
import { MONTHLY_TARGET } from '../data/mockData';
import { formatINR } from '../utils/formatters';

interface LeadAnalyticsSectionProps {
  curr: AggregatedMetrics;
  dailyTrends: DailyTrendItem[];
  sourceBreakdown: SourceBreakdownItem[];
  onDrillDown: () => void;
}

export const LeadAnalyticsSection: React.FC<LeadAnalyticsSectionProps> = ({
  curr,
  dailyTrends,
  sourceBreakdown,
  onDrillDown,
}) => {
  const targetAchievedPct = Math.min(
    100,
    Number(((curr.collectedRevenue / MONTHLY_TARGET) * 100).toFixed(1))
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4">
      {/* 1. Target Achievement */}
      <div className="xl:col-span-3 bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
            <TrendingUp className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">Target Achievement</h3>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 my-3">
          <div className="flex-1 space-y-2 min-w-0">
            <div className="text-[11px] text-slate-500">Monthly Revenue Target</div>
            <div className="text-xl font-extrabold text-slate-900">{formatINR(MONTHLY_TARGET)}</div>

            <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>Achieved
                </span>
                <div className="text-right">
                  <span className="font-bold text-slate-800">
                    {formatINR(curr.collectedRevenue)}
                  </span>
                  <span className="text-[11px] text-slate-400 ml-1.5">{targetAchievedPct}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0"></span>Remaining
                </span>
                <div className="text-right">
                  <span className="font-bold text-slate-800">
                    {formatINR(Math.max(0, MONTHLY_TARGET - curr.collectedRevenue))}
                  </span>
                  <span className="text-[11px] text-slate-400 ml-1.5">
                    {(100 - targetAchievedPct).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Trapezoid Funnel Graphic */}
          <div className="flex flex-col items-center justify-center shrink-0">
            <div className="text-[10px] text-slate-400 mb-1.5 text-center font-medium">
              Target vs Achieved
            </div>
            <div className="w-28 h-28 flex flex-col items-center justify-end">
              <div
                className="w-28 bg-indigo-400/90 text-white text-[10px] font-semibold flex flex-col items-center justify-center shadow-2xs"
                style={{
                  height: '72%',
                  clipPath: 'polygon(0 0, 100% 0, 82% 100%, 18% 100%)',
                }}
              >
                <span>Remaining</span>
                <span className="text-[9px] opacity-90">{(100 - targetAchievedPct).toFixed(1)}%</span>
              </div>
              <div
                className="w-20 bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center rounded-b-md mt-0.5 shadow-2xs"
                style={{
                  height: '26%',
                  clipPath: 'polygon(8% 0, 92% 0, 80% 100%, 20% 100%)',
                }}
              >
                {targetAchievedPct}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Lead Funnel */}
      <div className="xl:col-span-3 bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex flex-col justify-between">
        <h3 className="text-sm font-bold text-slate-800 mb-2">Lead Funnel</h3>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 my-auto py-1">
          <div className="flex flex-col items-center space-y-1 w-full max-w-[180px]">
            <div
              onClick={onDrillDown}
              className="w-full py-2 bg-blue-600 text-white text-center rounded-t-lg shadow-2xs cursor-pointer hover:opacity-95"
              style={{ clipPath: 'polygon(0 0, 100% 0, 88% 100%, 12% 100%)' }}
            >
              <div className="text-[10px] opacity-90">New Leads</div>
              <div className="text-xs font-extrabold">{curr.totalLeads} (100%)</div>
            </div>
            <div
              onClick={onDrillDown}
              className="w-[78%] py-2 bg-emerald-500 text-white text-center shadow-2xs cursor-pointer hover:opacity-95"
              style={{ clipPath: 'polygon(0 0, 100% 0, 84% 100%, 16% 100%)' }}
            >
              <div className="text-[10px] opacity-90">Qualified</div>
              <div className="text-xs font-extrabold">
                {curr.qualifiedLeads} (
                {curr.totalLeads
                  ? ((curr.qualifiedLeads / curr.totalLeads) * 100).toFixed(1)
                  : 0}
                %)
              </div>
            </div>
            <div
              onClick={onDrillDown}
              className="w-[58%] py-2 bg-amber-500 text-white text-center rounded-b-lg shadow-2xs cursor-pointer hover:opacity-95"
            >
              <div className="text-[10px] opacity-90">Converted</div>
              <div className="text-xs font-extrabold">
                {curr.convertedLeads} ({curr.conversionRate}%)
              </div>
            </div>
          </div>

          <div className="border border-dashed border-indigo-300 bg-indigo-50/40 rounded-lg px-3 py-2 text-center shrink-0">
            <div className="text-[10px] text-indigo-600 font-semibold">Unqualified</div>
            <div className="text-sm font-extrabold text-indigo-900">{curr.unqualifiedLeads}</div>
            <div className="text-[10px] text-indigo-500">
              (
              {curr.totalLeads
                ? ((curr.unqualifiedLeads / curr.totalLeads) * 100).toFixed(1)
                : 0}
              %)
            </div>
          </div>
        </div>
      </div>

      {/* 3. Daily Lead Trend */}
      <div className="xl:col-span-3 bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex flex-col justify-between">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <h3 className="text-sm font-bold text-slate-800">Daily Lead Trend</h3>
          <div className="flex items-center gap-2.5 text-[10px] font-medium">
            <span className="flex items-center gap-1 text-blue-600">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>New Leads
            </span>
            <span className="flex items-center gap-1 text-emerald-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>Qualified
            </span>
            <span className="flex items-center gap-1 text-amber-600">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>Converted
            </span>
          </div>
        </div>

        <div className="h-36 w-full pt-2">
          {dailyTrends.length > 0 ? (
            <svg viewBox="0 0 320 110" className="w-full h-full overflow-visible">
              {[0, 25, 50, 75].map((y, idx) => (
                <line key={idx} x1="0" y1={y} x2="320" y2={y} stroke="#f1f5f9" strokeWidth="1" />
              ))}
              {(() => {
                const maxVal = Math.max(8, ...dailyTrends.map((d) => d.newLeads));
                const getPts = (key: 'newLeads' | 'qualified' | 'converted') =>
                  dailyTrends
                    .map((d, idx) => {
                      const x =
                        dailyTrends.length === 1
                          ? 160
                          : (idx / (dailyTrends.length - 1)) * 300 + 10;
                      const y = 85 - (d[key] / maxVal) * 70;
                      return `${x},${y}`;
                    })
                    .join(' ');

                return (
                  <>
                    <polyline
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="2.2"
                      points={getPts('newLeads')}
                    />
                    <polyline
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2"
                      points={getPts('qualified')}
                    />
                    <polyline
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="2"
                      points={getPts('converted')}
                    />
                    {dailyTrends.map((d, idx) => {
                      const x =
                        dailyTrends.length === 1
                          ? 160
                          : (idx / (dailyTrends.length - 1)) * 300 + 10;
                      return (
                        <g key={d.date}>
                          <circle
                            cx={x}
                            cy={85 - (d.newLeads / maxVal) * 70}
                            r="2.5"
                            fill="#2563eb"
                          />
                          {idx % Math.max(1, Math.floor(dailyTrends.length / 5)) === 0 && (
                            <text
                              x={x}
                              y="102"
                              textAnchor="middle"
                              className="text-[8px] fill-slate-400"
                            >
                              {d.label}
                            </text>
                          )}
                        </g>
                      );
                    })}
                  </>
                );
              })()}
            </svg>
          ) : (
            <div className="h-full flex items-center justify-center text-xs text-slate-400">
              No leads in selected range
            </div>
          )}
        </div>
      </div>

      {/* 4. Lead Sources */}
      <div className="xl:col-span-3 bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex flex-col justify-between">
        <h3 className="text-sm font-bold text-slate-800 mb-2">Lead Sources</h3>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 my-auto">
          <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 36 36" className="w-28 h-28 -rotate-90">
              <circle cx="18" cy="18" r="14" fill="none" stroke="#f1f5f9" strokeWidth="5" />
              {(() => {
                let accum = 0;
                return sourceBreakdown.map((s) => {
                  const dash = `${s.pct} ${100 - s.pct}`;
                  const offset = 100 - accum;
                  accum += s.pct;
                  return (
                    <circle
                      key={s.source}
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      stroke={s.color}
                      strokeWidth="5"
                      strokeDasharray={dash}
                      strokeDashoffset={offset}
                    />
                  );
                });
              })()}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-sm font-extrabold text-slate-900">{curr.totalLeads}</span>
              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">
                Total Leads
              </span>
            </div>
          </div>

          <div className="w-full flex-1 space-y-2 text-xs">
            {sourceBreakdown.map((s) => (
              <div key={s.source} className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 text-slate-600 truncate">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: s.color }}
                  ></span>
                  {s.source}
                </span>
                <span className="font-bold text-slate-800 whitespace-nowrap">
                  {s.count} ({s.pct}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};