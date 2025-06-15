
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import VerificationTrustSection from "./VerificationTrustSection";
import { DollarSign, TrendingUp, Target, Building2 } from "lucide-react";

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Entrepreneur Stats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
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
        
        <div className="space-y-3 pt-4 border-t">
          <h4 className="text-sm font-medium text-muted-foreground">Verification & Trust</h4>
          <VerificationTrustSection profile={profile} />
          <div className="flex items-center gap-2 pt-2">
            <p className="text-sm font-medium">Trust Score:</p>
            <p className="font-bold text-lg text-primary">{profile.trust_score || 0}/100</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EntrepreneurStats;
