import React from 'react';
import { Calendar, Download, Layers } from 'lucide-react';
import type { DatePreset, DateWindows } from '../types/analytics';
import { SALES_REPS, OPS_REPS } from '../data/mockData';

interface HeaderFiltersProps {
  datePreset: DatePreset;
  setDatePreset: (preset: DatePreset) => void;
  customStart: string;
  setCustomStart: (val: string) => void;
  customEnd: string;
  setCustomEnd: (val: string) => void;
  selectedUser: string;
  setSelectedUser: (val: string) => void;
  selectedDept: string;
  setSelectedDept: (val: string) => void;
  activeTab: 'overview' | 'relational';
  setActiveTab: (tab: 'overview' | 'relational') => void;
  totalLeadsCount: number;
  dateWindows: DateWindows;
  onExport: () => void;
}

export const HeaderFilters: React.FC<HeaderFiltersProps> = ({
  datePreset,
  setDatePreset,
  customStart,
  setCustomStart,
  customEnd,
  setCustomEnd,
  selectedUser,
  setSelectedUser,
  selectedDept,
  setSelectedDept,
  activeTab,
  setActiveTab,
  totalLeadsCount,
  dateWindows,
  onExport,
}) => {
  const presets: { id: DatePreset; label: string }[] = [
    { id: 'today', label: 'Today' },
    { id: '7d', label: 'Last 7 Days' },
    { id: '30d', label: 'Last 30 Days' },
    { id: 'oct', label: 'Oct 1 - Oct 31, 2026' },
    { id: 'custom', label: 'Custom Range' },
  ];

  return (
    <header className="bg-white border-b border-slate-200 lg:sticky lg:top-0 z-30 shadow-xs">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-6 py-3 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-2.5">
        {/* Title & Subtitle */}
        <div className="min-w-0 shrink-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-base sm:text-xl 2xl:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
              Business Performance & Revenue Analytics
            </h1>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 shrink-0">
              Live Interactive
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
            Track your leads, conversions, quotations, deals, revenue and operations in real time.
          </p>
        </div>

        {/* Filter Controls - Single Row on XL (1440px), Wrapped cleanly on Mobile (320px) */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap xl:flex-nowrap items-stretch sm:items-center gap-2">
          {/* Date Presets: Wrap on <640px so nothing clips at 320px */}
          <div className="flex flex-wrap sm:flex-nowrap items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-[11px] font-medium gap-0.5">
            {presets.map((p) => (
              <button
                key={p.id}
                onClick={() => setDatePreset(p.id)}
                className={`px-2 py-1 rounded-md transition whitespace-nowrap cursor-pointer \${
                  datePreset === p.id
                    ? 'bg-white text-blue-600 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Custom Date Range Picker */}
          {datePreset === 'custom' && (
            <div className="flex items-center justify-between sm:justify-start gap-1 bg-white border border-slate-300 rounded-lg px-2 py-1 text-[11px]">
              <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <input
                type="date"
                value={customStart}
                min="2026-08-15"
                max="2026-10-31"
                onChange={(e) => setCustomStart(e.target.value)}
                className="outline-none text-slate-700 w-full sm:w-auto"
              />
              <span className="text-slate-400">to</span>
              <input
                type="date"
                value={customEnd}
                min="2026-08-15"
                max="2026-10-31"
                onChange={(e) => setCustomEnd(e.target.value)}
                className="outline-none text-slate-700 w-full sm:w-auto"
              />
            </div>
          )}

          {/* User, Dept & Export Row */}
          <div className="grid grid-cols-2 sm:flex items-center gap-1.5 shrink-0">
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-[11px] font-medium text-slate-700 outline-none hover:border-slate-300 cursor-pointer w-full sm:w-auto"
            >
              <option value="All Users">All Users</option>
              <optgroup label="Sales Team">
                {SALES_REPS.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Operations Team">
                {OPS_REPS.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </optgroup>
            </select>

            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-[11px] font-medium text-slate-700 outline-none hover:border-slate-300 cursor-pointer w-full sm:w-auto"
            >
              <option value="All Departments">All Departments</option>
              <option value="Sales">Sales</option>
              <option value="Operations">Operations</option>
              <option value="Enterprise">Enterprise</option>
            </select>

            <button
              onClick={onExport}
              className="col-span-2 sm:col-span-1 inline-flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg shadow-xs transition cursor-pointer shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Sub-navigation & Comparison Period Info */}
      <div className="max-w-[1600px] mx-auto px-3 sm:px-6 py-2 bg-slate-50/90 border-t border-slate-200/80 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-1.5 text-xs">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`font-semibold pb-1 border-b-2 transition text-[11px] sm:text-xs cursor-pointer \${
              activeTab === 'overview'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Executive Dashboard View
          </button>
          <button
            onClick={() => setActiveTab('relational')}
            className={`font-semibold pb-1 border-b-2 flex items-center gap-1 transition text-[11px] sm:text-xs cursor-pointer \${
              activeTab === 'relational'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5 shrink-0" />
            <span>Lead-Wise Relational History ({totalLeadsCount} Leads)</span>
          </button>
        </div>

        <div className="text-[10px] sm:text-[11px] text-slate-500 leading-relaxed">
          Showing <span className="font-semibold text-slate-700">{dateWindows.startStr}</span> to{' '}
          <span className="font-semibold text-slate-700">{dateWindows.endStr}</span> • vs. previous{' '}
          <span className="font-semibold text-slate-700">{dateWindows.diffDays} days</span> (
          {dateWindows.prevStartStr} to {dateWindows.prevEndStr})
        </div>
      </div>
    </header>
  );
};