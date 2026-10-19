import type {
  DailyLeadPoint,
  LeadSourceItem,
  QuoteCategoryBar,
  QuoteValueFunnelItem,
  ServiceQuoteDetailRow,
  DealServiceBar,
  RevenueCategoryRow,
  PriorityRow,
  DailyRevenueBar,
  SalesTeamRow,
  OpsTeamRow,
  OrderStageRow,
  CrmActivityRow,
  RelationalLeadRecord,
} from '../types/analytics';

export const ALL_USERS = [
  'Nancy Singh',
  'Sneha Choudhary',
  'Tannu Kumari',
  'Gaurav Pant',
  'Srishti Upadhyay',
  'Azam Afaroz',
];

export const ALL_DEPARTMENTS = ['Sales', 'Operations', 'Enterprise'];

export const BASE_DAILY_LEAD_TREND: DailyLeadPoint[] = [
  { label: '1 Oct', newLeads: 15, qualified: 4, converted: 1 },
  { label: '4 Oct', newLeads: 29, qualified: 14, converted: 6 },
  { label: '7 Oct', newLeads: 31, qualified: 15, converted: 7 },
  { label: '10 Oct', newLeads: 7, qualified: 4, converted: 2 },
  { label: '13 Oct', newLeads: 5, qualified: 3, converted: 0 },
  { label: '16 Oct', newLeads: 2, qualified: 1, converted: 0 },
  { label: '19 Oct', newLeads: 1, qualified: 1, converted: 0 },
  { label: '22 Oct', newLeads: 1, qualified: 0, converted: 0 },
  { label: '25 Oct', newLeads: 0, qualified: 0, converted: 0 },
  { label: '28 Oct', newLeads: 0, qualified: 0, converted: 0 },
  { label: '31 Oct', newLeads: 0, qualified: 0, converted: 0 },
];

export const BASE_LEAD_SOURCES: LeadSourceItem[] = [
  { source: 'Google Ads', count: 70, pct: 76.9, badgePct: '77%', color: '#2563eb' },
  { source: 'Website', count: 21, pct: 23.1, badgePct: '23%', color: '#10b981' },
  { source: 'Other', count: 0, pct: 0, badgePct: '0%', color: '#f59e0b' },
  { source: 'Just Dial', count: 0, pct: 0, badgePct: '0%', color: '#8b5cf6' },
];

export const BASE_QUOTE_CATEGORIES: QuoteCategoryBar[] = [
  { service: 'Private Limited Company', shortLabel: 'Private Li...', count: 56 },
  { service: 'LLP Registration', shortLabel: 'LLP Regist...', count: 16 },
  { service: 'Trademark', shortLabel: 'Trademark', count: 8 },
  { service: 'Startup India Registration', shortLabel: 'Startup In...', count: 5 },
  { service: 'ISO Certification', shortLabel: 'ISO Certif...', count: 5 },
  { service: 'Penalty', shortLabel: 'Penalty', count: 2 },
];

export const BASE_QUOTE_FUNNEL: QuoteValueFunnelItem[] = [
  { service: 'Private Limited', value: 1250000, pct: 32, color: '#2563eb' },
  { service: 'LLP', value: 875000, pct: 22, color: '#06b6d4' },
  { service: 'GST', value: 640000, pct: 16, color: '#10b981' },
  { service: 'Trademark', value: 420000, pct: 11, color: '#facc15' },
  { service: 'FSSAI', value: 310000, pct: 8, color: '#f97316' },
  { service: 'Annual Compliance', value: 275000, pct: 7, color: '#6366f1' },
];

