
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, MapPin, Users, Calendar, CheckCircle, AlertCircle } from "lucide-react";

const BusinessProfile = () => {
  return (
    <div className="space-y-6">
      {/* Profile Completion Status */}
      <Card className="border-amber-200 bg-amber-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-800">
            <AlertCircle className="h-5 w-5" />
            Profile Completion Status
          </CardTitle>
          <CardDescription className="text-amber-700">
            Complete your profile to unlock funding opportunities (80% required)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Overall Progress</span>
                <span className="font-medium">75%</span>
              </div>
              <Progress value={75} className="h-3" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Basic Information (100%)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Business Details (90%)</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                <span>Financial Information (60%)</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <span>Verification Documents (40%)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Business Information
          </CardTitle>
          <CardDescription>
            Tell investors about your business and mission
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="business-name">Business Name</Label>
              <Input 
                id="business-name" 
                placeholder="Enter your business name"
                defaultValue="EcoFarm Nigeria"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="business-stage">Business Stage</Label>
              <Select defaultValue="scaling">
                <SelectTrigger>
                  <SelectValue placeholder="Select stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="idea">Idea</SelectItem>
                  <SelectItem value="prototype">Prototype</SelectItem>
                  <SelectItem value="mvp">MVP</SelectItem>
                  <SelectItem value="scaling">Scaling</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="business-description">Business Description</Label>
            <Textarea 
              id="business-description"
              placeholder="Describe your business, its mission, and what makes it unique..."
              className="min-h-[100px]"
              defaultValue="Sustainable farming initiative connecting rural farmers with urban markets through organic certification and digital marketplace."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select defaultValue="agriculture">
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="agriculture">Agriculture</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="energy">Energy</SelectItem>
                  <SelectItem value="fintech">FinTech</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                placeholder="City, Country"
                defaultValue="Lagos, Nigeria"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="employees">Number of Employees</Label>
              <Select defaultValue="1-10">
                <SelectTrigger>
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Just me</SelectItem>
                  <SelectItem value="1-10">1-10</SelectItem>
                  <SelectItem value="11-50">11-50</SelectItem>
                  <SelectItem value="51-200">51-200</SelectItem>
                  <SelectItem value="200+">200+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Information */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Information</CardTitle>
          <CardDescription>
            Share your business financials to build investor confidence
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="monthly-revenue">Monthly Revenue (USD)</Label>
              <Input 
                id="monthly-revenue" 
                type="number"
                placeholder="0"
                defaultValue="5000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="monthly-expenses">Monthly Expenses (USD)</Label>
              <Input 
                id="monthly-expenses" 
                type="number"
                placeholder="0"
                defaultValue="3500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="funding-goal">Total Funding Goal (USD)</Label>
              <Input 
                id="funding-goal" 
                type="number"
                placeholder="0"
                defaultValue="75000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="use-of-funds">Primary Use of Funds</Label>
              <Select defaultValue="expansion">
                <SelectTrigger>
                  <SelectValue placeholder="Select use" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="equipment">Equipment Purchase</SelectItem>
                  <SelectItem value="inventory">Inventory</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="expansion">Business Expansion</SelectItem>
                  <SelectItem value="hiring">Team Hiring</SelectItem>
                  <SelectItem value="development">Product Development</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents & Verification */}
      <Card>
        <CardHeader>
          <CardTitle>Documents & Verification</CardTitle>
          <CardDescription>
            Upload required documents for investor verification
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Business Registration</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-400">PDF, JPG, PNG up to 10MB</p>
              </div>
              <Badge variant="outline" className="text-amber-600 border-amber-200">
                Pending Upload
              </Badge>
            </div>
            
            <div className="space-y-2">
              <Label>Government ID/Passport</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-400">PDF, JPG, PNG up to 10MB</p>
              </div>
              <Badge variant="outline" className="text-green-600 border-green-200">
                <CheckCircle className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Financial Statements</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-400">PDF up to 10MB</p>
              </div>
              <Badge variant="outline" className="text-amber-600 border-amber-200">
                Pending Upload
              </Badge>
            </div>
            
            <div className="space-y-2">
              <Label>Business Plan</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-400">PDF up to 10MB</p>
              </div>
              <Badge variant="outline" className="text-blue-600 border-blue-200">
                Under Review
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white">
          Save Changes
        </Button>
        <Button variant="outline" className="flex-1">
          Preview Public Profile
        </Button>
      </div>
    </div>
  );
};

export default BusinessProfile;
