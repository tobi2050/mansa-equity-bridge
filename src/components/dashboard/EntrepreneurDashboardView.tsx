
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Building2, 
  Target,
  MessageCircle,
} from "lucide-react";

interface EntrepreneurDashboardViewProps {
  onNavigate: (page: string) => void;
}

export const EntrepreneurDashboardView = ({ onNavigate }: EntrepreneurDashboardViewProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Profile completion banner */}
      <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-amber-800">Complete Your Profile</h3>
              <p className="text-sm text-amber-600 mt-1">85% complete - Add business details to unlock all features</p>
              <Progress value={85} className="w-48 mt-2" />
            </div>
            <Button 
              onClick={() => navigate('/complete-profile')}
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
            >
              Complete Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick stats - Updated for multiple businesses */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <Building2 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">3</div>
            <div className="text-xs text-gray-600">Active Businesses</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">$45.8K</div>
            <div className="text-xs text-gray-600">Total Funding Raised</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">24</div>
            <div className="text-xs text-gray-600">Total Investors</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Target className="w-8 h-8 text-amber-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-amber-600">8/15</div>
            <div className="text-xs text-gray-600">Milestones</div>
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
              onClick={() => onNavigate('entrepreneur-dashboard')}
            >
              <Building2 className="w-6 h-6" />
              <span className="text-xs">Manage Businesses</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
              onClick={() => navigate('/entrepreneur-projects')}
            >
              <DollarSign className="w-6 h-6" />
              <span className="text-xs">View Projects</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
              onClick={() => navigate('/entrepreneur-chat')}
            >
              <MessageCircle className="w-6 h-6" />
              <span className="text-xs">Chat</span>
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
