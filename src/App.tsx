import { useState } from 'react';
import type { DatePreset, Lead } from './types/analytics';
import { DATASET } from './data/mockData';
import { exportLeadsToCSV } from './utils/formatters';
import { useAnalyticsData } from './hooks/useAnalyticsData';
import { HeaderFilters } from './components/HeaderFilters';
import { KpiCardsGrid } from './components/KpiCardsGrid';
import { LeadAnalyticsSection } from './components/LeadAnalyticsSection';
import { QuotationAnalyticsSection } from './components/QuotationAnalyticsSection';
import { DealsRevenueSection } from './components/DealsRevenueSection';
import { OperationsPaymentsSection } from './components/OperationsPaymentsSection';
import { RelationalExplorerTab } from './components/RelationalExplorerTab';
import { DrillDownModal } from './components/DrillDownModal';

export default function App() {
  const [datePreset, setDatePreset] = useState<DatePreset>('oct');
  const [customStart, setCustomStart] = useState('2026-10-01');
  const [customEnd, setCustomEnd] = useState('2026-10-18');
  const [selectedUser, setSelectedUser] = useState<string>('All Users');
  const [selectedDept, setSelectedDept] = useState<string>('All Departments');
  const [activeTab, setActiveTab] = useState<'overview' | 'relational'>('overview');
  const [drillDownLead, setDrillDownLead] = useState<Lead | null>(null);

  const {
    dateWindows,
    currentLeads,
    curr,
    prev,
    dailyTrends,
    serviceAnalytics,
    sourceBreakdown,
    filteredActivities,
  } = useAnalyticsData(datePreset, customStart, customEnd, selectedUser, selectedDept);

  const openRecordDrillDown = (leadId: string) => {
    const found = DATASET.leads.find((l) => l.id === leadId);
    if (found) setDrillDownLead(found);
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-slate-800 font-sans pb-14">
      <HeaderFilters
        datePreset={datePreset}
        setDatePreset={setDatePreset}
        customStart={customStart}
        setCustomStart={setCustomStart}
        customEnd={customEnd}
        setCustomEnd={setCustomEnd}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        selectedDept={selectedDept}
        setSelectedDept={setSelectedDept}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        totalLeadsCount={curr.totalLeads}
        dateWindows={dateWindows}
        onExport={() =>
          exportLeadsToCSV(currentLeads, dateWindows.startStr, dateWindows.endStr)
        }
      />

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 pt-5 space-y-6">
        {activeTab === 'relational' ? (
          <RelationalExplorerTab
            leads={currentLeads}
            onSelectLead={(lead) => setDrillDownLead(lead)}
          />
        ) : (
          <>
            <KpiCardsGrid
              curr={curr}
              prev={prev}
              diffDays={dateWindows.diffDays}
              onCardClick={() => setActiveTab('relational')}
            />

            <LeadAnalyticsSection
              curr={curr}
              dailyTrends={dailyTrends}
              sourceBreakdown={sourceBreakdown}
              onDrillDown={() => setActiveTab('relational')}
            />

            <QuotationAnalyticsSection
              curr={curr}
              serviceAnalytics={serviceAnalytics}
              onViewLeadHistory={() => setActiveTab('relational')}
            />

            <DealsRevenueSection
              curr={curr}
              serviceAnalytics={serviceAnalytics}
              dailyTrends={dailyTrends}
            />

            <OperationsPaymentsSection
              currentLeads={currentLeads}
              curr={curr}
              serviceAnalytics={serviceAnalytics}
              filteredActivities={filteredActivities}
              onOpenRecordDrillDown={openRecordDrillDown}
            />
          </>
        )}
      </main>

      <DrillDownModal lead={drillDownLead} onClose={() => setDrillDownLead(null)} />
    </div>
  );
}