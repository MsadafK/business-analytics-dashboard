import React, { useState } from 'react';
import { Search, Eye } from 'lucide-react';
import type { Lead } from '../types/analytics';
import { formatINR } from '../utils/formatters';

interface RelationalExplorerTabProps {
  leads: Lead[];
  onSelectLead: (lead: Lead) => void;
}

export const RelationalExplorerTab: React.FC<RelationalExplorerTabProps> = ({
  leads,
  onSelectLead,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = leads.filter(
    (l) =>
      l.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.salesRep.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-3.5 sm:p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-sm sm:text-base font-bold text-slate-900">
            Lead-Wise Quotations, Deals, Orders & Payments Explorer
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            One Lead can have multiple Quotations & Deals. One Deal can have multiple Orders &
            Payments. Click any row to open the 360° relational tree.
          </p>
        </div>
        <div className="relative w-full sm:w-72 shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search Lead ID, client, company, rep..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 border border-slate-200 rounded-lg text-xs outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto mt-4">
        <table className="w-full text-left border-collapse text-xs min-w-[760px]">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 bg-slate-50">
              <th className="py-2.5 px-3 font-semibold">Lead ID & Client</th>
              <th className="py-2.5 px-3 font-semibold">Source & Status</th>
              <th className="py-2.5 px-3 font-semibold">Sales Rep</th>
              <th className="py-2.5 px-3 font-semibold text-center">Quotations (1:N)</th>
              <th className="py-2.5 px-3 font-semibold text-center">Deals (1:N)</th>
              <th className="py-2.5 px-3 font-semibold text-center">Orders (1:N)</th>
              <th className="py-2.5 px-3 font-semibold text-center">Payments (1:N)</th>
              <th className="py-2.5 px-3 font-semibold text-right">Deal Value</th>
              <th className="py-2.5 px-3 font-semibold text-right">Collected</th>
              <th className="py-2.5 px-3 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((lead) => {
              const ordersCount = lead.deals.reduce((s, d) => s + d.orders.length, 0);
              const paymentsCount = lead.deals.reduce((s, d) => s + d.payments.length, 0);
              const totalVal = lead.deals.reduce((s, d) => s + d.dealValue, 0);
              const colVal = lead.deals.reduce((s, d) => s + d.collectedAmount, 0);
              return (
                <tr
                  key={lead.id}
                  onClick={() => onSelectLead(lead)}
                  className="hover:bg-blue-50/50 transition cursor-pointer"
                >
                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="font-bold text-blue-600">{lead.id}</div>
                    <div className="font-medium text-slate-800">{lead.name}</div>
                    <div className="text-[11px] text-slate-400">
                      {lead.company} • {lead.createdAt}
                    </div>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                        lead.status === 'Converted'
                          ? 'bg-emerald-50 text-emerald-700'
                          : lead.status === 'Qualified'
                          ? 'bg-blue-50 text-blue-700'
                          : lead.status === 'New'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      {lead.status}
                    </span>
                    <div className="text-[11px] text-slate-500 mt-1">{lead.source}</div>
                  </td>
                  <td className="py-3 px-3 font-medium text-slate-700 whitespace-nowrap">
                    {lead.salesRep}
                  </td>
                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    <span className="px-2 py-1 rounded bg-slate-100 font-semibold text-slate-700">
                      {lead.quotations.length} Quotes
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    <span className="px-2 py-1 rounded bg-indigo-50 font-semibold text-indigo-700">
                      {lead.deals.length} Deals
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    <span className="px-2 py-1 rounded bg-amber-50 font-semibold text-amber-700">
                      {ordersCount} Orders
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    <span className="px-2 py-1 rounded bg-emerald-50 font-semibold text-emerald-700">
                      {paymentsCount} Payments
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-semibold text-slate-800 whitespace-nowrap">
                    {formatINR(totalVal)}
                  </td>
                  <td className="py-3 px-3 text-right font-semibold text-emerald-600 whitespace-nowrap">
                    {formatINR(colVal)}
                  </td>
                  <td className="py-3 px-3 text-right whitespace-nowrap">
                    <button className="inline-flex items-center gap-1 text-blue-600 font-semibold hover:underline">
                      <Eye className="w-3.5 h-3.5" /> Drill-Down
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};