
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff } from "lucide-react";

interface SignUpFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRole: 'investor' | 'entrepreneur' | 'philanthropist';
  onSignUp: (role: 'investor' | 'entrepreneur' | 'philanthropist') => void;
}

const SignUpForm = ({ isOpen, onClose, selectedRole, onSignUp }: SignUpFormProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    primaryInterest: "investing",
    alsoInterestedInPhilanthropy: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    if (!formData.agreeToTerms) {
      alert("Please agree to terms and privacy policy");
      return;
    }
    onSignUp(selectedRole);
  };

  const renderRoleSpecificFields = () => {
    if (selectedRole === 'investor') {
      return (
        <div className="space-y-4 p-4 bg-green-50 rounded-lg border">
          <Label className="text-sm font-medium">My primary interest is:</Label>
          <RadioGroup value={formData.primaryInterest} onValueChange={(value) => setFormData({...formData, primaryInterest: value})}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="investing" id="investing" />
              <Label htmlFor="investing" className="text-sm">Investing (seeking equity returns)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="philanthropy" id="philanthropy" />
              <Label htmlFor="philanthropy" className="text-sm">Philanthropy (donations only)</Label>
            </div>
          </RadioGroup>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="alsoPhilanthropy" 
              checked={formData.alsoInterestedInPhilanthropy}
              onCheckedChange={(checked) => setFormData({...formData, alsoInterestedInPhilanthropy: checked as boolean})}
            />
            <Label htmlFor="alsoPhilanthropy" className="text-sm">I am also interested in Philanthropy (can make donations)</Label>
          </div>
          
          <p className="text-xs text-gray-600">
            You'll start with Red Tier (Free). Verification and a minimum deposit may be required for full investment features.
          </p>
        </div>
      );
    } else if (selectedRole === 'entrepreneur') {
      return (
        <div className="space-y-4 p-4 bg-blue-50 rounded-lg border">
          <p className="text-sm text-gray-600">
            You'll be able to add your business details from your profile after signing up. Entrepreneurs get Green Tier (Free) access.
          </p>
        </div>
      );
    }
    return null;
  };

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
            <Select value={selectedRole || "investor"} disabled>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="entrepreneur">Entrepreneur</SelectItem>
                <SelectItem value="investor">Investor</SelectItem>
                <SelectItem value="philanthropist">Philanthropist</SelectItem>
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
          >
            Create Account
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
