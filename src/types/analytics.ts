export type LeadStatus = 'New' | 'Qualified' | 'Converted' | 'Unqualified';
export type LeadSource = 'Google Ads' | 'Website' | 'Just Dial' | 'Other';
export type DatePreset = 'today' | '7d' | '30d' | 'oct' | 'custom';

export type ServiceCategory =
  | 'Private Limited Company'
  | 'LLP Registration'
  | 'Trademark'
  | 'Startup India Registration'
  | 'ISO Certification'
  | 'GST & Annual Compliance'
  | 'FSSAI License';

export type QuoteStatus = 'Accepted' | 'Pending' | 'Rejected';
export type Priority = 'High' | 'Medium' | 'Low';
export type OrderStage = 'Pending' | 'In Progress' | 'Completed' | 'On Hold';
export type PaymentMode = 'UPI' | 'NEFT/RTGS' | 'Credit Card' | 'Razorpay';

export interface Payment {
  id: string;
  dealId: string;
  orderId: string;
  amount: number;
  date: string;
  mode: PaymentMode;
  status: 'Success' | 'Pending';
  recordedBy: string;
}

export interface Order {
  id: string;
  dealId: string;
  leadId: string;
  service: ServiceCategory;
  stage: OrderStage;
  totalStages: number;
  completedStages: number;
  isOverdue: boolean;
  assignedOps: string;
  createdAt: string;
  updatedAt: string;
}

export interface Deal {
  id: string;
  leadId: string;
  quotationId: string;
  service: ServiceCategory;
  priority: Priority;
  dealValue: number;
  collectedAmount: number;
  progress: number;
  salesRep: string;
  createdAt: string;
  orders: Order[];
  payments: Payment[];
}

export interface Quotation {
  id: string;
  leadId: string;
  service: ServiceCategory;
  amount: number;
  status: QuoteStatus;
  salesRep: string;
  createdAt: string;
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: LeadStatus;
  source: LeadSource;
  salesRep: string;
  department: 'Sales' | 'Operations' | 'Enterprise';
  createdAt: string;
  quotations: Quotation[];
  deals: Deal[];
}

export interface CRMActivity {
  id: string;
  timestamp: string;
  date: string;
  employee: string;
  department: 'Sales' | 'Operations' | 'Enterprise';
  action: string;
  recordId: string;
  leadId: string;
}

export interface DateWindows {
  startStr: string;
  endStr: string;
  prevStartStr: string;
  prevEndStr: string;
  diffDays: number;
}

export interface AggregatedMetrics {
  totalLeads: number;
  qualifiedLeads: number;
  convertedLeads: number;
  unqualifiedLeads: number;
  conversionRate: number;
  quotations: Quotation[];
  deals: Deal[];
  orders: Order[];
  payments: Payment[];
  invoicesCount: number;
  totalDealValue: number;
  collectedRevenue: number;
  outstandingRevenue: number;
  quoteToDealRate: number;
}

export interface DailyTrendItem {
  date: string;
  label: string;
  newLeads: number;
  qualified: number;
  converted: number;
  revenue: number;
  collected: number;
}

export interface ServiceAnalyticsItem {
  service: ServiceCategory;
  shortName: string;
  quotesCount: number;
  quotedAmount: number;
  accepted: number;
  pending: number;
  rejected: number;
  convRate: number;
  dealsCount: number;
  dealRevenue: number;
  collected: number;
  ordersTotal: number;
  orderPending: number;
  orderInProgress: number;
  orderCompleted: number;
  orderOnHold: number;
}

export interface SourceBreakdownItem {
  source: LeadSource;
  count: number;
  pct: number;
  color: string;
}