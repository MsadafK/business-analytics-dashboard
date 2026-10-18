import React from 'react';
import { FileText, Briefcase, X } from 'lucide-react';
import type { Lead } from '../types/analytics';
import { formatINR } from '../utils/formatters';

interface DrillDownModalProps {
  lead: Lead | null;
  onClose: () => void;
}

export const DrillDownModal: React.FC<DrillDownModalProps> = ({ lead, onClose }) => {
  if (!lead) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-slate-900 text-white flex items-start sm:items-center justify-between gap-2">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-blue-500 text-xs font-bold">{lead.id}</span>
              <h3 className="text-base sm:text-lg font-bold truncate">{lead.name}</h3>
              <span className="text-xs text-slate-300 truncate">({lead.company})</span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-1">
              Source: {lead.source} • Assigned Rep: {lead.salesRep} • Created: {lead.createdAt}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 shrink-0 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-xs">
          {/* 1. Quotations History */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600 shrink-0" />
              1. Quotations History ({lead.quotations.length})
            </h4>
            {lead.quotations.length === 0 ? (
              <p className="text-slate-400 italic">No quotations created for this lead yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {lead.quotations.map((q) => (
                  <div
                    key={q.id}
                    className="p-3 rounded-xl border border-slate-200 bg-slate-50/60"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-blue-600">{q.id}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          q.status === 'Accepted'
                            ? 'bg-emerald-100 text-emerald-700'
                            : q.status === 'Rejected'
                            ? 'bg-rose-100 text-rose-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {q.status}
                      </span>
                    </div>
                    <div className="font-semibold text-slate-800 mt-1">{q.service}</div>
                    <div className="flex justify-between text-slate-500 mt-2 pt-2 border-t border-slate-200/70">
                      <span>
                        Quoted Value:{' '}
                        <strong className="text-slate-900">{formatINR(q.amount)}</strong>
                      </span>
                      <span>{q.createdAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 2. Deals -> Nested Orders & Payments */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-indigo-600 shrink-0" />
              2. Converted Deals ({lead.deals.length}) → Linked Orders & Payments
            </h4>
            {lead.deals.length === 0 ? (
              <p className="text-slate-400 italic">No deals converted for this lead yet.</p>
            ) : (
              <div className="space-y-4">
                {lead.deals.map((d) => (
                  <div
                    key={d.id}
                    className="p-3.5 sm:p-4 rounded-xl border border-indigo-200 bg-indigo-50/20 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-100 pb-2.5">
                      <div>
                        <span className="font-extrabold text-indigo-700 text-sm">{d.id}</span>
                        <span className="ml-2 font-semibold text-slate-800">{d.service}</span>
                        <span className="ml-2 text-slate-400">(From Quote {d.quotationId})</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        <span>
                          Deal Value: <strong>{formatINR(d.dealValue)}</strong>
                        </span>
                        <span className="text-emerald-700">
                          Collected: <strong>{formatINR(d.collectedAmount)}</strong> ({d.progress}%)
                        </span>
                        <span className="text-rose-600">
                          Outstanding:{' '}
                          <strong>{formatINR(d.dealValue - d.collectedAmount)}</strong>
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      <div className="bg-white p-3 rounded-lg border border-slate-200">
                        <div className="font-bold text-slate-700 mb-2">
                          Linked Orders ({d.orders.length})
                        </div>
                        <div className="space-y-2">
                          {d.orders.map((o) => (
                            <div
                              key={o.id}
                              className="flex items-center justify-between gap-2 p-2 rounded bg-slate-50 border border-slate-100"
                            >
                              <div className="min-w-0">
                                <span className="font-bold text-amber-700">{o.id}</span> •{' '}
                                <span className="truncate">{o.service}</span>
                                <div className="text-[10px] text-slate-400">
                                  Ops: {o.assignedOps} • Stages: {o.completedStages}/{o.totalStages}
                                </div>
                              </div>
                              <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold text-[10px] shrink-0">
                                {o.stage}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-white p-3 rounded-lg border border-slate-200">
                        <div className="font-bold text-slate-700 mb-2">
                          Linked Payment Installments ({d.payments.length})
                        </div>
                        <div className="space-y-2">
                          {d.payments.map((p) => (
                            <div
                              key={p.id}
                              className="flex items-center justify-between gap-2 p-2 rounded bg-emerald-50/50 border border-emerald-100"
                            >
                              <div>
                                <span className="font-bold text-emerald-700">{p.id}</span> •{' '}
                                {p.mode}
                                <div className="text-[10px] text-slate-400">
                                  Order {p.orderId} • {p.date}
                                </div>
                              </div>
                              <span className="font-extrabold text-emerald-700 whitespace-nowrap">
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