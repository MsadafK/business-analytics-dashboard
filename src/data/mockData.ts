import type {
  Lead,
  CRMActivity,
  ServiceCategory,
  LeadSource,
  LeadStatus,
  Quotation,
  Deal,
  QuoteStatus,
  Priority,
  Order,
  Payment,
  OrderStage,
  PaymentMode,
} from '../types/analytics';

export const SALES_REPS = ['Nancy Singh', 'Sneha Choudhary', 'Tannu Kumari', 'Rohit Verma'];
export const OPS_REPS = ['Gaurav Pant', 'Srishti Upadhyay', 'Azam Afaroz', 'Vikram Patel'];

export const SERVICES: ServiceCategory[] = [
  'Private Limited Company',
  'LLP Registration',
  'Trademark',
  'Startup India Registration',
  'ISO Certification',
  'GST & Annual Compliance',
  'FSSAI License',
];

export const SOURCES: LeadSource[] = ['Google Ads', 'Website', 'Just Dial', 'Other'];
export const MONTHLY_TARGET = 8500000;
export const TODAY_STR = '2026-10-18';

const BASE_PRICES: Record<ServiceCategory, number> = {
  'Private Limited Company': 18500,
  'LLP Registration': 12500,
  'Trademark': 6500,
  'Startup India Registration': 9500,
  'ISO Certification': 11000,
  'GST & Annual Compliance': 8000,
  'FSSAI License': 7500,
};

