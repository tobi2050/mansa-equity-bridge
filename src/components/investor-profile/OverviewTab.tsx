
import { InvestmentStats } from "./InvestmentStats";
import { QuickActions } from "./QuickActions";
import { PendingApprovals } from "./PendingApprovals";

interface InvestorStats {
  totalInvested: string;
  activeInvestments: number;
  portfolioValue: string;
  avgROI: string;
  milestonesApproved: number;
  businessesRated: number;
}

interface OverviewTabProps {
  investorStats: InvestorStats;
}

export const OverviewTab = ({ investorStats }: OverviewTabProps) => {
  return (
    <div className="space-y-6">
      <InvestmentStats stats={investorStats} />
      <QuickActions />
      <PendingApprovals />
    </div>
  );
};