export const BASE_SERVICE_QUOTE_DETAILS: ServiceQuoteDetailRow[] = [
  {
    service: 'Private Limited Company',
    quotations: 56,
    quotedAmount: 654326,
    accepted: 0,
    pending: 56,
    rejected: 0,
    convRate: 0,
  },
  {
    service: 'LLP Registration',
    quotations: 16,
    quotedAmount: 135272,
    accepted: 0,
    pending: 16,
    rejected: 0,
    convRate: 0,
  },
  {
    service: 'Trademark',
    quotations: 8,
    quotedAmount: 22496,
    accepted: 0,
    pending: 8,
    rejected: 0,
    convRate: 0,
  },
  {
    service: 'Startup India Registration',
    quotations: 5,
    quotedAmount: 22399,
    accepted: 0,
    pending: 5,
    rejected: 0,
    convRate: 0,
  },
  {
    service: 'ISO Certification',
    quotations: 5,
    quotedAmount: 37117,
    accepted: 0,
    pending: 5,
    rejected: 0,
    convRate: 0,
  },
];

export const BASE_DEAL_SERVICE_BARS: DealServiceBar[] = [
  { service: 'Private Limited', shortLabel: 'Private Li...', deals: 3, revenue: 26800, revenueLabel: '₹26.8K' },
  { service: 'General Filing', shortLabel: 'General F...', deals: 2, revenue: 29700, revenueLabel: '₹29.7K' },
  { service: 'Annual Compliance', shortLabel: 'Annual C...', deals: 2, revenue: 7900, revenueLabel: '₹7.9K' },
  { service: 'Name Approval', shortLabel: 'Name Ap...', deals: 2, revenue: 2100, revenueLabel: '₹2.1K' },
  { service: 'Company Registration', shortLabel: 'Company...', deals: 2, revenue: 5000, revenueLabel: '₹5.0K' },
  { service: 'One Person Company', shortLabel: 'One Pers...', deals: 1, revenue: 2000, revenueLabel: '₹2.0K' },
];

export const BASE_REVENUE_CATEGORIES: RevenueCategoryRow[] = [
  { category: 'General Filing', shortLabel: 'General Filing', revenue: 29700, revenueLabel: '₹29.7K', pct: 28.9 },
  { category: 'Private Limited Company', shortLabel: 'Private Limited...', revenue: 26800, revenueLabel: '₹26.8K', pct: 26.0 },
  { category: 'FSSAI License', shortLabel: 'FSSAI License', revenue: 15000, revenueLabel: '₹15.0K', pct: 14.6 },
  { category: 'Annual Compliance', shortLabel: 'Annual Compli...', revenue: 7900, revenueLabel: '₹7.9K', pct: 7.7 },
  { category: 'Website development', shortLabel: 'Website develo...', revenue: 6000, revenueLabel: '₹6.0K', pct: 5.8 },
  { category: 'Other', shortLabel: 'Other', revenue: 6000, revenueLabel: '₹6.0K', pct: 5.8 },
];

export const BASE_PRIORITY_ROWS: PriorityRow[] = [
  { priority: 'High', deals: 14, revenue: 65428, pct: 60.9, color: '#ef4444' },
  { priority: 'Medium', deals: 9, revenue: 37500, pct: 39.1, color: '#f59e0b' },
  { priority: 'Low', deals: 0, revenue: 0, pct: 0, color: '#10b981' },
];

export const BASE_DAILY_REVENUE_BARS: DailyRevenueBar[] = [
  { label: '1 Oct', revenue: 95, collected: 95 },
  { label: '4 Oct', revenue: 95, collected: 95 },
  { label: '7 Oct', revenue: 95, collected: 95 },
  { label: '10 Oct', revenue: 95, collected: 95 },
  { label: '13 Oct', revenue: 95, collected: 95 },
  { label: '16 Oct', revenue: 95, collected: 95 },
];

export const BASE_SALES_TEAM: SalesTeamRow[] = [
  {
    initial: 'N',
    name: 'Nancy Singh',
    department: 'Sales',
    leadsHandled: 65,
    qualified: 32,
    converted: 12,
    conversionPct: 18.5,
    quotations: 54,
    deals: 13,
    dealValue: 99217,
    revenue: 52498,
  },
  {
    initial: 'S',
    name: 'Sneha Choudhary',
    department: 'Sales',
    leadsHandled: 4,
    qualified: 3,
    converted: 2,
    conversionPct: 50,
    quotations: 13,
    deals: 5,
    dealValue: 70980,
    revenue: 40000,
  },
  {
    initial: 'T',
    name: 'Tannu Kumari',
    department: 'Enterprise',
    leadsHandled: 8,
    qualified: 3,
    converted: 2,
    conversionPct: 25,
    quotations: 28,
    deals: 3,
    dealValue: 9430,
    revenue: 7430,
  },
];

