
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

interface Consortium {
  name: string;
  members: number;
  totalFunding: string;
  status: string;
}

interface ConsortiumsTabProps {
  consortiums: Consortium[];
}

export const ConsortiumsTab = ({ consortiums }: ConsortiumsTabProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Investment Consortiums</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Consortium
        </Button>
      </div>
      <div className="grid gap-4">
        {consortiums.map((consortium, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{consortium.name}</h3>
                  <p className="text-sm text-gray-600">{consortium.members} members • {consortium.totalFunding} total funding</p>
                </div>
                <Badge variant={consortium.status === 'Active' ? 'default' : 'secondary'}>
                  {consortium.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
