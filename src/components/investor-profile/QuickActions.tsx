
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Building2, DollarSign, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const QuickActions = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleContributeClick = () => {
    toast({
      title: "Coming Soon!",
      description: "A customized contribution flow is being developed for each mode.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button
            variant="outline"
            className="h-20 flex flex-col gap-2"
            onClick={() => navigate('/investment-opportunities')}
          >
            <Building2 className="w-6 h-6" />
            <span className="text-xs">Browse Opportunities</span>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex flex-col gap-2"
            onClick={() => navigate('/create-consortium')}
          >
            <Users className="w-6 h-6" />
            <span className="text-xs">Create Consortium</span>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex flex-col gap-2"
            onClick={handleContributeClick}
          >
            <DollarSign className="w-6 h-6" />
            <span className="text-xs">Contribute</span>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex flex-col gap-2"
            onClick={() => navigate('/messages')}
          >
            <MessageCircle className="w-6 h-6" />
            <span className="text-xs">Messages</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
