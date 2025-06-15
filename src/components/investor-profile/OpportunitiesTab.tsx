
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

interface Opportunity {
  name: string;
  sector: string;
  funding: string;
  equity: string;
  stage: string;
}

interface OpportunitiesTabProps {
  opportunities: Opportunity[];
}

export const OpportunitiesTab = ({ opportunities }: OpportunitiesTabProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Investment Opportunities</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Set Filters
        </Button>
      </div>
      <div className="grid gap-4">
        {opportunities.map((opportunity, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{opportunity.name}</h3>
                  <p className="text-sm text-gray-600">{opportunity.sector}</p>
                  <div className="flex gap-4 mt-2 text-sm">
                    <span>Seeking: {opportunity.funding}</span>
                    <span>Equity: {opportunity.equity}</span>
                    <Badge variant="outline">{opportunity.stage}</Badge>
                  </div>
                </div>
                <Button>Contribute</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
