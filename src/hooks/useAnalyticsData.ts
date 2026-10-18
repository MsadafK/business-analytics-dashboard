import { useMemo } from 'react';
import type {
  DatePreset,
  Lead,
  AggregatedMetrics,
  DailyTrendItem,
  ServiceAnalyticsItem,
  SourceBreakdownItem,
  LeadSource,
} from '../types/analytics';
import { DATASET, SERVICES, SOURCES } from '../data/mockData';
import { computeDateWindows } from '../utils/formatters';

const computeMetrics = (leadList: Lead[]): AggregatedMetrics => {
  const totalLeads = leadList.length;
  const qualifiedLeads = leadList.filter(
    (l) => l.status === 'Qualified' || l.status === 'Converted'
  ).length;
  const convertedLeads = leadList.filter((l) => l.status === 'Converted').length;
  const unqualifiedLeads = leadList.filter((l) => l.status === 'Unqualified').length;
  const conversionRate =
    totalLeads > 0 ? Number(((convertedLeads / totalLeads) * 100).toFixed(1)) : 0;

  const quotations = leadList.flatMap((l) => l.quotations);
  const deals = leadList.flatMap((l) => l.deals);
  const orders = deals.flatMap((d) => d.orders);
  const payments = deals.flatMap((d) => d.payments);

  const totalDealValue = deals.reduce((acc, d) => acc + d.dealValue, 0);
  const collectedRevenue = deals.reduce((acc, d) => acc + d.collectedAmount, 0);
  const outstandingRevenue = Math.max(0, totalDealValue - collectedRevenue);
  const quoteToDealRate =
    quotations.length > 0 ? Number(((deals.length / quotations.length) * 100).toFixed(1)) : 0;

  return {
    totalLeads,
    qualifiedLeads,
    convertedLeads,
    unqualifiedLeads,
    conversionRate,
    quotations,
    deals,
    orders,
    payments,
    invoicesCount: orders.length + payments.length,
    totalDealValue,
    collectedRevenue,
    outstandingRevenue,
    quoteToDealRate,
  };
};

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

  const filterLeadsByWindow = (sDate: string, eDate: string): Lead[] => {
    return DATASET.leads.filter((lead) => {
      const inDate = lead.createdAt >= sDate && lead.createdAt <= eDate;
      const inUser =
        selectedUser === 'All Users' ||
        lead.salesRep === selectedUser ||
        lead.deals.some((d) => d.orders.some((o) => o.assignedOps === selectedUser));
      const inDept = selectedDept === 'All Departments' || lead.department === selectedDept;
      return inDate && inUser && inDept;
    });
  };

  const currentLeads = useMemo(
    () => filterLeadsByWindow(dateWindows.startStr, dateWindows.endStr),
    [dateWindows, selectedUser, selectedDept]
  );

  const prevLeads = useMemo(
    () => filterLeadsByWindow(dateWindows.prevStartStr, dateWindows.prevEndStr),
    [dateWindows, selectedUser, selectedDept]
  );

  const curr = useMemo(() => computeMetrics(currentLeads), [currentLeads]);
  const prev = useMemo(() => computeMetrics(prevLeads), [prevLeads]);

  const dailyTrends = useMemo<DailyTrendItem[]>(() => {
    const map: Record<string, DailyTrendItem> = {};

    currentLeads.forEach((l) => {
      if (!map[l.createdAt]) {
        const dObj = new Date(l.createdAt);
        map[l.createdAt] = {
          date: l.createdAt,
          label: `${dObj.getDate()} ${dObj.toLocaleString('en-US', { month: 'short' })}`,
          newLeads: 0,
          qualified: 0,
          converted: 0,
          revenue: 0,
          collected: 0,
        };
      }
      map[l.createdAt].newLeads += 1;
      if (l.status === 'Qualified' || l.status === 'Converted') map[l.createdAt].qualified += 1;
      if (l.status === 'Converted') map[l.createdAt].converted += 1;

      l.deals.forEach((d) => {
        map[l.createdAt].revenue += d.dealValue;
        map[l.createdAt].collected += d.collectedAmount;
      });
    });

    return Object.values(map).sort((a, b) => (a.date > b.date ? 1 : -1));
  }, [currentLeads]);

  const serviceAnalytics = useMemo<ServiceAnalyticsItem[]>(() => {
    return SERVICES.map((service) => {
      const sQuotes = curr.quotations.filter((q) => q.service === service);
      const quotedAmount = sQuotes.reduce((s, q) => s + q.amount, 0);
      const accepted = sQuotes.filter((q) => q.status === 'Accepted').length;
      const pending = sQuotes.filter((q) => q.status === 'Pending').length;
      const rejected = sQuotes.filter((q) => q.status === 'Rejected').length;
      const convRate = sQuotes.length > 0 ? Math.round((accepted / sQuotes.length) * 100) : 0;

      const sDeals = curr.deals.filter((d) => d.service === service);
      const dealRevenue = sDeals.reduce((s, d) => s + d.dealValue, 0);
      const collected = sDeals.reduce((s, d) => s + d.collectedAmount, 0);

      const sOrders = curr.orders.filter((o) => o.service === service);
      const orderPending = sOrders.filter((o) => o.stage === 'Pending').length;
      const orderInProgress = sOrders.filter((o) => o.stage === 'In Progress').length;
      const orderCompleted = sOrders.filter((o) => o.stage === 'Completed').length;
      const orderOnHold = sOrders.filter((o) => o.stage === 'On Hold').length;

      return {
        service,
        shortName: service.replace(' Registration', '').replace(' Company', ''),
        quotesCount: sQuotes.length,
        quotedAmount,
        accepted,
        pending,
        rejected,
        convRate,
        dealsCount: sDeals.length,
        dealRevenue,
        collected,
        ordersTotal: sOrders.length,
        orderPending,
        orderInProgress,
        orderCompleted,
        orderOnHold,
      };
    }).sort((a, b) => b.quotesCount - a.quotesCount);
  }, [curr]);

  const sourceBreakdown = useMemo<SourceBreakdownItem[]>(() => {
    const colors: Record<LeadSource, string> = {
      'Google Ads': '#2563eb',
      Website: '#10b981',
      'Just Dial': '#f59e0b',
      Other: '#8b5cf6',
    };
    return SOURCES.map((src) => {
      const count = currentLeads.filter((l) => l.source === src).length;
      const pct = curr.totalLeads > 0 ? Number(((count / curr.totalLeads) * 100).toFixed(1)) : 0;
      return { source: src, count, pct, color: colors[src] };
    });
  }, [currentLeads, curr.totalLeads]);

  const filteredActivities = useMemo(
    () =>
      DATASET.activities.filter(
        (a) => a.date >= dateWindows.startStr && a.date <= dateWindows.endStr
      ),
    [dateWindows]
  );

  return {
    dateWindows,
    currentLeads,
    curr,
    prev,
    dailyTrends,
    serviceAnalytics,
    sourceBreakdown,
    filteredActivities,
  };
}