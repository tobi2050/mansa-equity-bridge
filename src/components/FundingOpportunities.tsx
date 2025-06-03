
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, DollarSign, Users, Calendar, Eye, Edit, Trash2 } from "lucide-react";

const FundingOpportunities = () => {
  const [activeTab, setActiveTab] = useState("active");

  const opportunities = [
    {
      id: 1,
      title: "EcoFarm Nigeria - Expansion Phase",
      description: "Seeking funding to expand organic farming operations and digital marketplace to 5 new states",
      fundingGoal: 75000,
      currentFunding: 45000,
      equityOffered: 15,
      status: "active",
      bids: 8,
      timeLeft: "12 days",
      visibility: "Public",
      createdAt: "2 weeks ago"
    },
    {
      id: 2,
      title: "Solar Panel Manufacturing Setup",
      description: "Establish solar panel manufacturing facility to serve West African market",
      fundingGoal: 120000,
      currentFunding: 25000,
      equityOffered: 20,
      status: "active",
      bids: 3,
      timeLeft: "25 days",
      visibility: "Investors Only",
      createdAt: "1 week ago"
    },
    {
      id: 3,
      title: "Digital Payment Platform",
      description: "Completed funding round for mobile payment solution for small businesses",
      fundingGoal: 50000,
      currentFunding: 50000,
      equityOffered: 12,
      status: "completed",
      bids: 15,
      timeLeft: "Completed",
      visibility: "Public",
      createdAt: "3 months ago"
    }
  ];

  const filteredOpportunities = opportunities.filter(opp => {
    if (activeTab === "active") return opp.status === "active";
    if (activeTab === "completed") return opp.status === "completed";
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Funding Opportunities</h2>
          <p className="text-gray-600">Manage your funding requests and track investor interest</p>
        </div>
        <Button className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Create New Request
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active ({opportunities.filter(o => o.status === "active").length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({opportunities.filter(o => o.status === "completed").length})</TabsTrigger>
          <TabsTrigger value="all">All ({opportunities.length})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredOpportunities.map((opportunity) => (
            <Card key={opportunity.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                      <Badge variant={opportunity.status === "active" ? "default" : "secondary"}>
                        {opportunity.status}
                      </Badge>
                    </div>
                    <CardDescription className="text-base">
                      {opportunity.description}
                    </CardDescription>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">
                      {opportunity.visibility}
                    </Badge>
                    <Badge variant="outline" className="text-green-600 border-green-200">
                      {opportunity.equityOffered}% Equity
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Funding Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Funding Progress</span>
                    <span className="font-medium">
                      ${opportunity.currentFunding.toLocaleString()} / ${opportunity.fundingGoal.toLocaleString()}
                    </span>
                  </div>
                  <Progress 
                    value={(opportunity.currentFunding / opportunity.fundingGoal) * 100} 
                    className="h-3"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {Math.round((opportunity.currentFunding / opportunity.fundingGoal) * 100)}% funded
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span>{opportunity.bids} bids</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>{opportunity.timeLeft}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                    <span>${opportunity.fundingGoal.toLocaleString()} goal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-gray-500" />
                    <span>Created {opportunity.createdAt}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  {opportunity.status === "active" && (
                    <>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 text-red-600 hover:bg-red-50">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </>
                  )}
                  {opportunity.status === "completed" && (
                    <Button variant="outline" size="sm" className="flex-1">
                      View Investment Details
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredOpportunities.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No {activeTab} funding opportunities
                </h3>
                <p className="text-gray-500 mb-4">
                  {activeTab === "active" 
                    ? "Create your first funding request to start attracting investors"
                    : "You don't have any completed funding rounds yet"
                  }
                </p>
                {activeTab === "active" && (
                  <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Funding Request
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FundingOpportunities;
