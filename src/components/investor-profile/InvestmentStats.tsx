
import { Card, CardContent } from "@/components/ui/card";
import {
  TrendingUp,
  DollarSign,
  Building2,
  Target,
  Shield,
  Star,
} from "lucide-react";

interface InvestorStats {
  totalInvested: string;
  activeInvestments: number;
  portfolioValue: string;
  avgROI: string;
  milestonesApproved: number;
  businessesRated: number;
}

interface InvestmentStatsProps {
  stats: InvestorStats;
}

export const InvestmentStats = ({ stats }: InvestmentStatsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="pt-6 text-center">
          <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-blue-600">{stats.totalInvested}</div>
          <div className="text-xs text-gray-600">Total Contributed</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6 text-center">
          <Building2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-green-600">{stats.activeInvestments}</div>
          <div className="text-xs text-gray-600">Active Projects</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6 text-center">
          <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-purple-600">{stats.portfolioValue}</div>
          <div className="text-xs text-gray-600">Portfolio Value</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6 text-center">
          <Target className="w-8 h-8 text-amber-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-amber-600">{stats.avgROI}</div>
          <div className="text-xs text-gray-600">Average ROI</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6 text-center">
          <Shield className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-indigo-600">{stats.milestonesApproved}</div>
          <div className="text-xs text-gray-600">Milestones Approved</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6 text-center">
          <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-yellow-600">{stats.businessesRated}</div>
          <div className="text-xs text-gray-600">Businesses Rated</div>
        </CardContent>
      </Card>
    </div>
  );
};
