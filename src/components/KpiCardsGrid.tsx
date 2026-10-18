import React from 'react';
import {
  Users,
  CheckCircle2,
  TrendingUp,
  XCircle,
  Percent,
  FileText,
  Briefcase,
  Receipt,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import type { AggregatedMetrics } from '../types/analytics';
import { calcDelta } from '../utils/formatters';

interface KpiCardsGridProps {
  curr: AggregatedMetrics;
  prev: AggregatedMetrics;
  diffDays: number;
  onCardClick: () => void;
}

export const KpiCardsGrid: React.FC<KpiCardsGridProps> = ({
  curr,
  prev,
  diffDays,
  onCardClick,
}) => {
  const kpis = [
    {
      title: 'New Leads',
      val: curr.totalLeads,
      delta: calcDelta(curr.totalLeads, prev.totalLeads),
      icon: Users,
      iconBg: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Qualified Leads',
      val: curr.qualifiedLeads,
      subVal: `${curr.totalLeads ? ((curr.qualifiedLeads / curr.totalLeads) * 100).toFixed(1) : 0}%`,
      subLabel: 'Qualified %',
      delta: calcDelta(curr.qualifiedLeads, prev.qualifiedLeads),
      icon: CheckCircle2,
      iconBg: 'bg-emerald-50 text-emerald-600',
    },
    {
      title: 'Converted Leads',
      val: curr.convertedLeads,
      subVal: `${curr.conversionRate}%`,
      subLabel: 'Conversion %',
      delta: calcDelta(curr.convertedLeads, prev.convertedLeads),
      icon: TrendingUp,
      iconBg: 'bg-teal-50 text-teal-600',
    },
    {
      title: 'Unqualified Leads',
      val: curr.unqualifiedLeads,
      subVal: `${curr.totalLeads ? ((curr.unqualifiedLeads / curr.totalLeads) * 100).toFixed(1) : 0}%`,
      subLabel: 'Unqualified %',
      delta: calcDelta(curr.unqualifiedLeads, prev.unqualifiedLeads),
      icon: XCircle,
      iconBg: 'bg-rose-50 text-rose-600',
    },
    {
      title: 'Conversion Rate',
      val: `${curr.conversionRate}%`,
      delta: calcDelta(curr.conversionRate, prev.conversionRate),
      icon: Percent,
      iconBg: 'bg-cyan-50 text-cyan-600',
    },
    {
      title: 'Quotations Created',
      val: curr.quotations.length,
      delta: calcDelta(curr.quotations.length, prev.quotations.length),
      icon: FileText,
      iconBg: 'bg-emerald-50 text-emerald-600',
    },
    {
      title: 'Deals Created',
      val: curr.deals.length,
      delta: calcDelta(curr.deals.length, prev.deals.length),
      icon: Briefcase,
      iconBg: 'bg-purple-50 text-purple-600',
    },
    {
      title: 'Invoices Generated',
      val: curr.invoicesCount,
      delta: calcDelta(curr.invoicesCount, prev.invoicesCount),
      icon: Receipt,
      iconBg: 'bg-emerald-50 text-emerald-600',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-2.5 sm:gap-3">
      {kpis.map((kpi, idx) => {
        const Icon = kpi.icon;
        const isPos = kpi.delta >= 0;
        return (
          <div
            key={idx}
            onClick={onCardClick}
            className="bg-white rounded-xl border border-slate-200/90 p-2.5 sm:p-3 shadow-2xs hover:shadow-md hover:border-blue-200 transition cursor-pointer flex flex-col justify-between min-w-0"
          >
            {/* Card Title */}
            <div className="flex items-start gap-1.5">
              <div className={`p-1.5 rounded-lg shrink-0 ${kpi.iconBg}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] font-semibold text-slate-600 leading-tight">
                {kpi.title}
              </span>
            </div>

            {/* Main Metric & Sub-percentage */}
            <div className="my-2 flex items-baseline justify-between gap-1">
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {kpi.val}
              </span>
              {kpi.subVal && (
                <div className="text-right shrink-0">
                  <div className="text-[11px] font-bold text-slate-800">{kpi.subVal}</div>
                  <div className="text-[9px] text-slate-400 leading-none">{kpi.subLabel}</div>
                </div>
              )}
            </div>

            {/* Period Comparison Footer */}
            <div className="flex flex-wrap items-center gap-x-1 text-[10px] leading-tight">
              <span
                className={`inline-flex items-center font-bold shrink-0 ${
                  isPos ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {isPos ? (
                  <ArrowUpRight className="w-2.5 h-2.5" />
                ) : (
                  <ArrowDownRight className="w-2.5 h-2.5" />
                )}
                {Math.abs(kpi.delta)}%
              </span>
              <span className="text-slate-400">vs. previous {diffDays} days</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};