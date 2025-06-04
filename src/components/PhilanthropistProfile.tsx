
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Heart, 
  Users, 
  Building2, 
  Target,
  MessageCircle,
  Star,
  TrendingUp,
  Plus,
  Gift
} from "lucide-react";

interface PhilanthropistProfileProps {
  isOwnProfile?: boolean;
  onToggleInvestor?: () => void;
  isDualRole?: boolean;
}

const PhilanthropistProfile = ({ isOwnProfile = false, onToggleInvestor, isDualRole = false }: PhilanthropistProfileProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  
  const philanthropistStats = {
    totalDonated: "$45,000",
    businessesSupported: 15,
    forumsJoined: 8,
    impactScore: "High",
    messagesExchanged: 127,
    businessesRated: 9
  };

  const recentGrants = [
    { name: "Clean Water Initiative", amount: "$5,000", impact: "500 families", status: "Active" },
    { name: "Women's Education Program", amount: "$3,500", impact: "50 scholarships", status: "Completed" },
    { name: "Solar Energy Project", amount: "$8,000", impact: "3 villages", status: "In Progress" }
  ];

  const joinedForums = [
    { name: "Sustainable Agriculture", members: 45, activity: "High", lastPost: "2 hours ago" },
    { name: "Education for All", members: 67, activity: "Medium", lastPost: "1 day ago" },
    { name: "Healthcare Access", members: 32, activity: "High", lastPost: "4 hours ago" }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Profile Header */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-green-900">Philanthropist Dashboard</h1>
              <p className="text-green-700 mt-1">Supporting African businesses through impact-focused giving</p>
              {isDualRole && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={onToggleInvestor}
                  className="mt-2 border-green-500 text-green-700"
                >
                  Switch to Investor Mode
                </Button>
              )}
            </div>
            <Badge className="bg-green-100 text-green-800">
              <Heart className="w-3 h-3 mr-1" />
              Impact Focus
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="impact">Impact Tracker</TabsTrigger>
          <TabsTrigger value="forums">Forums</TabsTrigger>
          <TabsTrigger value="grants">Grant History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Impact Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6 text-center">
                <Gift className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">{philanthropistStats.totalDonated}</div>
                <div className="text-xs text-gray-600">Total Donated</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Building2 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">{philanthropistStats.businessesSupported}</div>
                <div className="text-xs text-gray-600">Businesses Supported</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-600">{philanthropistStats.forumsJoined}</div>
                <div className="text-xs text-gray-600">Forums Joined</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Target className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-amber-600">{philanthropistStats.impactScore}</div>
                <div className="text-xs text-gray-600">Impact Score</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <MessageCircle className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-indigo-600">{philanthropistStats.messagesExchanged}</div>
                <div className="text-xs text-gray-600">Messages Sent</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-yellow-600">{philanthropistStats.businessesRated}</div>
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
                  <Gift className="w-6 h-6" />
                  <span className="text-xs">Make Donation</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Users className="w-6 h-6" />
                  <span className="text-xs">Join Forum</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <MessageCircle className="w-6 h-6" />
                  <span className="text-xs">Send Message</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Star className="w-6 h-6" />
                  <span className="text-xs">Rate Business</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Impact Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start space-x-3 pb-3 border-b last:border-b-0">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        Donated $2,000 to Water Access Initiative
                      </p>
                      <p className="text-xs text-gray-500">Expected to impact 200 families • {i} days ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="impact" className="space-y-4">
          <h2 className="text-xl font-semibold">Impact Tracking</h2>
          <div className="grid gap-4">
            {recentGrants.map((grant, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{grant.name}</h3>
                      <p className="text-sm text-gray-600">Donated: {grant.amount}</p>
                      <p className="text-sm text-green-600">Impact: {grant.impact}</p>
                    </div>
                    <Badge variant={grant.status === 'Active' ? 'default' : grant.status === 'Completed' ? 'secondary' : 'outline'}>
                      {grant.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="forums" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Community Forums</h2>
            <p className="text-sm text-gray-600">Note: Philanthropists can join but not create forums</p>
          </div>
          <div className="grid gap-4">
            {joinedForums.map((forum, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{forum.name}</h3>
                      <p className="text-sm text-gray-600">{forum.members} members</p>
                      <p className="text-xs text-gray-500">Last post: {forum.lastPost}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={forum.activity === 'High' ? 'default' : 'secondary'}>
                        {forum.activity} Activity
                      </Badge>
                      <Button size="sm" className="mt-2 block">
                        Participate
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="grants" className="space-y-4">
          <h2 className="text-xl font-semibold">Grant History</h2>
          <div className="grid gap-4">
            {recentGrants.concat([
              { name: "Tech Skills Training", amount: "$4,200", impact: "75 students", status: "Completed" },
              { name: "Microfinance Support", amount: "$6,800", impact: "25 small businesses", status: "Active" }
            ]).map((grant, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{grant.name}</h3>
                      <p className="text-sm text-gray-600">Amount: {grant.amount}</p>
                      <p className="text-sm text-green-600">Impact: {grant.impact}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={grant.status === 'Active' ? 'default' : 'secondary'}>
                        {grant.status}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">Dec 2024</p>
                    </div>
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

export default PhilanthropistProfile;
