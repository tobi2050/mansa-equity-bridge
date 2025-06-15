
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Building2, 
  MapPin,
  ArrowLeft,
  Home
} from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const InvestmentOpportunities = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState("all");

  const { data: opportunities, isLoading } = useQuery({
    queryKey: ['businesses', searchTerm, selectedSector],
    queryFn: async () => {
      let query = supabase.from('businesses').select('*');

      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
      }

      if (selectedSector !== 'all') {
        query = query.eq('industry', selectedSector);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        toast.error("Failed to fetch opportunities.", { description: error.message });
        throw error;
      }
      return data;
    }
  });

  const sectors = ["all", "Agriculture", "Education", "Healthcare", "Technology", "Finance"];

  const handleViewDetails = (businessId: string) => {
    navigate(`/business/${businessId}`);
  };

  const renderSkeletons = () => (
    Array.from({ length: 3 }).map((_, index) => (
      <Card key={index} className="p-4">
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <Skeleton className="h-6 w-3/5" />
            <Skeleton className="h-5 w-1/4" />
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <div className="flex justify-between items-center pt-2">
            <Skeleton className="h-10 w-[48%]" />
            <Skeleton className="h-10 w-[48%]" />
          </div>
        </div>
      </Card>
    ))
  );

  return (
    <MobileLayout userRole="investor">
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Header */}
        <div className="bg-white border-b px-4 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-lg font-semibold">Investment Opportunities</h1>
                <p className="text-xs text-gray-600">Discover and invest in African businesses</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <Home className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="p-4 bg-white border-b">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Tabs value={selectedSector} onValueChange={setSelectedSector}>
            <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6">
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
          {isLoading ? renderSkeletons() : (
            opportunities && opportunities.map((opportunity) => {
              const progress = (opportunity.funding_goal && opportunity.funding_goal > 0)
                ? Math.round(((opportunity.current_funding || 0) / opportunity.funding_goal) * 100)
                : 0;

              return (
              <Card key={opportunity.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{opportunity.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{opportunity.industry}</Badge>
                        <Badge variant={opportunity.stage === 'Seed' ? 'default' : 'secondary'}>
                          {opportunity.stage}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{opportunity.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{opportunity.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">Goal: ${opportunity.funding_goal?.toLocaleString() || 'N/A'}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Raised: ${opportunity.current_funding?.toLocaleString() || '0'}</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${progress}%` }}
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
            )})
          )}
        </div>

        {(!isLoading && opportunities?.length === 0) && (
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
