import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Building2, 
  Target,
  Calendar,
  MessageCircle,
  Bell,
  ChevronRight,
  ArrowLeft
} from "lucide-react";
import EntrepreneurDashboard from "./EntrepreneurDashboard";
import InvestmentOpportunities from "./InvestmentOpportunities";
import SlideOutMenu from "./SlideOutMenu";
import BottomNavigation from "./BottomNavigation";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigation } from "@/contexts/NavigationContext";

interface DashboardProps {
  userRole: 'investor' | 'entrepreneur';
  onLogout: () => void;
}

const Dashboard = ({ userRole, onLogout }: DashboardProps) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { currentPage, navigateTo, goBack, canGoBack } = useNavigation();
  const [entrepreneurActiveTab, setEntrepreneurActiveTab] = useState('overview');

  const handleLogout = () => {
    logout();
    onLogout();
  };

  const handleNavigation = (page: string) => {
    navigateTo(page);
  };

  const renderCurrentView = () => {
    switch (currentPage) {
      case 'entrepreneur-dashboard':
        return (
          <EntrepreneurDashboard 
            activeTab={entrepreneurActiveTab}
            setActiveTab={setEntrepreneurActiveTab}
            onBack={() => navigateTo('dashboard')} 
          />
        );
      case 'investment-opportunities':
        return <InvestmentOpportunities onBack={() => navigateTo('dashboard')} />;
      default:
        return renderMainDashboard();
    }
  };

  const renderMainDashboard = () => {
    if (userRole === 'entrepreneur') {
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
                  onClick={() => navigateTo('entrepreneur-dashboard')}
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
    } else {
      // Investor dashboard
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
                  onClick={() => navigateTo('investment-opportunities')}
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
                  onClick={() => navigateTo('investment-opportunities')}
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
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {canGoBack && (
              <Button
                variant="ghost"
                size="sm"
                onClick={goBack}
                className="mr-2"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            <SlideOutMenu userRole={userRole} onLogout={handleLogout} />
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <div className="hidden md:block">
                <h1 className="text-xl font-bold text-gray-900">MANSA</h1>
                <p className="text-xs text-gray-600 capitalize">{userRole} Dashboard</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <Bell className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/profile')}
              className="hidden md:flex"
            >
              <Users className="w-4 h-4 mr-2" />
              Profile
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="hidden md:flex"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-6 pb-20 md:pb-6">
        {renderCurrentView()}
      </div>

      {/* Bottom navigation for mobile */}
      <BottomNavigation userRole={userRole} />
    </div>
  );
};

export default Dashboard;
