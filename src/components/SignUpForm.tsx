import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { SignUpFormData } from "./auth/types";
import InvestorSignUpFields from "./auth/InvestorSignUpFields";
import EntrepreneurSignUpFields from "./auth/EntrepreneurSignUpFields";

interface SignUpFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRole: 'investor' | 'entrepreneur';
  onSignUp: (role: 'investor' | 'entrepreneur') => void;
}

const SignUpForm = ({ isOpen, onClose, selectedRole, onSignUp }: SignUpFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<SignUpFormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    organizationType: "Individual",
    investmentMotivation: "ROI-focused",
    industryPreferences: [],
    phoneNumber: "",
    defaultContributionMode: "investing",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.agreeToTerms) {
      toast({
        title: "Error",
        description: "You must agree to the terms and conditions.",
        variant: "destructive",
      });
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
            industry_preferences: formData.industryPreferences.map(p => p.value),
            default_contribution_mode: formData.defaultContributionMode,
          }),
          ...(selectedRole === 'entrepreneur' && {
            phone_number: formData.phoneNumber,
          }),
        },
        emailRedirectTo: `${window.location.origin}/login`,
      },
    });

    setIsLoading(false);

    if (error) {
      console.error("Error signing up:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({ title: "Account Created!", description: "Please check your email for a confirmation link." });
      onSignUp(selectedRole);
    }
  };

  const safeSelectedRole = selectedRole || 'investor';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-amber-600">
            Create Your {selectedRole === 'investor' ? 'Investor' : 'Entrepreneur'} Account
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="fullName" className="text-sm font-medium">Full Name*</Label>
            <Input
              id="fullName"
              placeholder="e.g. Adaora Okwu"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-sm font-medium">Email*</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="relative">
            <Label htmlFor="password">Password*</Label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-8 text-gray-500">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <div className="relative">
            <Label htmlFor="confirmPassword">Confirm Password*</Label>
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
            />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-8 text-gray-500">
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
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

          {selectedRole === 'investor' && <InvestorSignUpFields formData={formData} setFormData={setFormData} />}
          {selectedRole === 'entrepreneur' && <EntrepreneurSignUpFields formData={formData} setFormData={setFormData} />}

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
