import React from 'react';
import { CreditCard } from 'lucide-react';
import type {
  AggregatedMetrics,
  CRMActivity,
  Lead,
  ServiceAnalyticsItem,
} from '../types/analytics';
import { OPS_REPS, SALES_REPS } from '../data/mockData';
import { formatINR } from '../utils/formatters';

interface OperationsPaymentsSectionProps {
  currentLeads: Lead[];
  curr: AggregatedMetrics;
  serviceAnalytics: ServiceAnalyticsItem[];
  filteredActivities: CRMActivity[];
  onOpenRecordDrillDown: (leadId: string) => void;
}

export const OperationsPaymentsSection: React.FC<OperationsPaymentsSectionProps> = ({
  currentLeads,
  curr,
  serviceAnalytics,
  filteredActivities,
  onOpenRecordDrillDown,
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4">
        {/* 1. Sales Team Activity */}
        <div className="xl:col-span-4 bg-white rounded-xl border border-slate-200 p-4 shadow-2xs overflow-x-auto">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-800">Sales Team Activity</h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-600">
              Sales Team
            </span>
          </div>
          <table className="w-full text-left text-[10px] 2xl:text-[11px]">
            <thead>
              <tr className="text-slate-400 border-b border-slate-100">
                <th className="pb-2 pr-1">User</th>
                <th className="pb-2 px-1 text-right">Leads</th>
                <th className="pb-2 px-1 text-right">Qual.</th>
                <th className="pb-2 px-1 text-right">Conv.</th>
                <th className="pb-2 px-1 text-right">Quotes</th>
                <th className="pb-2 px-1 text-right">Deals</th>
                <th className="pb-2 pl-1 text-right">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {SALES_REPS.map((rep) => {
                const rLeads = currentLeads.filter((l) => l.salesRep === rep);
                const rQual = rLeads.filter(
                  (l) => l.status === 'Qualified' || l.status === 'Converted'
                ).length;
                const rConv = rLeads.filter((l) => l.status === 'Converted').length;
                const rQuotes = rLeads.reduce((s, l) => s + l.quotations.length, 0);
                const rDeals = rLeads.reduce((s, l) => s + l.deals.length, 0);
                const rRev = rLeads.reduce(
                  (s, l) => s + l.deals.reduce((ds, d) => ds + d.collectedAmount, 0),
                  0
                );
                return (
                  <tr key={rep} className="hover:bg-slate-50">
                    <td className="py-2.5 pr-1 flex items-center gap-1.5 font-semibold text-slate-800 whitespace-nowrap">
                      <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[9px] flex items-center justify-center font-bold shrink-0">
                        {rep[0]}
                      </span>
                      {rep}
                    </td>
                    <td className="py-2.5 px-1 text-right">{rLeads.length}</td>
                    <td className="py-2.5 px-1 text-right">{rQual}</td>
                    <td className="py-2.5 px-1 text-right font-semibold text-emerald-600">
                      {rConv}
                    </td>
                    <td className="py-2.5 px-1 text-right">{rQuotes}</td>
                    <td className="py-2.5 px-1 text-right font-semibold">{rDeals}</td>
                    <td className="py-2.5 pl-1 text-right font-bold text-slate-900 whitespace-nowrap">
                      {formatINR(rRev)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* 2. Operations Team Activity */}
        <div className="xl:col-span-3 bg-white rounded-xl border border-slate-200 p-4 shadow-2xs overflow-x-auto">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-800">Operations Team Activity</h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-50 text-purple-600">
              Operations
            </span>
          </div>
          <table className="w-full text-left text-[10px] 2xl:text-[11px]">
            <thead>
              <tr className="text-slate-400 border-b border-slate-100">
                <th className="pb-2 pr-1">User</th>
                <th className="pb-2 px-1 text-right">Orders</th>
                <th className="pb-2 px-1 text-right">Done</th>
                <th className="pb-2 px-1 text-right">Pending</th>
                <th className="pb-2 pl-1 text-right">Overdue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {OPS_REPS.map((rep) => {
                const rOrders = curr.orders.filter((o) => o.assignedOps === rep);
                const stagesDone = rOrders.reduce((s, o) => s + o.completedStages, 0);
                const stagesPending = rOrders.reduce(
                  (s, o) => s + (o.totalStages - o.completedStages),
                  0
                );
                const overdue = rOrders.filter((o) => o.isOverdue).length;
                return (
                  <tr key={rep} className="hover:bg-slate-50">
                    <td className="py-2.5 pr-1 flex items-center gap-1.5 font-semibold text-slate-800 whitespace-nowrap">
                      <span className="w-5 h-5 rounded-full bg-teal-600 text-white text-[9px] flex items-center justify-center font-bold shrink-0">
                        {rep[0]}
                      </span>
                      {rep}
                    </td>
                    <td className="py-2.5 px-1 text-right font-semibold">{rOrders.length}</td>
                    <td className="py-2.5 px-1 text-right text-emerald-600 font-semibold">
                      {stagesDone}
                    </td>
                    <td className="py-2.5 px-1 text-right text-amber-600">{stagesPending}</td>
                    <td className="py-2.5 pl-1 text-right text-rose-600 font-bold">{overdue}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* 3. Orders & Stage Progress */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-slate-800">Orders & Stage Progress</h3>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-[9px] text-slate-500 mb-3">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>Pending
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>In Progress
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>Completed
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>On Hold
            </span>
          </div>

          <div className="space-y-2.5">
            {serviceAnalytics.slice(0, 5).map((s) => {
              const tot = Math.max(1, s.ordersTotal);
              return (
                <div key={s.service} className="space-y-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-slate-700 font-medium truncate max-w-[140px]">
                      {s.shortName}
                    </span>
                    <span className="font-bold text-slate-900">{s.ordersTotal}</span>
                  </div>
                  <div className="w-full h-3.5 bg-slate-100 rounded-md overflow-hidden flex text-[9px] text-white font-bold">
                    {s.orderPending > 0 && (
                      <div
                        className="bg-amber-500 flex items-center justify-center"
                        style={{ width: `${(s.orderPending / tot) * 100}%` }}
                      >
                        {s.orderPending}
                      </div>
                    )}
                    {s.orderInProgress > 0 && (
                      <div
                        className="bg-blue-600 flex items-center justify-center"
                        style={{ width: `${(s.orderInProgress / tot) * 100}%` }}
                      >
                        {s.orderInProgress}
                      </div>
                    )}
                    {s.orderCompleted > 0 && (
                      <div
                        className="bg-emerald-500 flex items-center justify-center"
                        style={{ width: `${(s.orderCompleted / tot) * 100}%` }}
                      >
                        {s.orderCompleted}
                      </div>
                    )}
                    {s.orderOnHold > 0 && (
                      <div
                        className="bg-rose-500 flex items-center justify-center"
                        style={{ width: `${(s.orderOnHold / tot) * 100}%` }}
                      >
                        {s.orderOnHold}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Recent CRM Activity */}
        <div className="xl:col-span-3 bg-white rounded-xl border border-slate-200 p-4 shadow-2xs overflow-x-auto">
          <h3 className="text-xs font-bold text-slate-800 mb-3">Recent CRM Activity</h3>
          <table className="w-full text-left text-[10px] 2xl:text-[11px]">
            <thead>
              <tr className="text-slate-400 border-b border-slate-100">
                <th className="pb-2 pr-1">Time</th>
                <th className="pb-2 px-1">Employee</th>
                <th className="pb-2 px-1">Action</th>
                <th className="pb-2 pl-1 text-right">Record</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredActivities.slice(0, 6).map((act) => (
                <tr
                  key={act.id}
                  onClick={() => onOpenRecordDrillDown(act.leadId)}
                  className="hover:bg-blue-50/50 cursor-pointer"
                >
                  <td className="py-2 pr-1 text-[9px] text-slate-400 whitespace-nowrap">
                    {act.timestamp.replace('T', ' ')}
                  </td>
                  <td className="py-2 px-1 font-medium text-slate-800 whitespace-nowrap">
                    {act.employee}
                  </td>
                  <td className="py-2 px-1 text-slate-600 whitespace-nowrap">{act.action}</td>
                  <td className="py-2 pl-1 text-right font-bold text-blue-600 hover:underline whitespace-nowrap">
                    {act.recordId}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dedicated Orders & Payments History Panel */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-emerald-600 shrink-0" />
            <h3 className="text-xs sm:text-sm font-bold text-slate-900">
              Orders & Payments: Completed Orders, Payment History & Collection Breakdown
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs">
            <span className="text-slate-500">
              Completed Orders:{' '}
              <strong className="text-emerald-600">
                {curr.orders.filter((o) => o.stage === 'Completed').length} / {curr.orders.length}
              </strong>
            </span>
            <span className="text-slate-500">
              Payments Recorded: <strong className="text-blue-600">{curr.payments.length}</strong>
            </span>
          </div>
        </div>

        <div className="overflow-x-auto mt-3">
          <table className="w-full text-left text-xs min-w-[540px]">
            <thead>
              <tr className="text-slate-400 border-b border-slate-100">
                <th className="pb-2 pr-2">Payment ID</th>
                <th className="pb-2 px-2">Order ID</th>
                <th className="pb-2 px-2">Deal ID</th>
                <th className="pb-2 px-2">Date</th>
                <th className="pb-2 px-2">Payment Mode</th>
                <th className="pb-2 px-2">Recorded By</th>
                <th className="pb-2 px-2 text-right">Amount Collected</th>
                <th className="pb-2 pl-2 text-right">Drill-Down</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {curr.payments.slice(0, 6).map((pay) => {
                const parentDeal = curr.deals.find((d) => d.id === pay.dealId);
                return (
                  <tr
                    key={pay.id}
                    onClick={() => parentDeal && onOpenRecordDrillDown(parentDeal.leadId)}
                    className="hover:bg-slate-50 cursor-pointer"
                  >
                    <td className="py-2.5 pr-2 font-bold text-emerald-600 whitespace-nowrap">
                      {pay.id}
                    </td>
                    <td className="py-2.5 px-2 font-semibold text-amber-700 whitespace-nowrap">
                      {pay.orderId}
                    </td>
                    <td className="py-2.5 px-2 font-semibold text-indigo-600 whitespace-nowrap">
                      {pay.dealId}
                    </td>
                    <td className="py-2.5 px-2 text-slate-500 whitespace-nowrap">{pay.date}</td>
                    <td className="py-2.5 px-2 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium text-[11px]">
                        {pay.mode}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-slate-700 whitespace-nowrap">
                      {pay.recordedBy}
                    </td>
                    <td className="py-2.5 px-2 text-right font-bold text-slate-900 whitespace-nowrap">
                      {formatINR(pay.amount)}
                    </td>
                    <td className="py-2.5 pl-2 text-right text-blue-600 font-semibold whitespace-nowrap">
                      Inspect →
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};