export const BASE_OPS_TEAM: OpsTeamRow[] = [
  {
    initial: 'G',
    name: 'Gaurav Pant',
    color: '#0284c7',
    department: 'Operations',
    ordersUpdated: 4,
    stagesCompleted: 17,
    pendingStages: 13,
    overdueOrders: 0,
  },
  {
    initial: 'S',
    name: 'Srishti Upadhyay',
    color: '#0284c7',
    department: 'Operations',
    ordersUpdated: 1,
    stagesCompleted: 0,
    pendingStages: 5,
    overdueOrders: 0,
  },
  {
    initial: 'A',
    name: 'Azam Afaroz',
    color: '#0284c7',
    department: 'Operations',
    ordersUpdated: 0,
    stagesCompleted: 0,
    pendingStages: 0,
    overdueOrders: 0,
  },
];

export const BASE_ORDER_STAGES: OrderStageRow[] = [
  { service: 'Private Limited Company', shortLabel: 'Private Limited...', pending: 8, inProgress: 0, completed: 1, onHold: 0, total: 9 },
  { service: 'ISO Certification', shortLabel: 'ISO Certification', pending: 3, inProgress: 0, completed: 0, onHold: 0, total: 3 },
  { service: 'DSC & DIN Services', shortLabel: 'DSC & DIN Serv...', pending: 2, inProgress: 0, completed: 1, onHold: 0, total: 3 },
  { service: 'Penalty', shortLabel: 'Penalty', pending: 2, inProgress: 0, completed: 0, onHold: 0, total: 2 },
  { service: 'LLP Registration', shortLabel: 'LLP Registration', pending: 2, inProgress: 0, completed: 0, onHold: 0, total: 2 },
];

export const BASE_CRM_ACTIVITIES: CrmActivityRow[] = [
  {
    id: 'act-1',
    time: '2026-10-16T12:14:10.847Z',
    initial: 'N',
    employee: 'Nancy Singh',
    action: 'Lead updated',
    record: '#L-209010',
    leadId: '#L-209010',
  },
  {
    id: 'act-2',
    time: '2026-10-16T12:14:10.838Z',
    initial: 'N',
    employee: 'Nancy Singh',
    action: 'Lead updated',
    record: '#L-209010',
    leadId: '#L-209010',
  },
  {
    id: 'act-3',
    time: '2026-10-16T11:53:02.446Z',
    initial: 'S',
    employee: 'Sneha Choudhary',
    action: 'Payment recorded',
    record: '#P-1081',
    leadId: '#L-209011',
  },
  {
    id: 'act-4',
    time: '2026-10-16T11:53:02.436Z',
    initial: 'S',
    employee: 'Sneha Choudhary',
    action: 'Order created',
    record: '#O-2168',
    leadId: '#L-209011',
  },
  {
    id: 'act-5',
    time: '2026-10-16T11:53:02.431Z',
    initial: 'S',
    employee: 'Sneha Choudhary',
    action: 'Deal created',
    record: '#D-822',
    leadId: '#L-209011',
  },
  {
    id: 'act-6',
    time: '2026-10-16T11:48:28.572Z',
    initial: 'S',
    employee: 'Sneha Choudhary',
    action: 'Quotation created',
    record: '#Q-10467',
    leadId: '#L-209011',
  },
  {
    id: 'act-7',
    time: '2026-10-16T11:44:50.538Z',
    initial: 'T',
    employee: 'Tannu Kumari',
    action: 'Quotation created',
    record: '#Q-10466',
    leadId: '#L-209012',
  },
];

