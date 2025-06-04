
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Calendar, BookOpen } from "lucide-react";

interface InvestmentOpportunitiesProps {
  userRole: 'investor' | 'philanthropist';
}

const InvestmentOpportunities = ({ userRole }: InvestmentOpportunitiesProps) => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const opportunities = [
    {
      id: 1,
      title: "EcoFarm Nigeria - Organic Agriculture",
      description: "Sustainable farming initiative connecting rural farmers with urban markets through organic certification and digital marketplace.",
      stage: "Scaling",
      fundingGoal: 75000,
      currentFunding: 45000,
      location: "Lagos, Nigeria",
      category: "Agriculture",
      equityOffered: 15,
      minimumInvestment: 1000,
      bidders: 8,
      timeLeft: "12 days",
      milestones: 5,
      completedMilestones: 3,
      entrepreneur: {
        name: "Amara Okafor",
        initials: "AO"
      }
    },
    {
      id: 2,
      title: "Solar Tech Ghana - Clean Energy Solutions",
      description: "Manufacturing affordable solar panels for rural communities while creating local jobs and reducing energy poverty.",
      stage: "MVP",
      fundingGoal: 50000,
      currentFunding: 15000,
      location: "Accra, Ghana",
      category: "Energy",
      equityOffered: 20,
      minimumInvestment: 500,
      bidders: 12,
      timeLeft: "8 days",
      milestones: 5,
      completedMilestones: 2,
      entrepreneur: {
        name: "Kwame Asante",
        initials: "KA"
      }
    },
    {
      id: 3,
      title: "FinTech Kenya - Mobile Banking for SMEs",
      description: "Digital banking platform specifically designed for small and medium enterprises across East Africa.",
      stage: "Prototype",
      fundingGoal: 100000,
      currentFunding: 35000,
      location: "Nairobi, Kenya",
      category: "FinTech",
      equityOffered: 12,
      minimumInvestment: 750,
      bidders: 15,
      timeLeft: "15 days",
      milestones: 5,
      completedMilestones: 1,
      entrepreneur: {
        name: "Grace Wanjiku",
        initials: "GW"
      }
    }
  ];

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Idea': return 'bg-gray-100 text-gray-800';
      case 'Prototype': return 'bg-blue-100 text-blue-800';
      case 'MVP': return 'bg-yellow-100 text-yellow-800';
      case 'Scaling': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opp.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || opp.category.toLowerCase() === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search opportunities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="agriculture">Agriculture</SelectItem>
            <SelectItem value="energy">Energy</SelectItem>
            <SelectItem value="fintech">FinTech</SelectItem>
            <SelectItem value="healthcare">Healthcare</SelectItem>
            <SelectItem value="education">Education</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6">
        {filteredOpportunities.map((opportunity) => (
          <Card key={opportunity.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Avatar>
                      <AvatarFallback>{opportunity.entrepreneur.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                      <p className="text-sm text-gray-600">{opportunity.entrepreneur.name}</p>
                    </div>
                  </div>
                  <CardDescription className="text-base">
                    {opportunity.description}
                  </CardDescription>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge className={getStageColor(opportunity.stage)}>
                    {opportunity.stage}
                  </Badge>
                  <Badge variant="outline">
                    {opportunity.category}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Funding Progress</span>
                    <span className="font-medium">
                      ${opportunity.currentFunding.toLocaleString()} / ${opportunity.fundingGoal.toLocaleString()}
                    </span>
                  </div>
                  <Progress 
                    value={(opportunity.currentFunding / opportunity.fundingGoal) * 100} 
                    className="h-2"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Milestones</span>
                    <span className="font-medium">
                      {opportunity.completedMilestones} / {opportunity.milestones}
                    </span>
                  </div>
                  <Progress 
                    value={(opportunity.completedMilestones / opportunity.milestones) * 100} 
                    className="h-2"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Location:</span>
                  <p className="font-medium">{opportunity.location}</p>
                </div>
                {userRole === 'investor' && (
                  <div>
                    <span className="text-gray-600">Equity Offered:</span>
                    <p className="font-medium">{opportunity.equityOffered}%</p>
                  </div>
                )}
                <div>
                  <span className="text-gray-600">Min. {userRole === 'investor' ? 'Investment' : 'Donation'}:</span>
                  <p className="font-medium">${opportunity.minimumInvestment}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{opportunity.bidders} {userRole === 'investor' ? 'bidders' : 'supporters'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{opportunity.timeLeft} left</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <BookOpen className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  <Button 
                    size="sm"
                    className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
                  >
                    {userRole === 'investor' ? 'Place Bid' : 'Support'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InvestmentOpportunities;
