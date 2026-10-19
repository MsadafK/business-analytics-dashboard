import React from 'react';
import { Target } from 'lucide-react';
import type {
  KpiMetrics,
  DailyLeadPoint,
  LeadSourceItem,
} from '../types/analytics';
import { formatINR } from '../utils/formatters';

interface LeadAnalyticsSectionProps {
  kpis: KpiMetrics;
  dailyLeadTrend: DailyLeadPoint[];
  leadSources: LeadSourceItem[];
  onDrillDown: () => void;
}

export const LeadAnalyticsSection: React.FC<LeadAnalyticsSectionProps> = ({
  kpis,
  dailyLeadTrend,
  leadSources,
  onDrillDown,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-3.5">
      {/* 1. Target Achievement */}
      <div className="xl:col-span-3 bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center gap-1.5 mb-2">
          <Target className="w-4 h-4 text-blue-600" />
          <h3 className="text-xs font-bold text-slate-800">Target Achievement</h3>
        </div>

        <div className="grid grid-cols-12 gap-2 items-center my-auto">
          {/* Left Numbers */}
          <div className="col-span-6 space-y-1.5">
            <div className="text-[10px] text-slate-400">Monthly Revenue Target</div>
            <div className="text-xl font-extrabold text-slate-900">
              {formatINR(kpis.monthlyTarget)}
            </div>

            <div className="pt-2 space-y-1.5 text-[10.5px]">
              <div className="flex items-center justify-between border-b border-slate-100 pb-1">
                <span className="flex items-center gap-1 text-slate-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Achieved
                </span>
                <span className="font-bold text-slate-800">
                  {formatINR(kpis.achievedRevenue)}
                </span>
                <span className="text-slate-400 text-[9.5px]">{kpis.achievedPct}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 text-slate-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>Remaining
                </span>
                <span className="font-bold text-slate-800">
                  {formatINR(kpis.remainingRevenue)}
                </span>
                <span className="text-slate-400 text-[9.5px]">{kpis.remainingPct}%</span>
              </div>
            </div>
          </div>

          {/* Right Funnel with Callout Lines */}
          <div className="col-span-6 flex flex-col items-center">
            <div className="text-[9.5px] text-slate-500 font-medium mb-1">
              Target vs Achieved (Revenue)
            </div>
            <svg viewBox="0 0 170 105" className="w-full h-26 overflow-visible">
              {/* Top Indigo Trapezoid */}
              <polygon points="10,10 75,10 66,55 19,55" fill="#6366f1" opacity="0.85" />
              {/* Bottom Blue Trapezoid */}
              <polygon points="19,58 66,58 56,96 29,96" fill="#2563eb" />

              {/* Leader Line 1 */}
              <line x1="70" y1="32" x2="92" y2="32" stroke="#cbd5e1" strokeWidth="1" />
              <circle cx="95" cy="32" r="2" fill="#2563eb" />
              <text x="100" y="30" className="text-[7px] fill-slate-500 font-semibold">
                Remaining
              </text>
              <text x="100" y="39" className="text-[6.5px] fill-slate-700 font-bold">
                ₹83,97,072 (98.8%)
              </text>

              {/* Leader Line 2 */}
              <line x1="61" y1="77" x2="92" y2="77" stroke="#cbd5e1" strokeWidth="1" />
              <circle cx="95" cy="77" r="2" fill="#10b981" />
              <text x="100" y="75" className="text-[7px] fill-slate-500 font-semibold">
                Achieved
              </text>
              <text x="100" y="84" className="text-[6.5px] fill-slate-700 font-bold">
                ₹1,02,928 (1.2%)
              </text>
            </svg>
          </div>
        </div>
      </div>

      {/* 2. Lead Funnel */}
      <div className="xl:col-span-3 bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs flex flex-col justify-between">
        <h3 className="text-xs font-bold text-slate-800 mb-1">Lead Funnel</h3>
        <div
          onClick={onDrillDown}
          className="flex items-center justify-center my-auto cursor-pointer"
        >
          <svg viewBox="0 0 260 130" className="w-full h-34 overflow-visible">
            {/* Stage 1: New Leads */}
            <polygon points="20,8 145,8 130,45 35,45" fill="#2563eb" />
            <text x="82.5" y="21" textAnchor="middle" className="text-[8px] fill-white/90">
              New Leads
            </text>
            <text x="82.5" y="32" textAnchor="middle" className="text-[10px] fill-white font-bold">
              {kpis.newLeads}
            </text>
            <text x="82.5" y="41" textAnchor="middle" className="text-[7.5px] fill-white/80">
              (100%)
            </text>

            {/* Stage 2: Qualified */}
            <polygon points="37,48 128,48 114,85 51,85" fill="#22c55e" />
            <text x="82.5" y="61" textAnchor="middle" className="text-[8px] fill-white/90">
              Qualified
            </text>
            <text x="82.5" y="72" textAnchor="middle" className="text-[10px] fill-white font-bold">
              {kpis.qualifiedLeads}
            </text>
            <text x="82.5" y="81" textAnchor="middle" className="text-[7.5px] fill-white/80">
              ({kpis.qualifiedPct}%)
            </text>

            {/* Stage 3: Converted */}
            <polygon points="53,88 112,88 103,124 62,124" fill="#eab308" />
            <text x="82.5" y="101" textAnchor="middle" className="text-[8px] fill-white/90">
              Converted
            </text>
            <text x="82.5" y="112" textAnchor="middle" className="text-[10px] fill-white font-bold">
              {kpis.convertedLeads}
            </text>
            <text x="82.5" y="121" textAnchor="middle" className="text-[7.5px] fill-white/80">
              ({kpis.convertedPct}%)
            </text>

            {/* Dashed Connector Line from Top Stage to Unqualified Box */}
            <polyline
              fill="none"
              stroke="#a5b4fc"
              strokeWidth="1"
              strokeDasharray="3,2"
              points="138,26 205,26 205,58"
            />

            {/* Unqualified Box */}
            <rect
              x="170"
              y="58"
              width="70"
              height="48"
              rx="6"
              fill="#f5f3ff"
              stroke="#a5b4fc"
              strokeWidth="1"
              strokeDasharray="3,2"
            />
            <text
              x="205"
              y="72"
              textAnchor="middle"
              className="text-[7.5px] fill-indigo-600 font-semibold"
            >
              Unqualified
            </text>
            <text
              x="205"
              y="86"
              textAnchor="middle"
              className="text-[11px] fill-indigo-950 font-extrabold"
            >
              {kpis.unqualifiedLeads}
            </text>
            <text x="205" y="98" textAnchor="middle" className="text-[7.5px] fill-indigo-500">
              ({kpis.unqualifiedPct}%)
            </text>
          </svg>
        </div>
      </div>

      {/* 3. Daily Lead Trend */}
      <div className="xl:col-span-3 bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-xs font-bold text-slate-800">Daily Lead Trend</h3>
          <div className="flex items-center gap-2 text-[9.5px] font-medium">
            <span className="flex items-center gap-1 text-blue-600">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>New Leads
            </span>
            <span className="flex items-center gap-1 text-emerald-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Qualified
            </span>
            <span className="flex items-center gap-1 text-amber-500">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>Converted
            </span>
          </div>
        </div>

        <div className="h-34 w-full my-auto">
          <svg viewBox="0 0 330 115" className="w-full h-full overflow-visible">
            {/* Y-Axis Grid & Labels (120, 90, 60, 30, 0) */}
            {[
              { label: '120', y: 10 },
              { label: '90', y: 30 },
              { label: '60', y: 50 },
              { label: '30', y: 70 },
              { label: '0', y: 90 },
            ].map((g) => (
              <g key={g.label}>
                <text x="16" y={g.y + 2.5} textAnchor="end" className="text-[7.5px] fill-slate-400">
                  {g.label}
                </text>
                <line x1="22" y1={g.y} x2="322" y2={g.y} stroke="#f1f5f9" strokeWidth="1" />
              </g>
            ))}

            {(() => {
              const maxY = 120;
              const getCoords = (key: 'newLeads' | 'qualified' | 'converted') =>
                dailyLeadTrend.map((d, idx) => ({
                  x: 26 + (idx / (dailyLeadTrend.length - 1)) * 292,
                  y: 90 - (Math.min(maxY, d[key]) / maxY) * 80,
                }));

              const toSmoothPath = (pts: { x: number; y: number }[]) => {
                if (pts.length === 0) return '';
                let d = `M ${pts[0].x},${pts[0].y}`;
                for (let i = 0; i < pts.length - 1; i++) {
                  const cx = (pts[i].x + pts[i + 1].x) / 2;
                  d += ` C ${cx},${pts[i].y} ${cx},${pts[i + 1].y} ${pts[i + 1].x},${pts[i + 1].y}`;
                }
                return d;
              };

              const newPts = getCoords('newLeads');
              const qualPts = getCoords('qualified');
              const convPts = getCoords('converted');

              return (
                <>
                  <path d={toSmoothPath(newPts)} fill="none" stroke="#2563eb" strokeWidth="1.8" />
                  <path d={toSmoothPath(qualPts)} fill="none" stroke="#10b981" strokeWidth="1.6" />
                  <path d={toSmoothPath(convPts)} fill="none" stroke="#f59e0b" strokeWidth="1.5" />

                  {dailyLeadTrend.map((d, idx) => {
                    const x = 26 + (idx / (dailyLeadTrend.length - 1)) * 292;
                    return (
                      <g key={d.label}>
                        <circle cx={x} cy={newPts[idx].y} r="2" fill="#2563eb" />
                        <circle cx={x} cy={qualPts[idx].y} r="1.8" fill="#10b981" />
                        <circle cx={x} cy={convPts[idx].y} r="1.8" fill="#f59e0b" />
                        <text x={x} y="104" textAnchor="middle" className="text-[7px] fill-slate-400">
                          {d.label}
                        </text>
                      </g>
                    );
                  })}
                </>
              );
            })()}
          </svg>
        </div>
      </div>

      {/* 4. Lead Sources */}
      <div className="xl:col-span-3 bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs flex flex-col justify-between">
        <h3 className="text-xs font-bold text-slate-800 mb-2">Lead Sources</h3>
        <div className="flex items-center justify-between gap-3 my-auto">
          <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 42 42" className="w-28 h-28 -rotate-90 overflow-visible">
              <circle cx="21" cy="21" r="15.915" fill="none" stroke="#f1f5f9" strokeWidth="5.5" />
              <circle
                cx="21"
                cy="21"
                r="15.915"
                fill="none"
                stroke="#2563eb"
                strokeWidth="5.5"
                strokeDasharray="76.9 23.1"
                strokeDashoffset="100"
              />
              <circle
                cx="21"
                cy="21"
                r="15.915"
                fill="none"
                stroke="#10b981"
                strokeWidth="5.5"
                strokeDasharray="23.1 76.9"
                strokeDashoffset="23.1"
              />
            </svg>
            {/* Ring Badges (77% and 23%) */}
            <span className="absolute -bottom-0.5 left-1 bg-blue-700 text-white text-[8px] font-bold px-1 py-0.2 rounded shadow-2xs">
              77%
            </span>
            <span className="absolute top-1 left-2 bg-emerald-600 text-white text-[8px] font-bold px-1 py-0.2 rounded shadow-2xs">
              23%
            </span>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <div className="flex items-baseline gap-0.5">
                <span className="text-sm font-extrabold text-slate-900">{kpis.newLeads}</span>
                <span className="text-[7px] font-bold text-slate-500 uppercase">TOTAL</span>
              </div>
              <span className="text-[7px] uppercase tracking-wider text-slate-400 font-semibold -mt-0.5">
                LEADS
              </span>
            </div>
          </div>

          <div className="flex-1 space-y-2 text-[11px]">
            {leadSources.map((s) => (
              <div key={s.source} className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 text-slate-600">
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