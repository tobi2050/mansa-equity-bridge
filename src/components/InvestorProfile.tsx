import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Building2, 
  Target,
  MessageCircle,
  Star,
  FileText,
  Shield,
  Settings,
  Plus
} from "lucide-react";

interface InvestorProfileProps {
  isOwnProfile?: boolean;
}

const InvestorProfile = ({ isOwnProfile = false }: InvestorProfileProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [profileCompletion] = useState(65); // Below 50% minimum
  
  const investorStats = {
    totalInvested: "$125,000",
    activeInvestments: 7,
    portfolioValue: "$156,000",
    avgROI: "+18.5%",
    milestonesApproved: 24,
    businessesRated: 12
  };

  const recentOpportunities = [
    { name: "AgriTech Solutions", sector: "Agriculture", funding: "$50K", equity: "15%", stage: "Series A" },
    { name: "EduConnect Africa", sector: "Education", funding: "$30K", equity: "12%", stage: "Seed" },
    { name: "HealthTech Nigeria", sector: "Healthcare", funding: "$75K", equity: "20%", stage: "Pre-Series A" }
  ];

  const activeConsortiums = [
    { name: "African AgTech Investors", members: 8, totalFunding: "$200K", status: "Active" },
    { name: "EdTech Impact Group", members: 5, totalFunding: "$150K", status: "Forming" }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Profile Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-blue-900">Supporter Dashboard</h1>
              <p className="text-blue-700 mt-1">Manage your investment portfolio and discover opportunities</p>
            </div>
            {isOwnProfile && profileCompletion < 50 && (
              <Badge variant="destructive">Profile Incomplete</Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Profile Completion Alert */}
      {isOwnProfile && profileCompletion < 50 && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-red-800">Complete Your Investor Profile</h3>
                <p className="text-sm text-red-600">Minimum 50% completion required for investment access</p>
                <Progress value={profileCompletion} className="w-48 mt-2" />
                <span className="text-xs text-red-600">{profileCompletion}% complete</span>
              </div>
              <Button className="bg-red-600 hover:bg-red-700">
                Complete Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="consortiums">Consortiums</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Investment Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6 text-center">
                <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">{investorStats.totalInvested}</div>
                <div className="text-xs text-gray-600">Total Contributed</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Building2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">{investorStats.activeInvestments}</div>
                <div className="text-xs text-gray-600">Active Projects</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-600">{investorStats.portfolioValue}</div>
                <div className="text-xs text-gray-600">Portfolio Value</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Target className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-amber-600">{investorStats.avgROI}</div>
                <div className="text-xs text-gray-600">Average ROI</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Shield className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-indigo-600">{investorStats.milestonesApproved}</div>
                <div className="text-xs text-gray-600">Milestones Approved</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-yellow-600">{investorStats.businessesRated}</div>
                <div className="text-xs text-gray-600">Businesses Rated</div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
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

          {/* Pending Milestone Approvals */}
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
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Investment Opportunities</h2>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Set Filters
            </Button>
          </div>
          <div className="grid gap-4">
            {recentOpportunities.map((opportunity, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{opportunity.name}</h3>
                      <p className="text-sm text-gray-600">{opportunity.sector}</p>
                      <div className="flex gap-4 mt-2 text-sm">
                        <span>Seeking: {opportunity.funding}</span>
                        <span>Equity: {opportunity.equity}</span>
                        <Badge variant="outline">{opportunity.stage}</Badge>
                      </div>
                    </div>
                    <Button>Place Bid</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-4">
          <h2 className="text-xl font-semibold">Investment Portfolio</h2>
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold">EcoFarm Nigeria</h3>
                      <p className="text-sm text-gray-600">$15,000 invested • 12% equity</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <Progress value={60} className="mb-2" />
                  <div className="flex justify-between text-sm">
                    <span>Milestone 3/5 completed</span>
                    <span className="text-green-600">+22% current value</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="consortiums" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Investment Consortiums</h2>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Consortium
            </Button>
          </div>
          <div className="grid gap-4">
            {activeConsortiums.map((consortium, i) => (
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InvestorProfile;
