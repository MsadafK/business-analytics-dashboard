import { useMemo } from 'react';
import type { DatePreset, KpiMetrics } from '../types/analytics';
import {
  BASE_CRM_ACTIVITIES,
  BASE_DAILY_LEAD_TREND,
  BASE_DAILY_REVENUE_BARS,
  BASE_DEAL_SERVICE_BARS,
  BASE_LEAD_SOURCES,
  BASE_OPS_TEAM,
  BASE_ORDER_STAGES,
  BASE_PRIORITY_ROWS,
  BASE_QUOTE_CATEGORIES,
  BASE_QUOTE_FUNNEL,
  BASE_REVENUE_CATEGORIES,
  BASE_SALES_TEAM,
  BASE_SERVICE_QUOTE_DETAILS,
  RELATIONAL_LEADS,
} from '../data/mockData';
import { computeDateWindows } from '../utils/formatters';

export function useAnalyticsData(
  datePreset: DatePreset,
  customStart: string,
  customEnd: string,
  selectedUser: string,
  selectedDept: string
) {
  const dateWindows = useMemo(
    () => computeDateWindows(datePreset, customStart, customEnd),
    [datePreset, customStart, customEnd]
  );

  // Combined multiplier from Date Filter + User Filter + Dept Filter
  const multiplier = useMemo(() => {
    let m = dateWindows.scale;
    if (selectedUser !== 'All Users') {
      if (selectedUser === 'Nancy Singh') m *= 0.68;
      else if (selectedUser === 'Sneha Choudhary') m *= 0.22;
      else if (selectedUser === 'Tannu Kumari') m *= 0.15;
      else m *= 0.25;
    }
    if (selectedDept !== 'All Departments') {
      if (selectedDept === 'Sales') m *= 0.78;
      else if (selectedDept === 'Operations') m *= 0.45;
      else m *= 0.22;
    }
    return m;
  }, [dateWindows.scale, selectedUser, selectedDept]);

  const sc = (val: number) =>
    multiplier === 1 ? val : Math.max(0, Math.round(val * multiplier));

  const kpis = useMemo<KpiMetrics>(() => {
    const newLeads = sc(91);
    const qualifiedLeads = sc(42);
    const convertedLeads = sc(16);
    const unqualifiedLeads = sc(49);
    const quotationsCreated = sc(107);
    const dealsCreated = sc(23);
    const invoicesGenerated = sc(142);

    const achievedRevenue = sc(102928);
    const monthlyTarget = 8500000;
    const remainingRevenue = Math.max(0, monthlyTarget - achievedRevenue);
    const achievedPct = Number(((achievedRevenue / monthlyTarget) * 100).toFixed(1));
    const remainingPct = Number((100 - achievedPct).toFixed(1));

    const totalDealValue = sc(182627);
    const netCollectedRevenue = sc(120698);
    const outstandingRevenue = Math.max(0, totalDealValue - netCollectedRevenue);

    return {
      newLeads,
      newLeadsDelta: 57.2,
      qualifiedLeads,
      qualifiedPct: 46.2,
      qualifiedDelta: 34.4,
      convertedLeads,
      convertedPct: 25.3,
      convertedDelta: 40.7,
      unqualifiedLeads,
      unqualifiedPct: 53.8,
      unqualifiedDelta: 43,
      conversionRate: 25.3,
      conversionRateDelta: 61.7,
      quotationsCreated,
      quotationsDelta: 127.7,
      dealsCreated,
      dealsDelta: 61.7,
      invoicesGenerated,
      invoicesDelta: 19.7,
      monthlyTarget,
      achievedRevenue,
      achievedPct,
      remainingRevenue,
      remainingPct,
      totalDealValue,
      netCollectedRevenue,
      outstandingRevenue,
      quoteToDealRate: 21.5,
    };
  }, [multiplier]);

  const dailyLeadTrend = useMemo(
    () =>
      BASE_DAILY_LEAD_TREND.map((d) => ({
        ...d,
        newLeads: sc(d.newLeads),
        qualified: sc(d.qualified),
        converted: sc(d.converted),
      })),
    [multiplier]
  );

  const leadSources = useMemo(
    () =>
      BASE_LEAD_SOURCES.map((s) => ({
        ...s,
        count: sc(s.count),
      })),
    [multiplier]
  );

  const quoteCategories = useMemo(
    () =>
      BASE_QUOTE_CATEGORIES.map((c) => ({
        ...c,
        count: sc(c.count),
      })),
    [multiplier]
  );

  const quoteFunnel = useMemo(
    () =>
      BASE_QUOTE_FUNNEL.map((f) => ({
        ...f,
        value: sc(f.value),
      })),
    [multiplier]
  );

  const serviceQuoteDetails = useMemo(
    () =>
      BASE_SERVICE_QUOTE_DETAILS.map((r) => ({
        ...r,
        quotations: sc(r.quotations),
        quotedAmount: sc(r.quotedAmount),
        pending: sc(r.pending),
      })),
    [multiplier]
  );

  const dealServiceBars = useMemo(
    () =>
      BASE_DEAL_SERVICE_BARS.map((b) => {
        const rev = sc(b.revenue);
        return {
          ...b,
          deals: sc(b.deals),
          revenue: rev,
          revenueLabel: `₹${(rev / 1000).toFixed(1)}K`,
        };
      }),
    [multiplier]
  );

  const revenueCategories = useMemo(
    () =>
      BASE_REVENUE_CATEGORIES.map((c) => {
        const rev = sc(c.revenue);
        return {
          ...c,
          revenue: rev,
          revenueLabel: `₹${(rev / 1000).toFixed(1)}K`,
        };
      }),
    [multiplier]
  );

  const priorityRows = useMemo(
    () =>
      BASE_PRIORITY_ROWS.map((p) => ({
        ...p,
        deals: sc(p.deals),
        revenue: sc(p.revenue),
      })),
    [multiplier]
  );

  const dailyRevenueBars = useMemo(() => BASE_DAILY_REVENUE_BARS, []);

  const salesTeam = useMemo(
    () =>
      BASE_SALES_TEAM.filter(
        (m) =>
          (selectedUser === 'All Users' || m.name === selectedUser) &&
          (selectedDept === 'All Departments' || m.department === selectedDept)
      ).map((m) => ({
        ...m,
        leadsHandled: sc(m.leadsHandled),
        qualified: sc(m.qualified),
        converted: sc(m.converted),
        quotations: sc(m.quotations),
        deals: sc(m.deals),
        dealValue: sc(m.dealValue),
        revenue: sc(m.revenue),
      })),
    [multiplier, selectedUser, selectedDept]
  );

  const opsTeam = useMemo(
    () =>
      BASE_OPS_TEAM.filter(
        (m) =>
          (selectedUser === 'All Users' || m.name === selectedUser) &&
          (selectedDept === 'All Departments' || m.department === selectedDept)
      ).map((m) => ({
        ...m,
        ordersUpdated: sc(m.ordersUpdated),
        stagesCompleted: sc(m.stagesCompleted),
        pendingStages: sc(m.pendingStages),
      })),
    [multiplier, selectedUser, selectedDept]
  );

  const orderStages = useMemo(
    () =>
      BASE_ORDER_STAGES.map((o) => {
        const pending = sc(o.pending);
        const completed = sc(o.completed);
        return {
          ...o,
          pending,
          completed,
          total: pending + completed + o.inProgress + o.onHold,
        };
      }),
    [multiplier]
  );

  const crmActivities = useMemo(
    () =>
      BASE_CRM_ACTIVITIES.filter(
        (a) => selectedUser === 'All Users' || a.employee === selectedUser
      ),
    [selectedUser]
  );

  return {
    dateWindows,
    kpis,
    dailyLeadTrend,
    leadSources,
    quoteCategories,
    quoteFunnel,
    serviceQuoteDetails,
    dealServiceBars,
    revenueCategories,
    priorityRows,
    dailyRevenueBars,
    salesTeam,
    opsTeam,
    orderStages,
    crmActivities,
    relationalLeads: RELATIONAL_LEADS,
  };
}