export const RELATIONAL_LEADS: RelationalLeadRecord[] = [
  {
    leadId: '#L-209010',
    clientName: 'Arjun Mehta',
    company: 'Apex Tech Solutions Pvt Ltd',
    source: 'Google Ads',
    status: 'Converted',
    salesRep: 'Nancy Singh',
    department: 'Sales',
    createdAt: '2026-10-16',
    quotations: [
      { id: '#Q-10461', service: 'Private Limited Company', amount: 32500, status: 'Accepted', date: '2026-10-14' },
      { id: '#Q-10464', service: 'GST & Annual Compliance', amount: 14800, status: 'Accepted', date: '2026-10-15' },
      { id: '#Q-10465', service: 'Trademark', amount: 6500, status: 'Pending', date: '2026-10-16' },
    ],
    deals: [
      {
        id: '#D-820',
        quoteId: '#Q-10461',
        service: 'Private Limited Company',
        priority: 'High',
        dealValue: 32500,
        collected: 25000,
        progress: 77,
        orders: [
          { id: '#O-2164', service: 'Private Limited Company', opsRep: 'Gaurav Pant', stage: 'Completed', completedStages: 5, totalStages: 5 },
          { id: '#O-2165', service: 'DSC & DIN Services', opsRep: 'Gaurav Pant', stage: 'Pending', completedStages: 2, totalStages: 5 },
        ],
        payments: [
          { id: '#P-1078', orderId: '#O-2164', amount: 15000, mode: 'UPI', date: '2026-10-14' },
          { id: '#P-1079', orderId: '#O-2164', amount: 10000, mode: 'NEFT/RTGS', date: '2026-10-16' },
        ],
      },
      {
        id: '#D-821',
        quoteId: '#Q-10464',
        service: 'GST & Annual Compliance',
        priority: 'Medium',
        dealValue: 14800,
        collected: 14800,
        progress: 100,
        orders: [
          { id: '#O-2166', service: 'General Filing', opsRep: 'Srishti Upadhyay', stage: 'Pending', completedStages: 1, totalStages: 5 },
        ],
        payments: [
          { id: '#P-1080', orderId: '#O-2166', amount: 14800, mode: 'Razorpay', date: '2026-10-15' },
        ],
      },
    ],
  },
  {
    leadId: '#L-209011',
    clientName: 'Priya Nair',
    company: 'Nova Retail LLP',
    source: 'Website',
    status: 'Converted',
    salesRep: 'Sneha Choudhary',
    department: 'Sales',
    createdAt: '2026-10-16',
    quotations: [
      { id: '#Q-10467', service: 'Private Limited Company', amount: 42000, status: 'Accepted', date: '2026-10-16' },
      { id: '#Q-10468', service: 'FSSAI License', amount: 15000, status: 'Pending', date: '2026-10-16' },
    ],
    deals: [
      {
        id: '#D-822',
        quoteId: '#Q-10467',
        service: 'Private Limited Company',
        priority: 'High',
        dealValue: 42000,
        collected: 28000,
        progress: 67,
        orders: [
          { id: '#O-2168', service: 'Private Limited Company', opsRep: 'Gaurav Pant', stage: 'Pending', completedStages: 3, totalStages: 5 },
          { id: '#O-2169', service: 'ISO Certification', opsRep: 'Srishti Upadhyay', stage: 'Pending', completedStages: 1, totalStages: 5 },
        ],
        payments: [
          { id: '#P-1081', orderId: '#O-2168', amount: 18000, mode: 'Credit Card', date: '2026-10-16' },
          { id: '#P-1082', orderId: '#O-2168', amount: 10000, mode: 'UPI', date: '2026-10-16' },
        ],
      },
    ],
  },
  {
    leadId: '#L-209012',
    clientName: 'Vikramaditya Rao',
    company: 'Zenith Foods & Beverages',
    source: 'Google Ads',
    status: 'Qualified',
    salesRep: 'Tannu Kumari',
    department: 'Enterprise',
    createdAt: '2026-10-16',
    quotations: [
      { id: '#Q-10466', service: 'LLP Registration', amount: 18500, status: 'Pending', date: '2026-10-16' },
      { id: '#Q-10469', service: 'Startup India Registration', amount: 11200, status: 'Pending', date: '2026-10-16' },
    ],
    deals: [],
  },
];