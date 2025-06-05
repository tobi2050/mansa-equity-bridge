
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  Users, 
  DollarSign, 
  Clock, 
  TrendingUp,
  MessageCircle,
  Plus,
  CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import MobileLayout from "@/components/MobileLayout";

const BiddingProcess = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  
  const [selectedBids, setSelectedBids] = useState<number[]>([]);

  const bids = [
    {
      id: 1,
      investor: "Sarah Johnson",
      avatar: "SJ",
      amount: 75000,
      equity: 12,
      type: "Equity Investment",
      timeline: "30 days",
      status: "active",
      submitted: "2 hours ago",
      rating: 4.8,
      previousDeals: 15
    },
    {
      id: 2,
      investor: "Michael Chen",
      avatar: "MC",
      amount: 50000,
      equity: 15,
      type: "Convertible Note",
      timeline: "45 days",
      status: "active",
      submitted: "4 hours ago",
      rating: 4.6,
      previousDeals: 8
    },
    {
      id: 3,
      investor: "Investment Group Ltd",
      avatar: "IG",
      amount: 100000,
      equity: 10,
      type: "Equity Investment",
      timeline: "60 days",
      status: "pending",
      submitted: "1 day ago",
      rating: 4.9,
      previousDeals: 25
    }
  ];

  const handleSelectBid = (bidId: number) => {
    setSelectedBids(prev => 
      prev.includes(bidId) 
        ? prev.filter(id => id !== bidId)
        : [...prev, bidId]
    );
  };

  const handleCreateConsortium = () => {
    if (selectedBids.length === 0) {
      toast({
        title: "No Bids Selected",
        description: "Please select at least one bid to create a consortium.",
        variant: "destructive"
      });
      return;
    }
    navigate(`/consortium-creation/${id}?bids=${selectedBids.join(',')}`);
  };

  const handleAcceptBid = (bidId: number) => {
    toast({
      title: "Bid Accepted",
      description: "Investment proposal has been accepted. Moving to contract phase.",
    });
    navigate(`/investment-contract/${bidId}`);
  };

  return (
    <MobileLayout userRole="entrepreneur">
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Header */}
        <div className="bg-white border-b px-4 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => navigate(`/investment-details/${id}`)}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-lg font-semibold">Investment Bids</h1>
                <p className="text-xs text-gray-600">{bids.length} active proposals</p>
              </div>
            </div>
            <Badge variant="outline" className="text-green-600">
              <Clock className="w-3 h-3 mr-1" />
              5 days left
            </Badge>
          </div>
        </div>

        {/* Bidding Summary */}
        <Card className="m-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Bidding Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-green-600">${bids.reduce((sum, bid) => sum + bid.amount, 0).toLocaleString()}</div>
                <div className="text-xs text-gray-600">Total Offered</div>
              </div>
              <div>
                <div className="text-lg font-bold text-blue-600">{bids.length}</div>
                <div className="text-xs text-gray-600">Active Bids</div>
              </div>
              <div>
                <div className="text-lg font-bold text-purple-600">{Math.min(...bids.map(b => b.equity))}%</div>
                <div className="text-xs text-gray-600">Best Equity</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="px-4 mb-4">
          <div className="flex gap-2">
            <Button 
              onClick={handleCreateConsortium}
              className="flex-1"
              disabled={selectedBids.length === 0}
            >
              <Users className="w-4 h-4 mr-2" />
              Create Consortium ({selectedBids.length})
            </Button>
            <Button variant="outline" onClick={() => navigate(`/investment-form/${id}`)}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Bids List */}
        <div className="px-4 space-y-3">
          {bids.map((bid) => (
            <Card key={bid.id} className={`${selectedBids.includes(bid.id) ? 'ring-2 ring-blue-500' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-blue-600">{bid.avatar}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">{bid.investor}</h4>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <span>★ {bid.rating}</span>
                        <span>•</span>
                        <span>{bid.previousDeals} deals</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant={bid.status === 'active' ? 'default' : 'secondary'}>
                    {bid.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <span className="text-sm text-gray-600">Amount</span>
                    <div className="font-semibold text-green-600">${bid.amount.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Equity</span>
                    <div className="font-semibold">{bid.equity}%</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Type</span>
                    <div className="text-sm">{bid.type}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Timeline</span>
                    <div className="text-sm">{bid.timeline}</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleSelectBid(bid.id)}
                    className="flex-1"
                  >
                    {selectedBids.includes(bid.id) ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Selected
                      </>
                    ) : (
                      'Select for Consortium'
                    )}
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => handleAcceptBid(bid.id)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Accept
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>

                <div className="text-xs text-gray-500 mt-2">
                  Submitted {bid.submitted}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
};

export default BiddingProcess;
