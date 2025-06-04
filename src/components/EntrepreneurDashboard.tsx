
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Building2, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Target, 
  MessageSquare,
  FileText,
  CheckCircle,
  AlertCircle,
  Plus
} from "lucide-react";
import BusinessProfile from "@/components/BusinessProfile";
import FundingOpportunities from "@/components/FundingOpportunities";
import InvestorCommunications from "@/components/InvestorCommunications";
import InvestmentOffers from "@/components/InvestmentOffers";
import MilestoneTracking from "@/components/MilestoneTracking";

interface EntrepreneurDashboardProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const EntrepreneurDashboard = ({ activeTab, setActiveTab }: EntrepreneurDashboardProps) => {
  const profileCompletion = 75; // This would come from user data
  
  const renderMobileContent = () => {
    switch (activeTab) {
      case "profile":
        return <BusinessProfile />;
      case "opportunities":
        return <FundingOpportunities />;
      case "messages":
        return <InvestorCommunications />;
      case "offers":
        return <InvestmentOffers />;
      case "milestones":
        return <MilestoneTracking />;
      case "reports":
        return <FinancialReports />;
      default:
        return <DashboardOverview profileCompletion={profileCompletion} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Mobile: Single content view based on activeTab */}
      <div className="md:hidden">
        {renderMobileContent()}
      </div>

      {/* Desktop: Tabs interface */}
      <div className="hidden md:block">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Dashboard</TabsTrigger>
            <TabsTrigger value="profile">Business Profile</TabsTrigger>
            <TabsTrigger value="opportunities">Funding</TabsTrigger>
            <TabsTrigger value="messages">Communications</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <DashboardOverview profileCompletion={profileCompletion} />
          </TabsContent>

          <TabsContent value="profile">
            <BusinessProfile />
          </TabsContent>

          <TabsContent value="opportunities">
            <FundingOpportunities />
          </TabsContent>

          <TabsContent value="messages">
            <InvestorCommunications />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const DashboardOverview = ({ profileCompletion }: { profileCompletion: number }) => (
  <div className="space-y-6">
    {/* Profile Completion Alert */}
    {profileCompletion < 80 && (
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-medium text-amber-800">Complete Your Profile</h3>
              <p className="text-sm text-amber-700 mt-1">
                You need to complete at least 80% of your profile to post funding opportunities.
              </p>
              <div className="mt-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>Profile Completion</span>
                  <span>{profileCompletion}%</span>
                </div>
                <Progress value={profileCompletion} className="h-2" />
              </div>
              <Button size="sm" className="mt-3 bg-amber-600 hover:bg-amber-700">
                Complete Profile
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )}

    {/* Dashboard Widgets */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <DashboardWidget
        title="Active Funding Requests"
        value="3"
        icon={<DollarSign className="h-4 w-4" />}
        trend="+1 this month"
        color="blue"
      />
      <DashboardWidget
        title="Total Investment Received"
        value="$45,000"
        icon={<TrendingUp className="h-4 w-4" />}
        trend="+$12,000 this month"
        color="green"
      />
      <DashboardWidget
        title="Pending Milestone Payments"
        value="$8,500"
        icon={<Target className="h-4 w-4" />}
        trend="2 milestones ready"
        color="amber"
      />
      <DashboardWidget
        title="Recent Investor Messages"
        value="7"
        icon={<MessageSquare className="h-4 w-4" />}
        trend="3 unread"
        color="purple"
      />
    </div>

    {/* Recent Activity */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Recent Investor Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback>JK</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium">John Kimani placed a bid</p>
              <p className="text-xs text-gray-500">EcoFarm Project - $15,000 for 12% equity</p>
            </div>
            <span className="text-xs text-gray-500">2h ago</span>
          </div>
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback>AS</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium">Adaora Syndicate joined consortium</p>
              <p className="text-xs text-gray-500">Tech Innovation Hub - 5 investors</p>
            </div>
            <span className="text-xs text-gray-500">5h ago</span>
          </div>
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback>MF</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium">Maria Fernandez sent message</p>
              <p className="text-xs text-gray-500">Interested in Solar Project partnership</p>
            </div>
            <span className="text-xs text-gray-500">1d ago</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Milestone Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>EcoFarm Nigeria</span>
                <span>4/5 Complete</span>
              </div>
              <Progress value={80} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">Next: Market expansion phase</p>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Solar Tech Project</span>
                <span>2/5 Complete</span>
              </div>
              <Progress value={40} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">Next: Prototype development</p>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>FinTech Solution</span>
                <span>1/5 Complete</span>
              </div>
              <Progress value={20} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">Next: MVP completion</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    {/* Quick Actions */}
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks to grow your business</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
            <Plus className="h-5 w-5" />
            <span className="text-sm">Create Funding Request</span>
          </Button>
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
            <FileText className="h-5 w-5" />
            <span className="text-sm">Update Milestone</span>
          </Button>
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
            <MessageSquare className="h-5 w-5" />
            <span className="text-sm">Message Investors</span>
          </Button>
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
            <Building2 className="h-5 w-5" />
            <span className="text-sm">Edit Business Profile</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
);

const DashboardWidget = ({ 
  title, 
  value, 
  icon, 
  trend, 
  color 
}: { 
  title: string; 
  value: string; 
  icon: React.ReactNode; 
  trend: string; 
  color: string; 
}) => {
  const colorClasses = {
    blue: "text-blue-600",
    green: "text-green-600",
    amber: "text-amber-600",
    purple: "text-purple-600"
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={colorClasses[color as keyof typeof colorClasses]}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{trend}</p>
      </CardContent>
    </Card>
  );
};

const FinancialReports = () => (
  <Card>
    <CardHeader>
      <CardTitle>Financial Reports</CardTitle>
      <CardDescription>Track your business financial performance</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-gray-600">Financial reporting features coming soon...</p>
    </CardContent>
  </Card>
);

export default EntrepreneurDashboard;
