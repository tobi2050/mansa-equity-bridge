
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Building2 } from "lucide-react";

const BusinessPortfolioList = ({ businesses }: { businesses: any[] }) => {
  if (!businesses || businesses.length === 0)
    return <div className="text-muted-foreground p-8 text-center">No businesses listed yet. Click "Add Business" to get started.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {businesses.map((b: any) => (
        <Card key={b.id} className="relative">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              {b.name}
              {b.verified && (
                <Badge variant="outline" className="bg-green-50 border-green-300 text-green-800 ml-2">
                  <CheckCircle className="w-4 h-4 mr-1" />Verified
                </Badge>
              )}
            </CardTitle>
            <CardDescription>{b.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="flex gap-4 items-center">
                <span className="text-sm font-medium">Funding:</span>
                <span className="font-bold text-green-700">
                  ${b.current_funding?.toLocaleString() || 0} 
                </span>
                <span className="text-xs text-muted-foreground">of ${b.funding_goal?.toLocaleString() || 0} goal</span>
              </div>
              <Progress value={b.funding_goal ? Math.min(100, Math.round(((b.current_funding || 0) / b.funding_goal) * 100)) : 0} className="h-2" />
              <div className="flex gap-4 items-center">
                <span className="text-sm font-medium">Industry:</span>
                <span>{b.industry || "—"}</span>
                <span className="text-sm font-medium">Location:</span>
                <span>{b.location || "—"}</span>
              </div>
              <div className="flex gap-4 items-center mt-2">
                <span className="text-sm font-medium">Employees:</span>
                <span>{b.employees || "—"}</span>
                <span className="text-sm font-medium">Stage:</span>
                <span>{b.stage || "—"}</span>
              </div>
              {/* Add quick actions here in the future (Edit, View, etc.) */}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BusinessPortfolioList;