function generateRelationalData(): { leads: Lead[]; activities: CRMActivity[] } {
  const leads: Lead[] = [];
  const activities: CRMActivity[] = [];

  const startDate = new Date('2026-08-15T00:00:00');
  let quoteCounter = 10350;
  let dealCounter = 750;
  let orderCounter = 2050;
  let paymentCounter = 980;

  for (let i = 1; i <= 175; i++) {
    const dayOffset =
      i <= 75 ? Math.floor((i / 75) * 46) : 47 + Math.floor(((i - 75) / 100) * 18);
    const createdDate = new Date(startDate);
    createdDate.setDate(startDate.getDate() + dayOffset);
    const dateStr = createdDate.toISOString().split('T')[0];

    const salesRep = SALES_REPS[i % SALES_REPS.length];
    const department = i % 5 === 0 ? 'Enterprise' : 'Sales';
    const source: LeadSource =
      i % 10 < 7 ? 'Google Ads' : i % 10 < 9 ? 'Website' : i % 2 === 0 ? 'Just Dial' : 'Other';

    let status: LeadStatus = 'Unqualified';
    if (i % 10 === 0 || i % 10 === 4) status = 'Converted';
    else if (i % 10 === 1 || i % 10 === 2 || i % 10 === 5) status = 'Qualified';
    else if (i % 10 === 3) status = 'New';

    const leadId = `#L-${208900 + i}`;
    const quotations: Quotation[] = [];
    const deals: Deal[] = [];

    // 1 Lead -> Multiple Quotations
    const numQuotes =
      status === 'Converted'
        ? (i % 2) + 2
        : status === 'Qualified'
        ? (i % 2) + 1
        : i % 4 === 0
        ? 1
        : 0;

    for (let q = 0; q < numQuotes; q++) {
      quoteCounter++;
      const service = SERVICES[(i + q) % SERVICES.length];
      const amount = BASE_PRICES[service] + ((i * 350 + q * 1200) % 6000);
      const isAccepted = status === 'Converted' && q === 0;
      const qStatus: QuoteStatus = isAccepted
        ? 'Accepted'
        : q === 1 && i % 3 === 0
        ? 'Rejected'
        : 'Pending';

      const quoteId = `#Q-${quoteCounter}`;
      quotations.push({
        id: quoteId,
        leadId,
        service,
        amount,
        status: qStatus,
        salesRep,
        createdAt: dateStr,
      });

      activities.push({
        id: `ACT-Q-${quoteCounter}`,
        timestamp: `${dateStr}T11:${(10 + ((q * 13) % 45)).toString().padStart(2, '0')}:22`,
        date: dateStr,
        employee: salesRep,
        department,
        action: 'Quotation created',
        recordId: quoteId,
        leadId,
      });

      // 1 Lead -> Multiple Deals
      if (isAccepted || (status === 'Converted' && q === 1 && i % 4 === 0)) {
        dealCounter++;
        const dealId = `#D-${dealCounter}`;
        const priority: Priority = i % 3 === 0 ? 'High' : i % 3 === 1 ? 'Medium' : 'Low';
        const dealOrders: Order[] = [];
        const dealPayments: Payment[] = [];

        // 1 Deal -> Multiple Orders
        const numOrders = i % 3 === 0 ? 2 : 1;
        for (let o = 0; o < numOrders; o++) {
          orderCounter++;
          const orderId = `#O-${orderCounter}`;
          const orderService = o === 0 ? service : SERVICES[(i + o + 2) % SERVICES.length];
          const opsRep = OPS_REPS[(i + o) % OPS_REPS.length];
          const stage: OrderStage =
            i % 4 === 0
              ? 'Completed'
              : i % 4 === 1
              ? 'In Progress'
              : i % 7 === 0
              ? 'On Hold'
              : 'Pending';
          const totalStages = 5;
          const completedStages =
            stage === 'Completed' ? 5 : stage === 'In Progress' ? 3 : stage === 'On Hold' ? 2 : 1;

          dealOrders.push({
            id: orderId,
            dealId,
            leadId,
            service: orderService,
            stage,
            totalStages,
            completedStages,
            isOverdue: stage !== 'Completed' && i % 6 === 0,
            assignedOps: opsRep,
            createdAt: dateStr,
            updatedAt: dateStr,
          });

          activities.push({
            id: `ACT-O-${orderCounter}`,
            timestamp: `${dateStr}T14:${(15 + ((o * 19) % 40)).toString().padStart(2, '0')}:09`,
            date: dateStr,
            employee: opsRep,
            department: 'Operations',
            action: 'Order created',
            recordId: orderId,
            leadId,
          });
        }

        // 1 Deal -> Multiple Payments
        const numPayments = i % 2 === 0 ? 2 : 1;
        let totalCollected = 0;
        for (let p = 0; p < numPayments; p++) {
          paymentCounter++;
          const paymentId = `#P-${paymentCounter}`;
          const payAmt =
            numPayments === 2
              ? Math.round(amount * (p === 0 ? 0.5 : 0.35))
              : Math.round(amount * 0.7);
          totalCollected += payAmt;
          const modes: PaymentMode[] = ['UPI', 'NEFT/RTGS', 'Credit Card', 'Razorpay'];

          dealPayments.push({
            id: paymentId,
            dealId,
            orderId: dealOrders[0].id,
            amount: payAmt,
            date: dateStr,
            mode: modes[(i + p) % modes.length],
            status: 'Success',
            recordedBy: salesRep,
          });

          activities.push({
            id: `ACT-P-${paymentCounter}`,
            timestamp: `${dateStr}T16:${(20 + ((p * 11) % 35)).toString().padStart(2, '0')}:44`,
            date: dateStr,
            employee: salesRep,
            department,
            action: 'Payment recorded',
            recordId: paymentId,
            leadId,
          });
        }

        const progress = Math.min(100, Math.round((totalCollected / amount) * 100));

        deals.push({
          id: dealId,
          leadId,
          quotationId: quoteId,
          service,
          priority,
          dealValue: amount,
          collectedAmount: totalCollected,
          progress,
          salesRep,
          createdAt: dateStr,
          orders: dealOrders,
          payments: dealPayments,
        });

        activities.push({
          id: `ACT-D-${dealCounter}`,
          timestamp: `${dateStr}T13:05:51`,
          date: dateStr,
          employee: salesRep,
          department,
          action: 'Deal created',
          recordId: dealId,
          leadId,
        });
      }
    }

    leads.push({
      id: leadId,
      name: `Client ${i} (${['Sharma', 'Patel', 'Gupta', 'Khan', 'Reddy', 'Nair', 'Joshi'][i % 7]})`,
      company: `${['Apex', 'Nova', 'Zenith', 'Vertex', 'Orchid', 'Pulse', 'Quantum'][i % 7]} Ventures Pvt Ltd`,
      email: `contact.client${i}@enterprise.in`,
      phone: `+91 98${(10000000 + i * 54321).toString().slice(0, 8)}`,
      status,
      source,
      salesRep,
      department,
      createdAt: dateStr,
      quotations,
      deals,
    });

    activities.push({
      id: `ACT-L-${i}`,
      timestamp: `${dateStr}T09:${(10 + (i % 48)).toString().padStart(2, '0')}:10`,
      date: dateStr,
      employee: salesRep,
      department,
      action: 'Lead updated',
      recordId: leadId,
      leadId,
    });
  }

  activities.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));
  return { leads, activities };
}

export const DATASET = generateRelationalData();