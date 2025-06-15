
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface SignUpFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRole: 'investor' | 'entrepreneur';
  onSignUp: (role: 'investor' | 'entrepreneur') => void;
}

const industryCategories = [
  "Agriculture & Agribusiness", "Financial Services & FinTech", "Healthcare & MedTech",
  "Education & EdTech", "Renewable Energy & CleanTech", "Manufacturing & Processing",
  "Retail & E-commerce", "Transportation & Logistics", "Tourism & Hospitality",
  "Creative Industries & Media"
];

const SignUpForm = ({ isOpen, onClose, selectedRole, onSignUp }: SignUpFormProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    organizationType: "Individual",
    investmentMotivation: "ROI-focused",
    industryPreferences: [] as string[],
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    if (!formData.agreeToTerms) {
      alert("Please agree to terms and privacy policy");
      return;
    }
    
    setIsLoading(true);

    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.fullName,
          user_type: selectedRole,
          ...(selectedRole === 'investor' && {
            organization_type: formData.organizationType,
            investment_motivation: formData.investmentMotivation,
            industry_preferences: formData.industryPreferences,
          }),
        },
        emailRedirectTo: `${window.location.origin}/login`,
      },
    });

    setIsLoading(false);

    if (error) {
      alert(`Sign up failed: ${error.message}`);
    } else {
      alert("Account Created! Please check your email for a confirmation link.");
      onSignUp(selectedRole);
    }
  };

  const renderRoleSpecificFields = () => {
    if (selectedRole === 'investor') {
      return (
        <div className="space-y-6 p-4 bg-blue-50 rounded-lg border">
          <div>
            <Label>Your Organization Type</Label>
            <Select value={formData.organizationType} onValueChange={(value) => setFormData({...formData, organizationType: value})}>
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
            <Select value={formData.investmentMotivation} onValueChange={(value) => setFormData({...formData, investmentMotivation: value})}>
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
            <div className="grid grid-cols-2 gap-2 mt-2">
              {industryCategories.map(industry => (
                <div key={industry} className="flex items-center space-x-2">
                  <Checkbox
                    id={industry}
                    checked={formData.industryPreferences.includes(industry)}
                    onCheckedChange={(checked) => {
                      const currentPrefs = formData.industryPreferences;
                      if (checked) {
                        if (currentPrefs.length < 3) {
                          setFormData({...formData, industryPreferences: [...currentPrefs, industry]});
                        }
                      } else {
                        setFormData({...formData, industryPreferences: currentPrefs.filter(item => item !== industry)});
                      }
                    }}
                  />
                  <Label htmlFor={industry} className="text-sm font-normal">{industry}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    } else if (selectedRole === 'entrepreneur') {
      return (
        <div className="space-y-4 p-4 bg-blue-50 rounded-lg border">
          <p className="text-sm text-gray-600">
            You'll be able to add your business details from your profile after signing up.
          </p>
        </div>
      );
    }
    return null;
  };

  const safeSelectedRole = selectedRole || 'investor';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center">
          <div className="w-20 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-lg">MANSA</span>
          </div>
          <DialogTitle className="text-2xl font-bold">Create Your MANSA Account</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName" className="text-sm font-medium">Full Name*</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-sm font-medium">Email Address*</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="password" className="text-sm font-medium">Password*</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Min. 8 characters</p>
            </div>
            <div>
              <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password*</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="role" className="text-sm font-medium">I am registering as an...*</Label>
            <Select value={safeSelectedRole} disabled>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="entrepreneur">Entrepreneur</SelectItem>
                <SelectItem value="investor">Investor / Supporter</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {renderRoleSpecificFields()}

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="agreeToTerms" 
              checked={formData.agreeToTerms}
              onCheckedChange={(checked) => setFormData({...formData, agreeToTerms: checked as boolean})}
            />
            <Label htmlFor="agreeToTerms" className="text-sm">
              I agree to MANSA's <span className="text-amber-600 underline">Terms</span> and <span className="text-amber-600 underline">Privacy Policy</span>.
            </Label>
          </div>

          <Button 
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white py-3"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>

          <div className="text-center">
            <span className="text-sm text-gray-600">
              Already have an account? <button type="button" className="text-amber-600 underline">Sign in</button>
            </span>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SignUpForm;
