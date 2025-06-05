
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, DollarSign, FileText, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import MobileLayout from "@/components/MobileLayout";

const InvestmentForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    investmentAmount: "",
    equityOffered: "",
    investmentType: "",
    terms: "",
    timeline: "",
    additionalNotes: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Investment Proposal Submitted",
        description: "Your investment proposal has been submitted for review.",
      });
      navigate(`/bidding-process/${id}`);
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <MobileLayout userRole="investor">
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Header */}
        <div className="bg-white border-b px-4 py-4 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate(`/investment-details/${id}`)}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold">Investment Proposal</h1>
              <p className="text-xs text-gray-600">Submit your investment offer</p>
            </div>
          </div>
        </div>

        <div className="p-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                Investment Details
              </CardTitle>
              <CardDescription>
                Provide details about your investment proposal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Investment Amount ($)</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="50,000"
                      value={formData.investmentAmount}
                      onChange={(e) => handleInputChange("investmentAmount", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="equity">Equity Seeking (%)</Label>
                    <Input
                      id="equity"
                      type="number"
                      placeholder="15"
                      value={formData.equityOffered}
                      onChange={(e) => handleInputChange("equityOffered", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Investment Type</Label>
                  <Select value={formData.investmentType} onValueChange={(value) => handleInputChange("investmentType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select investment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="equity">Equity Investment</SelectItem>
                      <SelectItem value="debt">Debt Financing</SelectItem>
                      <SelectItem value="convertible">Convertible Note</SelectItem>
                      <SelectItem value="revenue">Revenue Share</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeline">Investment Timeline</Label>
                  <Select value={formData.timeline} onValueChange={(value) => handleInputChange("timeline", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate (1-30 days)</SelectItem>
                      <SelectItem value="short">Short term (1-3 months)</SelectItem>
                      <SelectItem value="medium">Medium term (3-6 months)</SelectItem>
                      <SelectItem value="long">Long term (6+ months)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="terms">Investment Terms & Conditions</Label>
                  <Textarea
                    id="terms"
                    placeholder="Describe your investment terms, conditions, and requirements..."
                    value={formData.terms}
                    onChange={(e) => handleInputChange("terms", e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any additional information or requirements..."
                    value={formData.additionalNotes}
                    onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="flex gap-3">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate(`/investment-details/${id}`)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="flex-2 bg-green-600 hover:bg-green-700"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Proposal"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </MobileLayout>
  );
};

export default InvestmentForm;
