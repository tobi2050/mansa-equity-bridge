
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  Building2, 
  MapPin, 
  DollarSign, 
  TrendingUp,
  Users,
  ArrowLeft,
  Home
} from "lucide-react";
import MobileLayout from "@/components/MobileLayout";

const InvestmentOpportunities = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState("all");

  const opportunities = [
    {
      id: 1,
      title: "AgriTech Solutions",
      sector: "Agriculture",
      location: "Lagos, Nigeria",
      fundingGoal: "$250,000",
      raised: "$75,000",
      progress: 30,
      equity: "15%",
      stage: "Series A",
      description: "Revolutionary farming technology platform connecting smallholder farmers with modern agricultural solutions.",
      riskLevel: "Medium",
      expectedROI: "18-25%"
    },
    {
      id: 2,
      title: "EduConnect Africa",
      sector: "Education",
      location: "Nairobi, Kenya",
      fundingGoal: "$180,000",
      raised: "$120,000",
      progress: 67,
      equity: "12%",
      stage: "Seed",
      description: "Digital learning platform providing quality education to underserved communities across Africa.",
      riskLevel: "Low",
      expectedROI: "15-22%"
    },
    {
      id: 3,
      title: "HealthTech Nigeria",
      sector: "Healthcare",
      location: "Abuja, Nigeria",
      fundingGoal: "$400,000",
      raised: "$50,000",
      progress: 13,
      equity: "20%",
      stage: "Pre-Series A",
      description: "Telemedicine platform connecting patients with healthcare providers in rural areas.",
      riskLevel: "High",
      expectedROI: "25-35%"
    }
  ];

  const sectors = ["all", "Agriculture", "Education", "Healthcare", "Technology", "Finance"];

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opp.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSector === "all" || opp.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  const handleViewDetails = (opportunityId: number) => {
    navigate(`/investment-details/${opportunityId}`);
  };

  return (
    <MobileLayout userRole="investor">
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Header */}
        <div className="bg-white border-b px-4 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-lg font-semibold">Investment Opportunities</h1>
                <p className="text-xs text-gray-600">Discover and invest in African businesses</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              <Home className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="p-4 bg-white border-b">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search opportunities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Tabs value={selectedSector} onValueChange={setSelectedSector}>
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
              {sectors.map((sector) => (
                <TabsTrigger key={sector} value={sector} className="text-xs">
                  {sector === "all" ? "All" : sector}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Opportunities List */}
        <div className="p-4 space-y-4">
          {filteredOpportunities.map((opportunity) => (
            <Card key={opportunity.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">{opportunity.sector}</Badge>
                      <Badge 
                        variant={opportunity.stage === 'Seed' ? 'default' : 'secondary'}
                      >
                        {opportunity.stage}
                      </Badge>
                    </div>
                  </div>
                  <Badge 
                    variant={
                      opportunity.riskLevel === 'Low' ? 'secondary' : 
                      opportunity.riskLevel === 'Medium' ? 'default' : 'destructive'
                    }
                  >
                    {opportunity.riskLevel} Risk
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{opportunity.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{opportunity.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{opportunity.equity} equity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">ROI: {opportunity.expectedROI}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">Goal: {opportunity.fundingGoal}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Raised: {opportunity.raised}</span>
                    <span>{opportunity.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${opportunity.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    onClick={() => handleViewDetails(opportunity.id)}
                    className="flex-1"
                  >
                    View Details
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Add to Watchlist
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOpportunities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No opportunities found matching your criteria.</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setSelectedSector("all");
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default InvestmentOpportunities;
