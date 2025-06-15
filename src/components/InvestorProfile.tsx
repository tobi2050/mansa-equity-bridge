
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings } from "lucide-react";
import { OverviewTab } from "./investor-profile/OverviewTab";
import { OpportunitiesTab } from "./investor-profile/OpportunitiesTab";
import { PortfolioTab } from "./investor-profile/PortfolioTab";
import { ConsortiumsTab } from "./investor-profile/ConsortiumsTab";
import { SettingsTab } from "./investor-profile/SettingsTab";

interface InvestorProfileProps {
  isOwnProfile?: boolean;
  profile?: any;
  isLoading?: boolean;
}

const InvestorProfile = ({ isOwnProfile = false, profile, isLoading }: InvestorProfileProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  const investorStats = {
    totalInvested: "$125,000",
    activeInvestments: 7,
    portfolioValue: "$156,000",
    avgROI: "+18.5%",
    milestonesApproved: 24,
    businessesRated: 12
  };

  const recentOpportunities = [
    { name: "AgriTech Solutions", sector: "Agriculture", funding: "$50K", equity: "15%", stage: "Series A" },
    { name: "EduConnect Africa", sector: "Education", funding: "$30K", equity: "12%", stage: "Seed" },
    { name: "HealthTech Nigeria", sector: "Healthcare", funding: "$75K", equity: "20%", stage: "Pre-Series A" }
  ];

  const activeConsortiums = [
    { name: "African AgTech Investors", members: 8, totalFunding: "$200K", status: "Active" },
    { name: "EdTech Impact Group", members: 5, totalFunding: "$150K", status: "Forming" }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className={`grid w-full ${isOwnProfile ? 'grid-cols-5' : 'grid-cols-4'}`}>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="consortiums">Consortiums</TabsTrigger>
          {isOwnProfile && <TabsTrigger value="settings"><Settings className="w-4 h-4 mr-2" />Settings</TabsTrigger>}
        </TabsList>

        <TabsContent value="overview">
          {isOwnProfile && isLoading ? (
            <div className="text-center p-8">Loading...</div>
          ) : (
            <OverviewTab
              investorStats={investorStats}
              contributionMode={profile?.default_contribution_mode}
            />
          )}
        </TabsContent>

        <TabsContent value="opportunities">
          <OpportunitiesTab opportunities={recentOpportunities} />
        </TabsContent>

        <TabsContent value="portfolio">
          <PortfolioTab />
        </TabsContent>

        <TabsContent value="consortiums">
          <ConsortiumsTab consortiums={activeConsortiums} />
        </TabsContent>
        
        {isOwnProfile && (
          <TabsContent value="settings">
            <SettingsTab />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default InvestorProfile;
