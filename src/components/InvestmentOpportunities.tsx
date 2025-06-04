
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Building2, 
  MapPin, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  Users,
  Filter,
  Search,
  ArrowLeft,
  MessageCircle
} from "lucide-react";
import BidDetails from "./BidDetails";

interface InvestmentOpportunitiesProps {
  onBack?: () => void;
}

const InvestmentOpportunities = ({ onBack }: InvestmentOpportunitiesProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [showBidDetails, setShowBidDetails] = useState(false);

  const opportunities = [
    {
      id: 1,
      title: "EcoFarm Nigeria",
      description: "Sustainable agriculture solutions for small-scale farmers in West Africa",
      industry: "Agriculture",
      location: "Lagos, Nigeria",
      fundingGoal: 50000,
      raised: 32500,
      daysLeft: 15,
      entrepreneur: "Adaora Okwu",
      equity: "15%",
      bidders: 8,
      comments: 12,
      milestones: { completed: 3, total: 5 },
      image: "agriculture",
      featured: true
    },
    {
      id: 2,
      title: "TechHub Accra",
      description: "Co-working space and incubator for tech startups in Ghana",
      industry: "Technology",
      location: "Accra, Ghana",
      fundingGoal: 75000,
      raised: 18500,
      daysLeft: 22,
      entrepreneur: "Kwame Asante",
      equity: "12%",
      bidders: 5,
      comments: 8,
      milestones: { completed: 2, total: 4 },
      image: "technology",
      featured: false
    },
    {
      id: 3,
      title: "Solar Solutions Kenya",
      description: "Affordable solar energy systems for rural communities",
      industry: "Energy",
      location: "Nairobi, Kenya",
      fundingGoal: 40000,
      raised: 28000,
      daysLeft: 8,
      entrepreneur: "Maria Wanjiku",
      equity: "18%",
      bidders: 12,
      comments: 15,
      milestones: { completed: 4, total: 5 },
      image: "energy",
      featured: true
    }
  ];

  const handleViewDetails = (opportunity: any) => {
    setSelectedOpportunity(opportunity);
    setShowBidDetails(true);
  };

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opp.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = selectedIndustry === "" || opp.industry === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onBack && (
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Investment Opportunities</h1>
            <p className="text-gray-600">Discover and invest in African businesses</p>
          </div>
        </div>
        <Badge variant="outline" className="text-green-600 border-green-200">
          {filteredOpportunities.length} opportunities
        </Badge>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <Input
                placeholder="Search opportunities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="All Industries" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Industries</SelectItem>
                <SelectItem value="Agriculture">Agriculture</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Energy">Energy</SelectItem>
                <SelectItem value="Healthcare">Healthcare</SelectItem>
                <SelectItem value="Education">Education</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Opportunities Grid */}
      <div className="grid gap-6">
        {filteredOpportunities.map((opportunity) => (
          <Card key={opportunity.id} className={`hover:shadow-lg transition-shadow ${opportunity.featured ? 'ring-2 ring-amber-200' : ''}`}>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Left: Business Image */}
                <div className="space-y-4">
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center">
                    <Building2 className="w-12 h-12 text-blue-600" />
                  </div>
                  {opportunity.featured && (
                    <Badge className="bg-amber-100 text-amber-800">Featured</Badge>
                  )}
                </div>

                {/* Middle: Details */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{opportunity.title}</h3>
                    <p className="text-gray-600 mb-3">{opportunity.description}</p>
                    
                    <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        {opportunity.industry}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {opportunity.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {opportunity.daysLeft} days left
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Funding Progress</span>
                      <span className="font-medium">
                        ${opportunity.raised.toLocaleString()} / ${opportunity.fundingGoal.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={(opportunity.raised / opportunity.fundingGoal) * 100} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {opportunity.bidders} bidders
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        {opportunity.comments} comments
                      </span>
                    </div>
                    <span className="text-green-600 font-medium">{opportunity.equity} equity offered</span>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-center mb-3">
                      <div className="text-2xl font-bold text-green-600">
                        ${opportunity.fundingGoal.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Funding Goal</div>
                    </div>
                    
                    <div className="text-center mb-3">
                      <div className="text-lg font-semibold text-blue-600">{opportunity.equity}</div>
                      <div className="text-sm text-gray-600">Equity Offered</div>
                    </div>

                    <div className="text-center mb-4">
                      <div className="text-sm text-gray-600">
                        Milestone Progress: {opportunity.milestones.completed}/{opportunity.milestones.total}
                      </div>
                      <Progress 
                        value={(opportunity.milestones.completed / opportunity.milestones.total) * 100} 
                        className="h-1 mt-1" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button 
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
                      onClick={() => handleViewDetails(opportunity)}
                    >
                      View Details & Bid
                    </Button>
                    <Button variant="outline" className="w-full">
                      Save Opportunity
                    </Button>
                  </div>

                  <div className="text-center">
                    <p className="text-xs text-gray-500">by {opportunity.entrepreneur}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bid Details Modal */}
      {showBidDetails && selectedOpportunity && (
        <BidDetails
          isOpen={showBidDetails}
          onClose={() => setShowBidDetails(false)}
          opportunity={selectedOpportunity}
        />
      )}
    </div>
  );
};

export default InvestmentOpportunities;
