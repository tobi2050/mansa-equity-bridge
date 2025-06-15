
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Building2, 
  Target,
  MessageCircle
} from "lucide-react";

interface InvestorDashboardViewProps {
  onNavigate: (page: string) => void;
}

export const InvestorDashboardView = ({ onNavigate }: InvestorDashboardViewProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <Card className="border-green-200 bg-gradient-to-r from-green-50 to-blue-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-green-800">Welcome Back!</h3>
              <p className="text-sm text-green-600 mt-1">Discover new investment opportunities in African businesses</p>
            </div>
            <Button 
              onClick={() => onNavigate('investment-opportunities')}
              className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
            >
              Browse Opportunities
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Portfolio stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">$45.2K</div>
            <div className="text-xs text-gray-600">Total Invested</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">$52.8K</div>
            <div className="text-xs text-gray-600">Portfolio Value</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Building2 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">12</div>
            <div className="text-xs text-gray-600">Investments</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Target className="w-8 h-8 text-amber-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-amber-600">+16.8%</div>
            <div className="text-xs text-gray-600">ROI</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
              onClick={() => onNavigate('investment-opportunities')}
            >
              <Building2 className="w-6 h-6" />
              <span className="text-xs">Find Opportunities</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
              onClick={() => navigate('/profile')}
            >
              <Users className="w-6 h-6" />
              <span className="text-xs">My Portfolio</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
              onClick={() => navigate('/messages')}
            >
              <MessageCircle className="w-6 h-6" />
              <span className="text-xs">Messages</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
              onClick={() => navigate('/feed')}
            >
              <TrendingUp className="w-6 h-6" />
              <span className="text-xs">Activity Feed</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
