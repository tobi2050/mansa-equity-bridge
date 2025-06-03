
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  Shield,
  Settings,
  FileText,
  MessageSquare,
  BarChart3,
  UserCheck,
  LogOut
} from "lucide-react";

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = {
    totalUsers: 2847,
    pendingVerifications: 23,
    totalTransactions: 456789,
    platformRevenue: 89234,
    successfulDeals: 342,
    activeInvestments: 128
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-gray-900 text-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">MANSA Admin Dashboard</h1>
              <p className="text-sm text-gray-300">Super Administrator</p>
            </div>
          </div>
          <Button variant="outline" onClick={onLogout} className="border-gray-600 text-gray-300 hover:bg-gray-800">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="moderation">Moderation</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Verifications</CardTitle>
                  <UserCheck className="h-4 w-4 text-amber-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.pendingVerifications}</div>
                  <p className="text-xs text-muted-foreground">Requires attention</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Platform Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${stats.platformRevenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+8% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${stats.totalTransactions.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">All time volume</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Successful Deals</CardTitle>
                  <BarChart3 className="h-4 w-4 text-emerald-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.successfulDeals}</div>
                  <p className="text-xs text-muted-foreground">Completed investments</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Investments</CardTitle>
                  <TrendingUp className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.activeInvestments}</div>
                  <p className="text-xs text-muted-foreground">Currently ongoing</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent User Registrations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: "Adaora Okwu", role: "Entrepreneur", time: "5 min ago", status: "pending" },
                      { name: "Kwame Asante", role: "Investor", time: "12 min ago", status: "verified" },
                      { name: "Maria Santos", role: "Philanthropist", time: "1 hour ago", status: "verified" }
                    ].map((user, i) => (
                      <div key={i} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.role} • {user.time}</p>
                        </div>
                        <Badge variant={user.status === 'verified' ? 'default' : 'secondary'}>
                          {user.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded">
                      <AlertTriangle className="w-5 h-5 text-red-500" />
                      <div>
                        <p className="font-medium text-red-800">Suspicious transaction detected</p>
                        <p className="text-sm text-red-600">Large investment from unverified user</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-200 rounded">
                      <AlertTriangle className="w-5 h-5 text-amber-500" />
                      <div>
                        <p className="font-medium text-amber-800">Server maintenance required</p>
                        <p className="text-sm text-amber-600">Schedule update for next week</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage user accounts and verifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Pending Verifications ({stats.pendingVerifications})</h4>
                    <Button size="sm">Review All</Button>
                  </div>
                  <div className="border rounded-lg divide-y">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="p-4 flex items-center justify-between">
                        <div>
                          <p className="font-medium">John Entrepreneur {i}</p>
                          <p className="text-sm text-gray-600">Submitted business documents</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Reject</Button>
                          <Button size="sm">Approve</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financial" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Financial Oversight</CardTitle>
                <CardDescription>Monitor transactions and platform revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Transaction Volume (Last 30 Days)</h4>
                    <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-12 h-12 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Revenue Breakdown</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Investment Fees (2%)</span>
                        <span className="font-medium">$45,234</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Business Withdrawal Fees (0.5%)</span>
                        <span className="font-medium">$12,456</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Membership Fees</span>
                        <span className="font-medium">$31,544</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="moderation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Moderation</CardTitle>
                <CardDescription>Review flagged content and user reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Flagged Posts</h4>
                      <p className="text-2xl font-bold text-red-600">7</p>
                      <p className="text-sm text-gray-600">Require review</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">User Reports</h4>
                      <p className="text-2xl font-bold text-amber-600">12</p>
                      <p className="text-sm text-gray-600">Pending investigation</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Configuration</CardTitle>
                <CardDescription>Manage system settings and features</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3">Fee Structure</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm">Investor Fee (%)</label>
                        <input className="w-full mt-1 px-3 py-2 border rounded" defaultValue="2" />
                      </div>
                      <div>
                        <label className="text-sm">Business Withdrawal Fee (%)</label>
                        <input className="w-full mt-1 px-3 py-2 border rounded" defaultValue="0.5" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Membership Tiers</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Gold Tier Monthly Fee</span>
                        <input className="w-20 px-2 py-1 border rounded text-right" defaultValue="$99" />
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Black Tier Monthly Fee</span>
                        <input className="w-20 px-2 py-1 border rounded text-right" defaultValue="$49" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
