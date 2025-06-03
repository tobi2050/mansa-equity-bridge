
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  Users, 
  BookOpen, 
  User, 
  Calendar, 
  MessageSquare, 
  Menu,
  Building2,
  TrendingUp,
  DollarSign,
  Target,
  Bell,
  Settings,
  Home,
  Plus
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import InvestmentOpportunities from "@/components/InvestmentOpportunities";
import BusinessListings from "@/components/BusinessListings";
import EntrepreneurDashboard from "@/components/EntrepreneurDashboard";
import CreatePost from "@/components/CreatePost";

interface DashboardProps {
  userRole: 'investor' | 'entrepreneur' | 'philanthropist';
  onLogout: () => void;
}

const Dashboard = ({ userRole, onLogout }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showCreatePost, setShowCreatePost] = useState(false);
  const navigate = useNavigate();

  const getRoleIcon = () => {
    switch (userRole) {
      case 'investor': return <Users className="h-4 w-4" />;
      case 'entrepreneur': return <BookOpen className="h-4 w-4" />;
      case 'philanthropist': return <User className="h-4 w-4" />;
    }
  };

  const getRoleColor = () => {
    switch (userRole) {
      case 'investor': return 'bg-green-100 text-green-800';
      case 'entrepreneur': return 'bg-blue-100 text-blue-800';
      case 'philanthropist': return 'bg-purple-100 text-purple-800';
    }
  };

  const MobileNavigation = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <div className="flex flex-col h-full bg-white">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">MANSA</h2>
                <Badge className={`${getRoleColor()} text-xs`}>
                  {getRoleIcon()}
                  <span className="ml-1 capitalize">{userRole}</span>
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <nav className="p-2 space-y-1">
              <NavItem icon={<Home className="h-4 w-4" />} label="Home Feed" onClick={() => navigate('/feed')} />
              <NavItem icon={<User className="h-4 w-4" />} label="My Profile" onClick={() => navigate('/profile')} />
              {userRole === 'entrepreneur' ? (
                <>
                  <NavItem icon={<TrendingUp className="h-4 w-4" />} label="Dashboard" active={activeTab === "overview"} onClick={() => setActiveTab("overview")} />
                  <NavItem icon={<Building2 className="h-4 w-4" />} label="My Business Profile" onClick={() => setActiveTab("profile")} />
                  <NavItem icon={<DollarSign className="h-4 w-4" />} label="Funding Opportunities" onClick={() => setActiveTab("opportunities")} />
                  <NavItem icon={<MessageSquare className="h-4 w-4" />} label="Investor Communications" onClick={() => setActiveTab("messages")} />
                  <NavItem icon={<Users className="h-4 w-4" />} label="Investment Offers" onClick={() => setActiveTab("offers")} />
                  <NavItem icon={<Target className="h-4 w-4" />} label="Milestone Tracking" onClick={() => setActiveTab("milestones")} />
                  <NavItem icon={<TrendingUp className="h-4 w-4" />} label="Financial Reports" onClick={() => setActiveTab("reports")} />
                </>
              ) : (
                <>
                  <NavItem icon={<TrendingUp className="h-4 w-4" />} label="Dashboard" active={activeTab === "overview"} onClick={() => setActiveTab("overview")} />
                  <NavItem icon={<BookOpen className="h-4 w-4" />} label="Opportunities" onClick={() => setActiveTab("opportunities")} />
                  <NavItem icon={<MessageSquare className="h-4 w-4" />} label="Activity" onClick={() => setActiveTab("activity")} />
                </>
              )}
              <NavItem icon={<Settings className="h-4 w-4" />} label="Settings" onClick={() => setActiveTab("settings")} />
            </nav>
          </div>
          
          <div className="p-4 border-t border-gray-200">
            <Button variant="outline" onClick={onLogout} className="w-full">
              Logout
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  const NavItem = ({ icon, label, active = false, onClick }: { icon: React.ReactNode; label: string; active?: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
        active 
          ? 'bg-amber-100 text-amber-800' 
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile-First Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <MobileNavigation />
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-gray-900">MANSA</h1>
              </div>
            </div>
            <Badge className={`${getRoleColor()} hidden sm:flex`}>
              {getRoleIcon()}
              <span className="ml-1 capitalize text-xs">{userRole}</span>
            </Badge>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setShowCreatePost(true)}
              className="text-amber-600 hover:bg-amber-50"
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
            </Button>
            <Avatar className="h-8 w-8" onClick={() => navigate('/profile')}>
              <AvatarFallback className="text-xs cursor-pointer">JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="px-4 py-4 md:px-6 md:py-8">
        {/* Mobile-optimized content */}
        {userRole === 'entrepreneur' ? (
          <EntrepreneurDashboard activeTab={activeTab} setActiveTab={setActiveTab} />
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
              <TabsTrigger value="overview" className="text-xs md:text-sm">Overview</TabsTrigger>
              <TabsTrigger value="opportunities" className="text-xs md:text-sm">Opportunities</TabsTrigger>
              <TabsTrigger value="activity" className="text-xs md:text-sm">Activity</TabsTrigger>
              <TabsTrigger value="profile" className="text-xs md:text-sm">Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {userRole === 'investor' ? 'Total Invested' : 'Total Donated'}
                    </CardTitle>
                    <span className="text-xl md:text-2xl font-bold text-amber-600">$2,340</span>
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
                      {userRole === 'investor' ? 'Active Investments' : 'Supported Businesses'}
                    </CardTitle>
                    <span className="text-xl md:text-2xl font-bold text-amber-600">12</span>
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
                      {userRole === 'investor' ? 'Portfolio Value' : 'Impact Score'}
                    </CardTitle>
                    <span className="text-xl md:text-2xl font-bold text-amber-600">
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
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                  <CardDescription>Your latest transactions and updates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {userRole === 'investor' ? 'Investment in TechStart Africa' : 'Donation to Solar Energy Project'}
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
                        {userRole === 'investor' ? 'Joined consortium for Manufacturing Co.' : 'Profile verification completed'}
                      </p>
                      <p className="text-xs text-gray-500">3 days ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="opportunities" className="space-y-4 md:space-y-6">
              <InvestmentOpportunities userRole={userRole} />
            </TabsContent>

            <TabsContent value="activity" className="space-y-4 md:space-y-6">
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

            <TabsContent value="profile" className="space-y-4 md:space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>Manage your account and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <Button className="w-full md:w-auto bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white">
                      Complete Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>

      {showCreatePost && (
        <CreatePost 
          userRole={userRole}
          onClose={() => setShowCreatePost(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
