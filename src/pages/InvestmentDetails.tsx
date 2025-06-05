
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  MapPin, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Calendar,
  FileText,
  MessageCircle,
  Heart,
  Share2,
  Building2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import MobileLayout from "@/components/MobileLayout";

const InvestmentDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [isWatchlisted, setIsWatchlisted] = useState(false);

  // Mock data - would normally fetch based on id
  const opportunity = {
    id: 1,
    title: "AgriTech Solutions",
    sector: "Agriculture",
    location: "Lagos, Nigeria",
    fundingGoal: "$250,000",
    raised: "$75,000",
    progress: 30,
    equity: "15%",
    stage: "Series A",
    description: "Revolutionary farming technology platform connecting smallholder farmers with modern agricultural solutions and market access.",
    riskLevel: "Medium",
    expectedROI: "18-25%",
    founderName: "Adaora Okwu",
    founderTitle: "CEO & Founder",
    companyAge: "2 years",
    employees: "12-15",
    businessModel: "B2B SaaS with marketplace features",
    revenue: "$45,000 MRR",
    investors: 8,
    minimumInvestment: "$5,000",
    deadline: "45 days remaining"
  };

  const milestones = [
    { title: "Product Development", status: "completed", description: "MVP launched and tested" },
    { title: "Market Validation", status: "completed", description: "500+ farmers onboarded" },
    { title: "Series A Funding", status: "current", description: "Raising $250K for expansion" },
    { title: "Market Expansion", status: "upcoming", description: "Launch in 3 new countries" },
    { title: "Series B Preparation", status: "upcoming", description: "Prepare for next funding round" }
  ];

  const handleInvest = () => {
    navigate(`/investment-form/${id}`);
  };

  const handleToggleWatchlist = () => {
    setIsWatchlisted(!isWatchlisted);
    toast({
      title: isWatchlisted ? "Removed from Watchlist" : "Added to Watchlist",
      description: isWatchlisted ? "Opportunity removed from your watchlist" : "You'll receive updates about this opportunity",
    });
  };

  const handleMessage = () => {
    navigate(`/messages?to=${opportunity.founderName}`);
  };

  return (
    <MobileLayout userRole="investor">
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Header */}
        <div className="bg-white border-b px-4 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => navigate('/investment-opportunities')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={handleToggleWatchlist}>
                <Heart className={`w-4 h-4 ${isWatchlisted ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold">{opportunity.title}</h1>
              <p className="opacity-90 mt-1">{opportunity.description}</p>
            </div>
            <Badge className="bg-white/20 text-white border-white/30">
              {opportunity.stage}
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{opportunity.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              <span>{opportunity.sector}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              <span>{opportunity.equity} equity</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span>ROI: {opportunity.expectedROI}</span>
            </div>
          </div>
        </div>

        {/* Funding Progress */}
        <Card className="m-4">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Funding Progress</span>
              <span className="text-sm text-gray-600">{opportunity.deadline}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>Raised: {opportunity.raised}</span>
              <span>Goal: {opportunity.fundingGoal}</span>
            </div>
            <Progress value={opportunity.progress} className="mb-2" />
            <div className="flex justify-between text-xs text-gray-600">
              <span>{opportunity.progress}% funded</span>
              <span>{opportunity.investors} investors</span>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="px-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="financials">Financials</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Business Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Business Model</h4>
                  <p className="text-sm text-gray-600">{opportunity.businessModel}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-semibold">Company Age</span>
                    <p className="text-sm text-gray-600">{opportunity.companyAge}</p>
                  </div>
                  <div>
                    <span className="font-semibold">Team Size</span>
                    <p className="text-sm text-gray-600">{opportunity.employees}</p>
                  </div>
                </div>
                <div>
                  <span className="font-semibold">Minimum Investment</span>
                  <p className="text-sm text-gray-600">{opportunity.minimumInvestment}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financials" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Financial Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <span className="font-semibold">Monthly Recurring Revenue</span>
                    <p className="text-sm text-gray-600">{opportunity.revenue}</p>
                  </div>
                  <div>
                    <span className="font-semibold">Expected ROI</span>
                    <p className="text-sm text-gray-600">{opportunity.expectedROI}</p>
                  </div>
                  <div>
                    <span className="font-semibold">Risk Level</span>
                    <Badge variant={opportunity.riskLevel === 'Medium' ? 'default' : 'secondary'}>
                      {opportunity.riskLevel}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Founding Team</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-green-600">AO</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{opportunity.founderName}</h4>
                    <p className="text-sm text-gray-600">{opportunity.founderTitle}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="milestones" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Development Milestones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className={`w-4 h-4 rounded-full mt-1 ${
                        milestone.status === 'completed' ? 'bg-green-500' :
                        milestone.status === 'current' ? 'bg-blue-500' : 'bg-gray-300'
                      }`} />
                      <div>
                        <h4 className="font-semibold">{milestone.title}</h4>
                        <p className="text-sm text-gray-600">{milestone.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="fixed bottom-20 left-0 right-0 p-4 bg-white border-t">
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleMessage} className="flex-1">
              <MessageCircle className="w-4 h-4 mr-2" />
              Message
            </Button>
            <Button onClick={handleInvest} className="flex-2 bg-green-600 hover:bg-green-700">
              <DollarSign className="w-4 h-4 mr-2" />
              Invest Now
            </Button>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default InvestmentDetails;
