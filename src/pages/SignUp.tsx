import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { MultiSelect } from "@/components/ui/multi-select";
import { industryCategories } from "@/lib/constants";

const SignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    userType: "investor" | "entrepreneur" | "";
    phoneNumber: string;
    organizationType: string;
    investmentMotivation: string;
    industryPreferences: { value: string; label: string }[];
    defaultContributionMode: string;
  }>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "",
    phoneNumber: "",
    organizationType: "Individual",
    investmentMotivation: "ROI-focused",
    industryPreferences: [],
    defaultContributionMode: "investing",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    if (!formData.userType) {
      toast({
        title: "Error",
        description: "Please select your user type",
        variant: "destructive"
      });
      return;
    }

    if (formData.userType === 'entrepreneur' && !formData.phoneNumber) {
      toast({
        title: "Error",
        description: "Please enter your phone number",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: `${formData.firstName} ${formData.lastName}`,
          user_type: formData.userType,
          ...(formData.userType === 'entrepreneur' && {
            phone_number: formData.phoneNumber
          }),
          ...(formData.userType === 'investor' && {
            organization_type: formData.organizationType,
            investment_motivation: formData.investmentMotivation,
            industry_preferences: formData.industryPreferences.map(p => p.value),
            default_contribution_mode: formData.defaultContributionMode,
          }),
        },
        emailRedirectTo: `${window.location.origin}/login`,
      }
    });

    setIsLoading(false);

    if (error) {
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Account Created Successfully",
        description: "Please check your email for a confirmation link to complete your registration.",
      });
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-amber-600">Join MANSA</CardTitle>
          <CardDescription>Create your account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>I am a:</Label>
              <RadioGroup 
                value={formData.userType} 
                onValueChange={(value) => handleInputChange("userType", value)}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="entrepreneur" id="entrepreneur" />
                  <Label htmlFor="entrepreneur">Entrepreneur</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="investor" id="investor" />
                  <Label htmlFor="investor">Investor / Supporter</Label>
                </div>
              </RadioGroup>
            </div>

            {formData.userType === 'entrepreneur' && (
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Your phone number"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  required
                />
              </div>
            )}
            
            {formData.userType === 'investor' && (
              <div className="space-y-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="text-lg font-medium text-gray-800">Investor Details</h3>
                <div>
                  <Label>Your Organization Type</Label>
                  <Select value={formData.organizationType} onValueChange={(value) => handleInputChange("organizationType", value)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Individual">Individual</SelectItem>
                      <SelectItem value="NGO">NGO</SelectItem>
                      <SelectItem value="Charity">Charity</SelectItem>
                      <SelectItem value="Investment Firm">Investment Firm</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Your Primary Motivation</Label>
                  <Select value={formData.investmentMotivation} onValueChange={(value) => handleInputChange("investmentMotivation", value)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ROI-focused">ROI-focused</SelectItem>
                      <SelectItem value="Impact-focused">Impact-focused</SelectItem>
                      <SelectItem value="Mixed">Mixed (ROI & Impact)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Industries of Interest (up to 3)</Label>
                  <MultiSelect
                    options={industryCategories}
                    selected={formData.industryPreferences}
                    onChange={(value) => handleInputChange("industryPreferences", value)}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">Select your preferred investment sectors.</p>
                </div>
                <div>
                  <Label>Default Contribution Mode</Label>
                  <Select value={formData.defaultContributionMode} onValueChange={(value) => handleInputChange("defaultContributionMode", value)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="investing">Investing</SelectItem>
                      <SelectItem value="donating">Donating</SelectItem>
                      <SelectItem value="supporting">Supporting</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500 mt-1">This will be your default action on projects.</p>
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-amber-600 hover:bg-amber-700"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
            
            <div className="text-center">
              <span className="text-sm text-gray-600">Already have an account? </span>
              <Button variant="link" onClick={() => navigate("/login")} className="p-0">
                Sign in
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
