import type { DatePreset, DateWindows, Lead } from '../types/analytics';
import { TODAY_STR } from '../data/mockData';

export const formatINR = (val: number): string =>
  '₹' + Math.round(val).toLocaleString('en-IN');

export const formatCompactINR = (val: number): string => {
  if (val >= 100000) return `₹${(val / 100000).toFixed(2)}L`;
  if (val >= 1000) return `₹${(val / 1000).toFixed(1)}K`;
  return `₹${val}`;
};

export const calcDelta = (current: number, previous: number): number => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Number((((current - previous) / previous) * 100).toFixed(1));
};

export const computeDateWindows = (
  datePreset: DatePreset,
  customStart: string,
  customEnd: string
): DateWindows => {
  let start = new Date(TODAY_STR);
  let end = new Date(TODAY_STR);

  if (datePreset === 'today') {
    // Today vs Yesterday
  } else if (datePreset === '7d') {
    start.setDate(end.getDate() - 6);
  } else if (datePreset === '30d') {
    start.setDate(end.getDate() - 29);
  } else if (datePreset === 'oct') {
    start = new Date('2026-10-01');
    end = new Date('2026-10-31');
  } else {
    start = new Date(customStart || '2026-10-01');
    end = new Date(customEnd || TODAY_STR);
    if (start > end) {
      const temp = start;
      start = end;
      end = temp;
    }
  }

  const diffDays = Math.max(
    1,
    Math.round((end.getTime() - start.getTime()) / (1000 * 3600 * 24)) + 1
  );
  const prevEnd = new Date(start);
  prevEnd.setDate(start.getDate() - 1);
  const prevStart = new Date(prevEnd);
  prevStart.setDate(prevEnd.getDate() - (diffDays - 1));

  return {
    startStr: start.toISOString().split('T')[0],
    endStr: end.toISOString().split('T')[0],
    prevStartStr: prevStart.toISOString().split('T')[0],
    prevEndStr: prevEnd.toISOString().split('T')[0],
    diffDays,
  };
};

export const exportLeadsToCSV = (leads: Lead[], startStr: string, endStr: string): void => {
  const headers = [
    'Lead ID,Name,Company,Status,Source,Sales Rep,Created Date,Quotations,Deals,Total Deal Value,Collected Revenue',
  ];
  const rows = leads.map((l) => {
    const dVal = l.deals.reduce((s, d) => s + d.dealValue, 0);
    const cVal = l.deals.reduce((s, d) => s + d.collectedAmount, 0);
    return `${l.id},"${l.name}","${l.company}",${l.status},${l.source},"${l.salesRep}",${l.createdAt},${l.quotations.length},${l.deals.length},${dVal},${cVal}`;
  });
  const blob = new Blob([headers.concat(rows).join('\n')], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `business-analytics-${startStr}-to-${endStr}.csv`;
  a.click();
};