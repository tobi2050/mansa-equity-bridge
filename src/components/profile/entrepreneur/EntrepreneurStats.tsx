import VerificationTrustSection from "./VerificationTrustSection";
import { DollarSign, TrendingUp, Target, Building2, Trophy } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const StatCard = ({ icon, title, value, subValue }: { icon: React.ReactNode, title: string, value: string | number, subValue?: string }) => (
  <div className="flex items-start gap-3">
    <div className="bg-muted p-2 rounded-lg mt-1">
      {icon}
    </div>
    <div>
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="text-lg font-bold">{value}</p>
      {subValue && <p className="text-xs text-muted-foreground">{subValue}</p>}
    </div>
  </div>
);

const EntrepreneurStats = ({ profile, businesses }: { profile: any, businesses: any[] }) => {
  const { aggregatedStats } = profile;

  if (!aggregatedStats) return null;

  // Calculate performance stats
  const totalFunding = businesses.reduce((sum: number, b: any) => sum + (b.current_funding || 0), 0);
  const milestoneCount = businesses.length * 2; // Placeholder for milestones per business
  const avgFunding = businesses.length ? (totalFunding / businesses.length) : 0;

  return (
    <div className="p-6 bg-muted/50 rounded-lg space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard 
            icon={<DollarSign className="w-5 h-5 text-green-600" />} 
            title="Total Funding" 
            value={`$${aggregatedStats.totalCurrentFunding.toLocaleString()}`}
            subValue={`of $${aggregatedStats.totalFundingGoal.toLocaleString()} goal`}
          />
          <StatCard 
            icon={<TrendingUp className="w-5 h-5 text-blue-600" />} 
            title="Est. Monthly Revenue" 
            value={`$${aggregatedStats.totalMonthlyRevenue.toLocaleString()}`}
          />
          <StatCard 
            icon={<Target className="w-5 h-5 text-amber-600" />} 
            title="Active Campaigns" 
            value={aggregatedStats.activeCampaigns}
          />
           <StatCard 
            icon={<Building2 className="w-5 h-5 text-indigo-600" />} 
            title="Businesses" 
            value={businesses?.length || 0}
          />
        </div>
        
        <div className="space-y-3 pt-6 border-t">
          <h4 className="text-sm font-medium text-muted-foreground">Verification & Trust</h4>
          <VerificationTrustSection profile={profile} />
          <div className="flex items-center gap-2 pt-2">
            <p className="text-sm font-medium">Trust Score:</p>
            <p className="font-bold text-lg text-primary">{profile.trust_score || 0}/100</p>
          </div>
        </div>

        <div className="space-y-3 pt-6 border-t">
          <h4 className="text-sm font-medium text-muted-foreground">Performance Analytics</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <TrendingUp className="w-5 h-5" />
                  Average Funding per Business
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">${avgFunding.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                <div className="text-xs text-muted-foreground">Across all your businesses</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Trophy className="w-5 h-5" />
                  Milestones Completed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{milestoneCount}</div>
                <div className="text-xs text-muted-foreground">Business milestones completed (placeholder)</div>
              </CardContent>
            </Card>
          </div>
        </div>
    </div>
  );
};

export default EntrepreneurStats;
