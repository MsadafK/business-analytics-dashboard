import React from 'react';
import {
  Users,
  CheckCircle2,
  TrendingUp,
  XCircle,
  Filter,
  FileText,
  Briefcase,
  DollarSign,
} from 'lucide-react';
import type { KpiMetrics } from '../types/analytics';

interface KpiCardsGridProps {
  kpis: KpiMetrics;
  diffDays: number;
  onCardClick: () => void;
}

export const KpiCardsGrid: React.FC<KpiCardsGridProps> = ({
  kpis,
  diffDays,
  onCardClick,
}) => {
  const cards = [
    {
      title: 'New Leads',
      val: kpis.newLeads,
      delta: kpis.newLeadsDelta,
      icon: Users,
      iconBg: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Qualified Leads',
      val: kpis.qualifiedLeads,
      subVal: `${kpis.qualifiedPct}%`,
      subLabel: 'Qualified %',
      delta: kpis.qualifiedDelta,
      icon: CheckCircle2,
      iconBg: 'bg-emerald-50 text-emerald-600',
    },
    {
      title: 'Converted Leads',
      val: kpis.convertedLeads,
      subVal: `${kpis.convertedPct}%`,
      subLabel: 'Conversion %',
      delta: kpis.convertedDelta,
      icon: TrendingUp,
      iconBg: 'bg-teal-50 text-teal-600',
    },
    {
      title: 'Unqualified Leads',
      val: kpis.unqualifiedLeads,
      subVal: `${kpis.unqualifiedPct}%`,
      subLabel: 'Unqualified %',
      delta: kpis.unqualifiedDelta,
      icon: XCircle,
      iconBg: 'bg-rose-50 text-rose-500',
    },
    {
      title: 'Conversion Rate',
      val: `${kpis.conversionRate}%`,
      delta: kpis.conversionRateDelta,
      icon: Filter,
      iconBg: 'bg-cyan-50 text-cyan-600',
    },
    {
      title: 'Quotations Created',
      val: kpis.quotationsCreated,
      delta: kpis.quotationsDelta,
      icon: FileText,
      iconBg: 'bg-emerald-50 text-emerald-600',
    },
    {
      title: 'Deals Created',
      val: kpis.dealsCreated,
      delta: kpis.dealsDelta,
      icon: Briefcase,
      iconBg: 'bg-purple-50 text-purple-600',
    },
    {
      title: 'Invoices Generated',
      val: kpis.invoicesGenerated,
      delta: kpis.invoicesDelta,
      icon: DollarSign,
      iconBg: 'bg-emerald-50 text-emerald-600',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3">
      {cards.map((c, i) => {
        const Icon = c.icon;
        return (
          <div
            key={i}
            onClick={onCardClick}
            className="bg-white rounded-xl border border-slate-200/80 p-3 shadow-2xs hover:shadow-md transition cursor-pointer flex flex-col justify-between"
          >
            {/* Header */}
            <div className="flex items-center gap-1.5">
              <div className={`p-1 rounded-md shrink-0 ${c.iconBg}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] font-medium text-slate-600 leading-tight">
                {c.title}
              </span>
            </div>

            {/* Value Row */}
            <div className="my-2.5 flex items-baseline justify-between gap-1">
              <span className="text-xl sm:text-[22px] font-extrabold text-slate-900 tracking-tight">
                {c.val}
              </span>
              {c.subVal && (
                <div className="text-right shrink-0">
                  <div className="text-[11px] font-bold text-slate-800">{c.subVal}</div>
                  <div className="text-[9px] text-slate-400 leading-none mt-0.5">
                    {c.subLabel}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Delta Pill (Exact match to screenshot) */}
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-slate-200/90 bg-slate-50/50 text-[9.5px] w-fit max-w-full">
              <span className="text-emerald-600 font-bold shrink-0">
                ↗ {c.delta}%
              </span>
              <span className="text-slate-400 truncate">
                vs. previous {diffDays} days
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};