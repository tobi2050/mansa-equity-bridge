
import { InvestingOverview } from "./overview/InvestingOverview";
import { DonatingOverview } from "./overview/DonatingOverview";
import { SupportingOverview } from "./overview/SupportingOverview";

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
  contributionMode?: 'investing' | 'donating' | 'supporting' | null;
}

export const OverviewTab = ({ investorStats, contributionMode = 'investing' }: OverviewTabProps) => {
  switch (contributionMode) {
    case 'donating':
      return <DonatingOverview />;
    case 'supporting':
      return <SupportingOverview />;
    case 'investing':
    default:
      return <InvestingOverview investorStats={investorStats} />;
  }
};
