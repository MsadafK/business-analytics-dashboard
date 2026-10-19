import React from 'react';
import type {
  SalesTeamRow,
  OpsTeamRow,
  OrderStageRow,
  CrmActivityRow,
} from '../types/analytics';
import { formatINR } from '../utils/formatters';

interface OperationsPaymentsSectionProps {
  salesTeam: SalesTeamRow[];
  opsTeam: OpsTeamRow[];
  orderStages: OrderStageRow[];
  crmActivities: CrmActivityRow[];
  onOpenRecordDrillDown: (leadId: string) => void;
}

export const OperationsPaymentsSection: React.FC<OperationsPaymentsSectionProps> = ({
  salesTeam,
  opsTeam,
  orderStages,
  crmActivities,
  onOpenRecordDrillDown,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-3.5">
      {/* 1. Sales Team Activity */}
      <div className="xl:col-span-4 bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs overflow-x-auto">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold text-slate-800">Sales Team Activity</h3>
          <span className="px-2 py-0.5 rounded text-[9.5px] font-semibold bg-blue-50 text-blue-600">
            Sales Team
          </span>
        </div>

        <table className="w-full text-left text-[10px]">
          <thead>
            <tr className="text-slate-400 border-b border-slate-200">
              <th className="pb-2 font-medium">User</th>
              <th className="pb-2 px-1 font-medium text-right">
                <div>Leads</div>
                <div>Handled</div>
              </th>
              <th className="pb-2 px-1 font-medium text-right">Qualified</th>
              <th className="pb-2 px-1 font-medium text-right">Converted</th>
              <th className="pb-2 px-1 font-medium text-right">
                <div>Conversion</div>
                <div>%</div>
              </th>
              <th className="pb-2 px-1 font-medium text-right">Quotations</th>
              <th className="pb-2 px-1 font-medium text-right">Deals</th>
              <th className="pb-2 px-1 font-medium text-right">
                <div>Deal</div>
                <div>Value</div>
              </th>
              <th className="pb-2 pl-1 font-medium text-right">Revenue</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {salesTeam.map((s) => (
              <tr
                key={s.name}
                onClick={() => onOpenRecordDrillDown('#L-209010')}
                className="hover:bg-slate-50 cursor-pointer"
              >
                <td className="py-2.5 pr-1 flex items-center gap-2 font-semibold text-slate-800">
                  <span className="w-5 h-5 rounded-full bg-purple-600 text-white text-[9px] flex items-center justify-center font-bold shrink-0">
                    {s.initial}
                  </span>
                  <span className="leading-tight">{s.name}</span>
                </td>
                <td className="py-2.5 px-1 text-right text-slate-700">{s.leadsHandled}</td>
                <td className="py-2.5 px-1 text-right text-slate-700">{s.qualified}</td>
                <td className="py-2.5 px-1 text-right text-slate-700">{s.converted}</td>
                <td className="py-2.5 px-1 text-right font-bold text-slate-900">
                  {s.conversionPct}%
                </td>
                <td className="py-2.5 px-1 text-right text-slate-700">{s.quotations}</td>
                <td className="py-2.5 px-1 text-right text-slate-700">{s.deals}</td>
                <td className="py-2.5 px-1 text-right text-slate-600 whitespace-nowrap">
                  {formatINR(s.dealValue)}
                </td>
                <td className="py-2.5 pl-1 text-right font-bold text-slate-900 whitespace-nowrap">
                  {formatINR(s.revenue)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 2. Operations Team Activity */}
      <div className="xl:col-span-3 bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs overflow-x-auto">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold text-slate-800">Operations Team Activity</h3>
          <span className="px-2 py-0.5 rounded text-[9.5px] font-semibold bg-purple-50 text-purple-600">
            Operations
          </span>
        </div>

        <table className="w-full text-left text-[10px]">
          <thead>
            <tr className="text-slate-400 border-b border-slate-200">
              <th className="pb-2 font-medium">User</th>
              <th className="pb-2 px-1.5 font-medium text-right">
                <div>Orders</div>
                <div>Updated</div>
              </th>
              <th className="pb-2 px-1.5 font-medium text-right">
                <div>Stages</div>
                <div>Completed</div>
              </th>
              <th className="pb-2 px-1.5 font-medium text-right">
                <div>Pending</div>
                <div>Stages</div>
              </th>
              <th className="pb-2 pl-1.5 font-medium text-right">
                <div>Overdue</div>
                <div>Orders</div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {opsTeam.map((o) => (
              <tr key={o.name} className="hover:bg-slate-50">
                <td className="py-2.5 pr-1 flex items-center gap-2 font-semibold text-slate-800">
                  <span
                    className="w-5 h-5 rounded-full text-white text-[9px] flex items-center justify-center font-bold shrink-0"
                    style={{ backgroundColor: o.color }}
                  >
                    {o.initial}
                  </span>
                  <span className="leading-tight">{o.name}</span>
                </td>
                <td className="py-2.5 px-1.5 text-right text-slate-700">{o.ordersUpdated}</td>
                <td className="py-2.5 px-1.5 text-right text-slate-700">{o.stagesCompleted}</td>
                <td className="py-2.5 px-1.5 text-right text-slate-700">{o.pendingStages}</td>
                <td className="py-2.5 pl-1.5 text-right text-slate-700">{o.overdueOrders}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 3. Orders & Stage Progress */}
      <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs">
        <div className="flex flex-wrap items-start justify-between gap-1 mb-3">
          <h3 className="text-xs font-bold text-slate-800 leading-tight">
            Orders & Stage Progress
          </h3>
          <div className="flex flex-wrap items-center gap-1.5 text-[8px] text-slate-500">
            <span className="flex items-center gap-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>Pending
            </span>
            <span className="flex items-center gap-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>In Progress
            </span>
            <span className="flex items-center gap-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Completed
            </span>
            <span className="flex items-center gap-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>On Hold
            </span>
          </div>
        </div>

        <div className="space-y-3 mt-4">
          {orderStages.map((s) => (
            <div key={s.service} className="grid grid-cols-12 items-center gap-1.5 text-[9.5px]">
              <span className="col-span-4 text-slate-600 truncate" title={s.service}>
                {s.shortLabel}
              </span>
              <div className="col-span-7 flex items-center h-3.5 rounded-xs overflow-hidden bg-slate-100 text-[8px] font-bold text-white">
                <div
                  className="bg-[#f59e0b] h-full flex items-center justify-center"
                  style={{ width: '78%' }}
                >
                  {s.pending}
                </div>
                <div className="bg-[#2563eb] h-full flex items-center justify-center px-0.5">
                  {s.inProgress}
                </div>
                <div className="bg-[#10b981] h-full flex items-center justify-center px-1">
                  {s.completed}
                </div>
                <div className="bg-[#ef4444] h-full flex items-center justify-center px-0.5">
                  {s.onHold}
                </div>
              </div>
              <span className="col-span-1 text-right font-bold text-slate-800">{s.total}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Recent CRM Activity */}
      <div className="xl:col-span-3 bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs overflow-x-auto">
        <h3 className="text-xs font-bold text-slate-800 mb-3">Recent CRM Activity</h3>
        <table className="w-full text-left text-[9.5px]">
          <thead>
            <tr className="text-slate-400 border-b border-slate-200">
              <th className="pb-2 font-medium">Time</th>
              <th className="pb-2 px-1.5 font-medium">Employee</th>
              <th className="pb-2 px-1.5 font-medium">Action</th>
              <th className="pb-2 pl-1 font-medium">Record</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {crmActivities.map((act) => (
              <tr
                key={act.id}
                onClick={() => onOpenRecordDrillDown(act.leadId)}
                className="hover:bg-blue-50/40 cursor-pointer"
              >
                <td className="py-2 pr-1 text-[8.5px] text-slate-400 whitespace-nowrap">
                  {act.time}
                </td>
                <td className="py-2 px-1.5">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                    <span className="w-4.5 h-4.5 rounded-full bg-purple-600 text-white text-[8px] flex items-center justify-center font-bold shrink-0">
                      {act.initial}
                    </span>
                    <span className="leading-tight">{act.employee}</span>
                  </div>
                </td>
                <td className="py-2 px-1.5 text-slate-600 leading-tight">{act.action}</td>
                <td className="py-2 pl-1 font-bold text-blue-600 hover:underline leading-tight">
                  {act.record}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};