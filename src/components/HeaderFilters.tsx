import React from 'react';
import { Calendar, Download, ChevronDown } from 'lucide-react';
import type { DatePreset } from '../types/analytics';
import { ALL_USERS, ALL_DEPARTMENTS } from '../data/mockData';

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
  onExport,
}) => {
  return (
    <header className="max-w-[1600px] mx-auto px-3 sm:px-6 pt-4 pb-2">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        {/* Left Title & Subtitle */}
        <div>
          <h1 className="text-lg sm:text-[22px] font-extrabold text-[#0f172a] tracking-tight">
            Business Performance & Revenue Analytics
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Track your leads, conversions, quotations, deals, revenue and operations in real time.
          </p>
        </div>

        {/* Right Controls (Exact Match to Screenshot) */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Date Dropdown with Calendar Icon */}
          <div className="relative inline-flex items-center bg-white border border-slate-200 rounded-lg px-3 py-1.5 shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-slate-500 mr-2 shrink-0" />
            <select
              value={datePreset}
              onChange={(e) => setDatePreset(e.target.value as DatePreset)}
              className="appearance-none bg-transparent pr-5 text-xs font-medium text-slate-700 outline-none cursor-pointer"
            >
              <option value="oct">Oct 1 - Oct 31, 2026</option>
              <option value="today">Today</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="custom">Custom Date Range</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 pointer-events-none" />
          </div>

          {/* Custom Date Inputs if Custom Range is selected */}
          {datePreset === 'custom' && (
            <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs shadow-2xs">
              <input
                type="date"
                value={customStart}
                onChange={(e) => setCustomStart(e.target.value)}
                className="outline-none text-slate-700"
              />
              <span className="text-slate-400">to</span>
              <input
                type="date"
                value={customEnd}
                onChange={(e) => setCustomEnd(e.target.value)}
                className="outline-none text-slate-700"
              />
            </div>
          )}

          {/* All Users Dropdown */}
          <div className="relative inline-flex items-center bg-white border border-slate-200 rounded-lg px-3 py-1.5 shadow-2xs min-w-[130px]">
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="appearance-none bg-transparent w-full pr-5 text-xs font-medium text-slate-700 outline-none cursor-pointer"
            >
              <option value="All Users">All Users</option>
              {ALL_USERS.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 pointer-events-none" />
          </div>

          {/* All Departments Dropdown */}
          <div className="relative inline-flex items-center bg-white border border-slate-200 rounded-lg px-3 py-1.5 shadow-2xs min-w-[145px]">
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="appearance-none bg-transparent w-full pr-5 text-xs font-medium text-slate-700 outline-none cursor-pointer"
            >
              <option value="All Departments">All Departments</option>
              {ALL_DEPARTMENTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 pointer-events-none" />
          </div>

          {/* Export Button */}
          <button
            onClick={onExport}
            className="inline-flex items-center gap-1.5 bg-[#2563eb] hover:bg-blue-700 text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg shadow-2xs transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
        </div>
      </div>
    </header>
  );
};