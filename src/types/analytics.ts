export type DatePreset = 'oct' | 'today' | '7d' | '30d' | 'custom';
export type Priority = 'High' | 'Medium' | 'Low';

export interface DateWindows {
  label: string;
  startStr: string;
  endStr: string;
  prevStartStr: string;
  prevEndStr: string;
  diffDays: number;
  scale: number;
}

export interface KpiMetrics {
  newLeads: number;
  newLeadsDelta: number;
  qualifiedLeads: number;
  qualifiedPct: number;
  qualifiedDelta: number;
  convertedLeads: number;
  convertedPct: number;
  convertedDelta: number;
  unqualifiedLeads: number;
  unqualifiedPct: number;
  unqualifiedDelta: number;
  conversionRate: number;
  conversionRateDelta: number;
  quotationsCreated: number;
  quotationsDelta: number;
  dealsCreated: number;
  dealsDelta: number;
  invoicesGenerated: number;
  invoicesDelta: number;
  monthlyTarget: number;
  achievedRevenue: number;
  achievedPct: number;
  remainingRevenue: number;
  remainingPct: number;
  totalDealValue: number;
  netCollectedRevenue: number;
  outstandingRevenue: number;
  quoteToDealRate: number;
}

export interface DailyLeadPoint {
  label: string;
  newLeads: number;
  qualified: number;
  converted: number;
}

export interface LeadSourceItem {
  source: string;
  count: number;
  pct: number;
  badgePct: string;
  color: string;
}

export interface QuoteCategoryBar {
  service: string;
  shortLabel: string;
  count: number;
}

export interface QuoteValueFunnelItem {
  service: string;
  value: number;
  pct: number;
  color: string;
}

export interface ServiceQuoteDetailRow {
  service: string;
  quotations: number;
  quotedAmount: number;
  accepted: number;
  pending: number;
  rejected: number;
  convRate: number;
}

export interface DealServiceBar {
  service: string;
  shortLabel: string;
  deals: number;
  revenue: number;
  revenueLabel: string;
}

export interface RevenueCategoryRow {
  category: string;
  shortLabel: string;
  revenue: number;
  revenueLabel: string;
  pct: number;
}

export interface PriorityRow {
  priority: Priority;
  deals: number;
  revenue: number;
  pct: number;
  color: string;
}

export interface DailyRevenueBar {
  label: string;
  revenue: number;
  collected: number;
}

export interface SalesTeamRow {
  initial: string;
  name: string;
  department: 'Sales' | 'Enterprise';
  leadsHandled: number;
  qualified: number;
  converted: number;
  conversionPct: number;
  quotations: number;
  deals: number;
  dealValue: number;
  revenue: number;
}

export interface OpsTeamRow {
  initial: string;
  name: string;
  color: string;
  department: 'Operations';
  ordersUpdated: number;
  stagesCompleted: number;
  pendingStages: number;
  overdueOrders: number;
}

export interface OrderStageRow {
  service: string;
  shortLabel: string;
  pending: number;
  inProgress: number;
  completed: number;
  onHold: number;
  total: number;
}

export interface CrmActivityRow {
  id: string;
  time: string;
  initial: string;
  employee: string;
  action: string;
  record: string;
  leadId: string;
}

export interface RelationalLeadRecord {
  leadId: string;
  clientName: string;
  company: string;
  source: string;
  status: 'New' | 'Qualified' | 'Converted' | 'Unqualified';
  salesRep: string;
  department: string;
  createdAt: string;
  quotations: {
    id: string;
    service: string;
    amount: number;
    status: 'Accepted' | 'Pending' | 'Rejected';
    date: string;
  }[];
  deals: {
    id: string;
    quoteId: string;
    service: string;
    priority: Priority;
    dealValue: number;
    collected: number;
    progress: number;
    orders: {
      id: string;
      service: string;
      opsRep: string;
      stage: 'Pending' | 'In Progress' | 'Completed' | 'On Hold';
      completedStages: number;
      totalStages: number;
    }[];
    payments: {
      id: string;
      orderId: string;
      amount: number;
      mode: string;
      date: string;
    }[];
  }[];
}