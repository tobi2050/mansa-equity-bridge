
import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Users, 
  DollarSign, 
  FileText,
  UserPlus,
  Trash2,
  Calculator
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import MobileLayout from "@/components/MobileLayout";

const ConsortiumCreation = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  const [consortiumData, setConsortiumData] = useState({
    name: "",
    description: "",
    terms: "",
    votingStructure: "equal",
    minimumCommitment: ""
  });
  
  const [isCreating, setIsCreating] = useState(false);

  // Mock selected investors based on URL params
  const selectedBidIds = searchParams.get('bids')?.split(',').map(Number) || [];
  
  const [consortiumMembers, setConsortiumMembers] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "SJ",
      amount: 75000,
      equity: 12,
      role: "Lead Investor",
      votingPower: 40
    },
    {
      id: 2,
      name: "Michael Chen", 
      avatar: "MC",
      amount: 50000,
      equity: 15,
      role: "Co-Investor",
      votingPower: 30
    },
    {
      id: 3,
      name: "Investment Group Ltd",
      avatar: "IG", 
      amount: 100000,
      equity: 10,
      role: "Co-Investor",
      votingPower: 30
    }
  ]);

  const totalInvestment = consortiumMembers.reduce((sum, member) => sum + member.amount, 0);
  const averageEquity = consortiumMembers.reduce((sum, member) => sum + member.equity, 0) / consortiumMembers.length;

  const handleCreateConsortium = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    
    // Simulate consortium creation
    setTimeout(() => {
      setIsCreating(false);
      toast({
        title: "Consortium Created Successfully",
        description: "Investment consortium has been formed. Members will be notified.",
      });
      navigate(`/consortium-management/${id}`);
    }, 2000);
  };

  const handleRemoveMember = (memberId: number) => {
    setConsortiumMembers(prev => prev.filter(member => member.id !== memberId));
    toast({
      title: "Member Removed",
      description: "Investor has been removed from the consortium.",
    });
  };

  const handleUpdateVoting = (memberId: number, newVotingPower: number) => {
    setConsortiumMembers(prev => 
      prev.map(member => 
        member.id === memberId 
          ? { ...member, votingPower: newVotingPower }
          : member
      )
    );
  };

  return (
    <MobileLayout userRole="entrepreneur">
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Header */}
        <div className="bg-white border-b px-4 py-4 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate(`/bidding-process/${id}`)}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold">Create Investment Consortium</h1>
              <p className="text-xs text-gray-600">Form a group investment structure</p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Consortium Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-blue-600" />
                Consortium Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold text-green-600">${totalInvestment.toLocaleString()}</div>
                  <div className="text-xs text-gray-600">Total Investment</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-blue-600">{consortiumMembers.length}</div>
                  <div className="text-xs text-gray-600">Members</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-purple-600">{averageEquity.toFixed(1)}%</div>
                  <div className="text-xs text-gray-600">Avg. Equity</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Consortium Details Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-green-600" />
                Consortium Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateConsortium} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Consortium Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter consortium name"
                    value={consortiumData.name}
                    onChange={(e) => setConsortiumData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the consortium's purpose and goals..."
                    value={consortiumData.description}
                    onChange={(e) => setConsortiumData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="terms">Investment Terms</Label>
                  <Textarea
                    id="terms"
                    placeholder="Define consortium terms, profit sharing, decision making..."
                    value={consortiumData.terms}
                    onChange={(e) => setConsortiumData(prev => ({ ...prev, terms: e.target.value }))}
                    rows={4}
                  />
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Members List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  Consortium Members
                </div>
                <Button variant="outline" size="sm">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Member
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {consortiumMembers.map((member) => (
                <div key={member.id} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-semibold text-blue-600">{member.avatar}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">{member.name}</h4>
                        <Badge variant="outline" className="text-xs">{member.role}</Badge>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleRemoveMember(member.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div>
                      <span className="text-gray-600">Investment</span>
                      <div className="font-semibold">${member.amount.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Equity</span>
                      <div className="font-semibold">{member.equity}%</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Voting Power</span>
                      <Input
                        type="number"
                        value={member.votingPower}
                        onChange={(e) => handleUpdateVoting(member.id, Number(e.target.value))}
                        className="text-xs h-6"
                        max="100"
                        min="0"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => navigate(`/bidding-process/${id}`)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleCreateConsortium}
              disabled={isCreating || !consortiumData.name}
              className="flex-2 bg-blue-600 hover:bg-blue-700"
            >
              {isCreating ? "Creating..." : "Create Consortium"}
            </Button>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default ConsortiumCreation;
