import React from 'react';
import { FileText, Briefcase, X } from 'lucide-react';
import type { RelationalLeadRecord } from '../types/analytics';
import { formatINR } from '../utils/formatters';

interface DrillDownModalProps {
  lead: RelationalLeadRecord | null;
  allLeads: RelationalLeadRecord[];
  onSelectLead: (lead: RelationalLeadRecord) => void;
  onClose: () => void;
}

export const DrillDownModal: React.FC<DrillDownModalProps> = ({
  lead,
  allLeads,
  onSelectLead,
  onClose,
}) => {
  if (!lead) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-4xl w-full max-h-[88vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between gap-2">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-blue-600 text-xs font-bold">
                {lead.leadId}
              </span>
              <h3 className="text-base font-bold">{lead.clientName}</h3>
              <span className="text-xs text-slate-300">({lead.company})</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Source: {lead.source} • Sales Rep: {lead.salesRep} • Created: {lead.createdAt}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={lead.leadId}
              onChange={(e) => {
                const found = allLeads.find((l) => l.leadId === e.target.value);
                if (found) onSelectLead(found);
              }}
              className="bg-slate-800 border border-slate-700 text-white text-xs rounded-lg px-2.5 py-1.5 outline-none cursor-pointer"
            >
              {allLeads.map((l) => (
                <option key={l.leadId} value={l.leadId}>
                  Switch Lead: {l.leadId} ({l.clientName})
                </option>
              ))}
            </select>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Relational Tree Content */}
        <div className="p-5 overflow-y-auto space-y-6 text-xs">
          {/* 1. Quotations (1 Lead -> Multiple Quotations) */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              1. Lead-Wise Quotations History ({lead.quotations.length} Quotations)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {lead.quotations.map((q) => (
                <div
                  key={q.id}
                  className="p-3 rounded-xl border border-slate-200 bg-slate-50/70"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-blue-600">{q.id}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        q.status === 'Accepted'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {q.status}
                    </span>
                  </div>
                  <div className="font-semibold text-slate-800 mt-1">{q.service}</div>
                  <div className="flex justify-between text-slate-500 mt-2 pt-2 border-t border-slate-200">
                    <span>
                      Value: <strong className="text-slate-900">{formatINR(q.amount)}</strong>
                    </span>
                    <span>{q.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Deals -> Orders & Payments (1 Deal -> Multiple Orders & Payments) */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-indigo-600" />
              2. Converted Deals ({lead.deals.length}) → Nested Orders & Payments
            </h4>
            {lead.deals.length === 0 ? (
              <p className="text-slate-400 italic">No converted deals for this lead yet.</p>
            ) : (
              <div className="space-y-4">
                {lead.deals.map((d) => (
                  <div
                    key={d.id}
                    className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/20 space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-100 pb-2.5">
                      <div>
                        <span className="font-extrabold text-indigo-700 text-sm">{d.id}</span>
                        <span className="ml-2 font-semibold text-slate-800">{d.service}</span>
                        <span className="ml-2 text-slate-400">(Quote {d.quoteId})</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        <span>
                          Deal Value: <strong>{formatINR(d.dealValue)}</strong>
                        </span>
                        <span className="text-emerald-700">
                          Collected: <strong>{formatINR(d.collected)}</strong> ({d.progress}%)
                        </span>
                        <span className="text-rose-600">
                          Outstanding: <strong>{formatINR(d.dealValue - d.collected)}</strong>
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      <div className="bg-white p-3 rounded-lg border border-slate-200">
                        <div className="font-bold text-slate-700 mb-2">
                          Multiple Orders ({d.orders.length})
                        </div>
                        <div className="space-y-2">
                          {d.orders.map((o) => (
                            <div
                              key={o.id}
                              className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100"
                            >
                              <div>
                                <span className="font-bold text-amber-700">{o.id}</span> •{' '}
                                {o.service}
                                <div className="text-[10px] text-slate-400">
                                  Ops: {o.opsRep} • Stages: {o.completedStages}/{o.totalStages}
                                </div>
                              </div>
                              <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold text-[10px]">
                                {o.stage}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-white p-3 rounded-lg border border-slate-200">
                        <div className="font-bold text-slate-700 mb-2">
                          Multiple Payments ({d.payments.length})
                        </div>
                        <div className="space-y-2">
                          {d.payments.map((p) => (
                            <div
                              key={p.id}
                              className="flex items-center justify-between p-2 rounded bg-emerald-50/50 border border-emerald-100"
                            >
                              <div>
                                <span className="font-bold text-emerald-700">{p.id}</span> •{' '}
                                {p.mode}
                                <div className="text-[10px] text-slate-400">
                                  Order {p.orderId} • {p.date}
                                </div>
                              </div>
                              <span className="font-extrabold text-emerald-700">
                                {formatINR(p.amount)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};