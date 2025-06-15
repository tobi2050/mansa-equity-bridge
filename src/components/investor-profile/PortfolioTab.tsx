
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export const PortfolioTab = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Investment Portfolio</h2>
      <div className="grid gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold">EcoFarm Nigeria</h3>
                  <p className="text-sm text-gray-600">$15,000 invested • 12% equity</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
              <Progress value={60} className="mb-2" />
              <div className="flex justify-between text-sm">
                <span>Milestone 3/5 completed</span>
                <span className="text-green-600">+22% current value</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
