
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Calendar, Users, MessageCircle, DollarSign, TrendingUp } from "lucide-react";

interface BidDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  opportunity: any;
}

const BidDetails = ({ isOpen, onClose, opportunity }: BidDetailsProps) => {
  const [bidAmount, setBidAmount] = useState("");
  const [equityOffered, setEquityOffered] = useState("");
  const [message, setMessage] = useState("");

  const mockBidders = [
    { name: "John Smith", amount: "$15,000", equity: "8%", time: "2 hours ago" },
    { name: "Sarah Johnson", amount: "$12,000", equity: "7%", time: "4 hours ago" },
    { name: "Michael Brown", amount: "$18,000", equity: "9%", time: "1 day ago" },
  ];

  const handleSubmitBid = () => {
    console.log("Bid submitted:", { bidAmount, equityOffered, message });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{opportunity?.title || "EcoFarm Nigeria"}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="bidders">Bidders ({mockBidders.length})</TabsTrigger>
            <TabsTrigger value="bid">Place Bid</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-16 h-16 text-green-600" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium">Funding Goal</span>
                    </div>
                    <p className="text-2xl font-bold text-green-600">$50,000</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium">Deadline</span>
                    </div>
                    <p className="text-lg font-semibold">15 days left</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">About this Business</h3>
                  <p className="text-gray-600 leading-relaxed">
                    EcoFarm Nigeria is pioneering sustainable agriculture practices across West Africa. 
                    We're developing innovative farming solutions that increase crop yield while 
                    reducing environmental impact. Our mission is to transform traditional farming 
                    through technology and sustainable practices.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Industry</h4>
                  <Badge variant="outline">Agriculture</Badge>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Location</h4>
                  <p className="text-gray-600">Lagos, Nigeria</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Progress</h4>
                  <Progress value={65} className="h-2" />
                  <p className="text-sm text-gray-600 mt-1">Milestone 3 of 5 completed</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Entrepreneur</h3>
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarFallback>AO</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Adaora Okwu</p>
                  <p className="text-sm text-gray-600">Founder & CEO</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">Verified</Badge>
                    <span className="text-xs text-gray-500">3 successful projects</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="bidders" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Current Bidders</h3>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">12 comments</span>
              </div>
            </div>
            
            {mockBidders.map((bidder, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback>{bidder.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{bidder.name}</p>
                      <p className="text-sm text-gray-600">{bidder.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">{bidder.amount}</p>
                    <p className="text-sm text-gray-600">for {bidder.equity} equity</p>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="bid" className="space-y-6">
            <div className="p-6 bg-amber-50 rounded-lg border border-amber-200">
              <h3 className="text-lg font-semibold mb-4">Place Your Bid</h3>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="bidAmount">Investment Amount ($)</Label>
                  <Input
                    id="bidAmount"
                    type="number"
                    placeholder="e.g., 15000"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="equityOffered">Equity Percentage (%)</Label>
                  <Input
                    id="equityOffered"
                    type="number"
                    placeholder="e.g., 8"
                    value={equityOffered}
                    onChange={(e) => setEquityOffered(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-4">
                <Label htmlFor="message">Message to Entrepreneur (Optional)</Label>
                <Textarea
                  id="message"
                  placeholder="Share why you're interested in this opportunity..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="flex gap-3">
                <Button onClick={handleSubmitBid} className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700">
                  Submit Bid
                </Button>
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default BidDetails;
