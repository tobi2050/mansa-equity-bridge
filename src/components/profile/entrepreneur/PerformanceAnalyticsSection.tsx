
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DollarSign, TrendingUp, Trophy } from "lucide-react";

const PerformanceAnalyticsSection = ({ businesses }: { businesses: any[] }) => {
  // Calculate business stats
  const totalFunding = businesses.reduce((sum: number, b: any) => sum + (b.current_funding || 0), 0);
  const milestoneCount = businesses.length * 2; // Placeholder for milestones per business
  const avgFunding = businesses.length ? (totalFunding / businesses.length) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Total Funding Raised
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">${totalFunding.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">Sum of all business current funding</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
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
          <CardTitle className="flex items-center gap-2">
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
  );
};

export default PerformanceAnalyticsSection;
