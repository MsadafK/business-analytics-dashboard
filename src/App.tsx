import { useState } from 'react';
import type { DatePreset, RelationalLeadRecord } from './types/analytics';
import { exportDashboardCSV } from './utils/formatters';
import { useAnalyticsData } from './hooks/useAnalyticsData';
import { HeaderFilters } from './components/HeaderFilters';
import { KpiCardsGrid } from './components/KpiCardsGrid';
import { LeadAnalyticsSection } from './components/LeadAnalyticsSection';
import { QuotationAnalyticsSection } from './components/QuotationAnalyticsSection';
import { DealsRevenueSection } from './components/DealsRevenueSection';
import { OperationsPaymentsSection } from './components/OperationsPaymentsSection';
import { DrillDownModal } from './components/DrillDownModal';

export default function App() {
  const [datePreset, setDatePreset] = useState<DatePreset>('oct');
  const [customStart, setCustomStart] = useState('2026-10-01');
  const [customEnd, setCustomEnd] = useState('2026-10-31');
  const [selectedUser, setSelectedUser] = useState<string>('All Users');
  const [selectedDept, setSelectedDept] = useState<string>('All Departments');
  const [drillDownLead, setDrillDownLead] = useState<RelationalLeadRecord | null>(null);

  const {
    dateWindows,
    kpis,
    dailyLeadTrend,
    leadSources,
    quoteCategories,
    quoteFunnel,
    serviceQuoteDetails,
    dealServiceBars,
    revenueCategories,
    priorityRows,
    dailyRevenueBars,
    salesTeam,
    opsTeam,
    orderStages,
    crmActivities,
    relationalLeads,
  } = useAnalyticsData(datePreset, customStart, customEnd, selectedUser, selectedDept);

  const openRecordDrillDown = (leadId: string) => {
    const found = relationalLeads.find((l) => l.leadId === leadId) || relationalLeads[0];
    setDrillDownLead(found);
  };

  return (
    <div className="min-h-screen bg-[#f3f6fb] text-slate-800 font-sans pb-10">
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
        onExport={() => exportDashboardCSV(serviceQuoteDetails, dateWindows.label)}
      />

      <main className="max-w-[1600px] mx-auto px-3 sm:px-6 pt-2 space-y-4">
        <KpiCardsGrid
          kpis={kpis}
          diffDays={dateWindows.diffDays}
          onCardClick={() => setDrillDownLead(relationalLeads[0])}
        />

        <LeadAnalyticsSection
          kpis={kpis}
          dailyLeadTrend={dailyLeadTrend}
          leadSources={leadSources}
          onDrillDown={() => setDrillDownLead(relationalLeads[0])}
        />

        <QuotationAnalyticsSection
          kpis={kpis}
          quoteCategories={quoteCategories}
          quoteFunnel={quoteFunnel}
          serviceQuoteDetails={serviceQuoteDetails}
          onRowClick={() => setDrillDownLead(relationalLeads[0])}
        />

        <DealsRevenueSection
          kpis={kpis}
          dealServiceBars={dealServiceBars}
          revenueCategories={revenueCategories}
          priorityRows={priorityRows}
          dailyRevenueBars={dailyRevenueBars}
        />

        <OperationsPaymentsSection
          salesTeam={salesTeam}
          opsTeam={opsTeam}
          orderStages={orderStages}
          crmActivities={crmActivities}
          onOpenRecordDrillDown={openRecordDrillDown}
        />
      </main>

      <DrillDownModal
        lead={drillDownLead}
        allLeads={relationalLeads}
        onSelectLead={setDrillDownLead}
        onClose={() => setDrillDownLead(null)}
      />
    </div>
  );
}