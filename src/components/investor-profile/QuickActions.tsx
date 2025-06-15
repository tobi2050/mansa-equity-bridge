
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Building2, DollarSign, MessageCircle } from "lucide-react";

export const QuickActions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button variant="outline" className="h-20 flex flex-col gap-2">
            <Building2 className="w-6 h-6" />
            <span className="text-xs">Browse Opportunities</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col gap-2">
            <Users className="w-6 h-6" />
            <span className="text-xs">Create Consortium</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col gap-2">
            <DollarSign className="w-6 h-6" />
            <span className="text-xs">Contribute</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col gap-2">
            <MessageCircle className="w-6 h-6" />
            <span className="text-xs">Messages</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
