
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const PendingApprovals = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Milestone Approvals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h4 className="font-medium">AgriTech Solutions - Milestone {i + 2}</h4>
                <p className="text-sm text-gray-600">Market validation completed, requesting next funding tranche</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">Review</Button>
                <Button size="sm">Approve</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
