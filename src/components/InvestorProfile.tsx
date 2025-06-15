
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings } from "lucide-react";
import { InvestorDashboardHeader } from "./investor-profile/InvestorDashboardHeader";
import { OverviewTab } from "./investor-profile/OverviewTab";
import { OpportunitiesTab } from "./investor-profile/OpportunitiesTab";
import { PortfolioTab } from "./investor-profile/PortfolioTab";
import { ConsortiumsTab } from "./investor-profile/ConsortiumsTab";
import { SettingsTab } from "./investor-profile/SettingsTab";

interface InvestorProfileProps {
  isOwnProfile?: boolean;
}

const InvestorProfile = ({ isOwnProfile = false }: InvestorProfileProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [profileCompletion] = useState(65); // Below 50% minimum

  const { authState } = useAuth();
  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile', authState.userId],
    queryFn: async () => {
      if (!authState.userId) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('default_contribution_mode')
        .eq('id', authState.userId)
        .maybeSingle();
      
      if (error) {
        console.error("Error fetching investor profile:", error);
        throw error;
      }
      return data;
    },
    enabled: !!authState.userId && isOwnProfile,
  });

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
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <InvestorDashboardHeader isOwnProfile={isOwnProfile} profileCompletion={profileCompletion} />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className={`grid w-full ${isOwnProfile ? 'grid-cols-5' : 'grid-cols-4'}`}>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="consortiums">Consortiums</TabsTrigger>
          {isOwnProfile && <TabsTrigger value="settings"><Settings className="w-4 h-4 mr-2" />Settings</TabsTrigger>}
        </TabsList>

        <TabsContent value="overview">
          {isOwnProfile && isLoadingProfile ? (
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
