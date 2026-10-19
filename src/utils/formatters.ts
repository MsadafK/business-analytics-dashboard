import type { DatePreset, DateWindows, ServiceQuoteDetailRow } from '../types/analytics';

export const formatINR = (val: number): string =>
  '₹' + Math.round(val).toLocaleString('en-IN');

export const computeDateWindows = (
  datePreset: DatePreset,
  customStart: string,
  customEnd: string
): DateWindows => {
  if (datePreset === 'oct') {
    return {
      label: 'Oct 1 - Oct 31, 2026',
      startStr: '2026-10-01',
      endStr: '2026-10-31',
      prevStartStr: '2026-08-31',
      prevEndStr: '2026-09-30',
      diffDays: 31,
      scale: 1,
    };
  }
  if (datePreset === 'today') {
    return {
      label: 'Today (Oct 19, 2026)',
      startStr: '2026-10-19',
      endStr: '2026-10-19',
      prevStartStr: '2026-10-18',
      prevEndStr: '2026-10-18',
      diffDays: 1,
      scale: 0.14,
    };
  }
  if (datePreset === '7d') {
    return {
      label: 'Last 7 Days',
      startStr: '2026-10-13',
      endStr: '2026-10-19',
      prevStartStr: '2026-10-06',
      prevEndStr: '2026-10-12',
      diffDays: 7,
      scale: 0.38,
    };
  }
  if (datePreset === '30d') {
    return {
      label: 'Last 30 Days',
      startStr: '2026-09-20',
      endStr: '2026-10-19',
      prevStartStr: '2026-08-21',
      prevEndStr: '2026-09-19',
      diffDays: 30,
      scale: 0.92,
    };
  }

  const start = new Date(customStart || '2026-10-01');
  const end = new Date(customEnd || '2026-10-31');
  const diffDays = Math.max(
    1,
    Math.round(Math.abs(end.getTime() - start.getTime()) / (1000 * 3600 * 24)) + 1
  );
  const scale = Math.min(1.25, Math.max(0.15, Number((diffDays / 31).toFixed(2))));

  return {
    label: `${customStart} to ${customEnd}`,
    startStr: customStart,
    endStr: customEnd,
    prevStartStr: '2026-09-01',
    prevEndStr: '2026-09-30',
    diffDays,
    scale,
  };
};

export const exportDashboardCSV = (
  rows: ServiceQuoteDetailRow[],
  label: string
): void => {
  const headers = [
    'Service / Order,Quotations,Quoted Amount,Accepted,Pending,Rejected,Conversion Rate',
  ];
  const csvRows = rows.map(
    (r) =>
      `"${r.service}",${r.quotations},${r.quotedAmount},${r.accepted},${r.pending},${r.rejected},${r.convRate}%`
  );
  const blob = new Blob([headers.concat(csvRows).join('\n')], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `analytics-report-${label.replace(/\s+/g, '-')}.csv`;
  a.click();
};