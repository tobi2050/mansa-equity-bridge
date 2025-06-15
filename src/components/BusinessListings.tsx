import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Users, Calendar, MessageSquare, Eye } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ValidationButton } from "./business/ValidationButton";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate } from "react-router-dom";

const BusinessListings = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  const { data: businesses, isLoading: isLoadingBusinesses } = useQuery({
    queryKey: ['businesses'],
    queryFn: async () => {
      const { data, error } = await supabase.from('businesses').select('*');
      if (error) throw error;
      // map to existing structure for less refactoring
      return data.map(b => ({
        id: b.id, // now a uuid string
        title: b.name,
        description: b.description || 'No description available.',
        stage: "Scaling",
        fundingGoal: 75000,
        currentFunding: 45000,
        category: "Agriculture",
        equityOffered: 15,
        bidders: 8,
        timeLeft: "12 days",
        milestones: 5,
        completedMilestones: 3,
        status: "Active"
      }));
    }
  });

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newBusiness, setNewBusiness] = useState({
    title: "",
    description: "",
    category: "",
    stage: "",
    fundingGoal: "",
    equityOffered: "",
    fundingType: "investment"
  });

  const createBusinessMutation = useMutation({
    mutationFn: async (businessData: { title: string, description: string }) => {
      const { error } = await supabase.from('businesses').insert({
        name: businessData.title,
        description: businessData.description,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['businesses'] });
      setShowCreateForm(false);
      setNewBusiness({
        title: "",
        description: "",
        category: "",
        stage: "",
        fundingGoal: "",
        equityOffered: "",
        fundingType: "investment"
      });
      toast({ title: "Success", description: "Business listing created." });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

  const handleCreateBusiness = () => {
    if (!newBusiness.title || !newBusiness.description) {
      toast({ title: "Missing fields", description: "Please fill out title and description.", variant: "destructive"});
      return;
    }
    createBusinessMutation.mutate(newBusiness);
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Idea': return 'bg-gray-100 text-gray-800';
      case 'Prototype': return 'bg-blue-100 text-blue-800';
      case 'MVP': return 'bg-yellow-100 text-yellow-800';
      case 'Scaling': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">My Business Listings</h2>
          <p className="text-gray-600">Manage your funding opportunities and track investor interest</p>
        </div>
        <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create New Listing
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Business Listing</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Business Title</Label>
                <Input
                  id="title"
                  value={newBusiness.title}
                  onChange={(e) => setNewBusiness({...newBusiness, title: e.target.value})}
                  placeholder="Enter your business title"
                />
              </div>
              
              <div>
                <Label htmlFor="description">Business Description</Label>
                <Textarea
                  id="description"
                  value={newBusiness.description}
                  onChange={(e) => setNewBusiness({...newBusiness, description: e.target.value})}
                  placeholder="Describe your business, its mission, and value proposition"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={newBusiness.category} onValueChange={(value) => setNewBusiness({...newBusiness, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="agriculture">Agriculture</SelectItem>
                      <SelectItem value="energy">Energy</SelectItem>
                      <SelectItem value="fintech">FinTech</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="stage">Business Stage</Label>
                  <Select value={newBusiness.stage} onValueChange={(value) => setNewBusiness({...newBusiness, stage: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Idea">Idea</SelectItem>
                      <SelectItem value="Prototype">Prototype</SelectItem>
                      <SelectItem value="MVP">MVP</SelectItem>
                      <SelectItem value="Scaling">Scaling</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fundingGoal">Funding Goal ($)</Label>
                  <Input
                    id="fundingGoal"
                    type="number"
                    value={newBusiness.fundingGoal}
                    onChange={(e) => setNewBusiness({...newBusiness, fundingGoal: e.target.value})}
                    placeholder="50000"
                  />
                </div>

                <div>
                  <Label htmlFor="equityOffered">Equity Offered (%)</Label>
                  <Input
                    id="equityOffered"
                    type="number"
                    value={newBusiness.equityOffered}
                    onChange={(e) => setNewBusiness({...newBusiness, equityOffered: e.target.value})}
                    placeholder="15"
                    max="100"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="fundingType">Funding Type</Label>
                <Select value={newBusiness.fundingType} onValueChange={(value) => setNewBusiness({...newBusiness, fundingType: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="investment">Investment Only (Equity-based)</SelectItem>
                    <SelectItem value="philanthropy">Philanthropy Only (Donations)</SelectItem>
                    <SelectItem value="both">Both Investment & Philanthropy</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={handleCreateBusiness}
                disabled={createBusinessMutation.isPending}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
              >
                {createBusinessMutation.isPending ? "Creating..." : "Create Business Listing"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {isLoadingBusinesses ? (
          [1,2].map(i => <Skeleton key={i} className="h-80 w-full" />)
        ) : businesses?.map((business) => (
          <Card key={business.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="text-lg">
                    <Link to={`/business/${business.id}`} className="hover:underline">{business.title}</Link>
                  </CardTitle>
                  <CardDescription className="text-base mt-2">
                    {business.description}
                  </CardDescription>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge className={getStageColor(business.stage)}>
                    {business.stage}
                  </Badge>
                  <Badge variant="outline">
                    {business.category}
                  </Badge>
                  <Badge className="bg-green-100 text-green-800">
                    {business.status}
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
                      ${business.currentFunding.toLocaleString()} / ${business.fundingGoal.toLocaleString()}
                    </span>
                  </div>
                  <Progress 
                    value={(business.currentFunding / business.fundingGoal) * 100} 
                    className="h-2"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Milestones</span>
                    <span className="font-medium">
                      {business.completedMilestones} / {business.milestones}
                    </span>
                  </div>
                  <Progress 
                    value={(business.completedMilestones / business.milestones) * 100} 
                    className="h-2"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Equity Offered:</span>
                  <p className="font-medium">{business.equityOffered}%</p>
                </div>
                <div>
                  <span className="text-gray-600">Active Bidders:</span>
                  <p className="font-medium">{business.bidders}</p>
                </div>
                <div>
                  <span className="text-gray-600">Time Remaining:</span>
                  <p className="font-medium">{business.timeLeft}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{business.bidders} interested investors</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{business.timeLeft} left</span>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <ValidationButton businessId={business.id} />
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    View Bids
                  </Button>
                  <Button 
                    size="sm"
                    className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
                  >
                    Edit Listing
                  </Button>
                  <Button variant="secondary" size="sm" onClick={() => navigate(`/business/${business.id}`)}>
                    <Eye className="h-4 w-4 mr-1" />
                    View Profile
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

export default BusinessListings;
