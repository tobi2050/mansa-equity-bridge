
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Users, BookOpen, User, Calendar, MessageSquare } from "lucide-react";
import InvestmentOpportunities from "@/components/InvestmentOpportunities";
import BusinessListings from "@/components/BusinessListings";

interface DashboardProps {
  userRole: 'investor' | 'entrepreneur' | 'philanthropist';
  onLogout: () => void;
}

const Dashboard = ({ userRole, onLogout }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  const getRoleIcon = () => {
    switch (userRole) {
      case 'investor': return <Users className="h-5 w-5" />;
      case 'entrepreneur': return <BookOpen className="h-5 w-5" />;
      case 'philanthropist': return <User className="h-5 w-5" />;
    }
  };

  const getRoleColor = () => {
    switch (userRole) {
      case 'investor': return 'bg-green-100 text-green-800';
      case 'entrepreneur': return 'bg-blue-100 text-blue-800';
      case 'philanthropist': return 'bg-purple-100 text-purple-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">M</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">MANSA Dashboard</h1>
            <Badge className={getRoleColor()}>
              {getRoleIcon()}
              <span className="ml-1 capitalize">{userRole}</span>
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Button variant="outline" onClick={onLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="opportunities">
              {userRole === 'entrepreneur' ? 'My Businesses' : 'Opportunities'}
            </TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Quick Stats */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {userRole === 'investor' ? 'Total Invested' : 
                     userRole === 'entrepreneur' ? 'Total Raised' : 'Total Donated'}
                  </CardTitle>
                  <span className="text-2xl font-bold text-amber-600">$2,340</span>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {userRole === 'investor' ? 'Active Investments' : 
                     userRole === 'entrepreneur' ? 'Active Listings' : 'Supported Businesses'}
                  </CardTitle>
                  <span className="text-2xl font-bold text-amber-600">12</span>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    +3 this month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {userRole === 'investor' ? 'Portfolio Value' : 
                     userRole === 'entrepreneur' ? 'Business Value' : 'Impact Score'}
                  </CardTitle>
                  <span className="text-2xl font-bold text-amber-600">
                    {userRole === 'philanthropist' ? '8.5/10' : '$5,760'}
                  </span>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    +12% growth
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest transactions and updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {userRole === 'investor' ? 'Investment in TechStart Africa' : 
                       userRole === 'entrepreneur' ? 'New bid received from Investor Consortium' : 
                       'Donation to Solar Energy Project'}
                    </p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    +$500
                  </Badge>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Milestone completed for AgriTech Solutions</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                  <Badge variant="outline" className="text-blue-600 border-blue-200">
                    Milestone 3/5
                  </Badge>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {userRole === 'investor' ? 'Joined consortium for Manufacturing Co.' : 
                       'Profile verification completed'}
                    </p>
                    <p className="text-xs text-gray-500">3 days ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="opportunities" className="space-y-6">
            {userRole === 'entrepreneur' ? (
              <BusinessListings />
            ) : (
              <InvestmentOpportunities userRole={userRole} />
            )}
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Activity Feed
                </CardTitle>
                <CardDescription>Stay updated with your network and investments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="border-l-2 border-amber-200 pl-4 pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">EcoFarm Nigeria reached Milestone 4</h4>
                      <span className="text-xs text-gray-500">2h ago</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Successfully launched organic certification program and secured 50 new farmers.
                    </p>
                    <Progress value={80} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">4/5 milestones completed</p>
                  </div>
                  
                  <div className="border-l-2 border-blue-200 pl-4 pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">New investment opportunity: Solar Tech Ghana</h4>
                      <span className="text-xs text-gray-500">5h ago</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Seeking $50,000 for solar panel manufacturing startup in Accra.
                    </p>
                  </div>
                  
                  <div className="border-l-2 border-green-200 pl-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Consortium formed for AgriTech Solutions</h4>
                      <span className="text-xs text-gray-500">1d ago</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      5 investors joined forces to fund innovative farming technology in Kenya.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Manage your account and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Account Information</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Email:</span> john.doe@example.com</p>
                      <p><span className="font-medium">Role:</span> <Badge className={getRoleColor()}>{userRole}</Badge></p>
                      <p><span className="font-medium">Member since:</span> January 2024</p>
                      <p><span className="font-medium">Profile completion:</span> 85%</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Verification Status</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Email Verified</span>
                        <Badge className="bg-green-100 text-green-800">✓ Verified</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Identity Verified</span>
                        <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Business Documents</span>
                        <Badge className="bg-gray-100 text-gray-800">Not Required</Badge>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-4">
                  <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white">
                    Complete Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
