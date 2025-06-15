import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Users, BookOpen, User, CheckCircle } from "lucide-react";
import SignUpForm from "./SignUpForm";
import { useAuth } from "@/contexts/AuthContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (role: 'investor' | 'entrepreneur') => void;
  defaultTab?: string;
  defaultRole?: 'investor' | 'entrepreneur';
}

const AuthModal = ({ isOpen, onClose, onLogin, defaultTab = "role-selection", defaultRole }: AuthModalProps) => {
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<'investor' | 'entrepreneur' | null>(defaultRole || null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [currentTab, setCurrentTab] = useState(defaultTab);

  // Update selected role when defaultRole changes
  useEffect(() => {
    if (defaultRole) {
      setSelectedRole(defaultRole);
    }
  }, [defaultRole]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole) {
      login(selectedRole);
      onLogin(selectedRole);
    }
  };

  const handleContinueToSignUp = () => {
    if (selectedRole) {
      setShowSignUpForm(true);
    }
  };

  const handleContinueToSignIn = () => {
    if (selectedRole) {
      setCurrentTab("auth");
    }
  };

  const handleDirectSignIn = () => {
    setCurrentTab("sign-in");
  };

  if (showSignUpForm && selectedRole) {
    return (
      <SignUpForm
        isOpen={isOpen}
        onClose={() => {
          setShowSignUpForm(false);
          onClose();
        }}
        selectedRole={selectedRole}
        onSignUp={(role) => {
          login(role); // This might be for a temporary session before email confirmation
          onLogin(role);
          setShowSignUpForm(false);
          onClose();
        }}
      />
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold text-center text-gray-900">
            {currentTab === "role-selection" ? "Choose Your Role" : 
             currentTab === "sign-in" ? "Sign In to MANSA" :
             "Welcome Back"}
          </DialogTitle>
        </DialogHeader>

        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/50">
            <TabsTrigger value="role-selection" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">Choose Your Role</TabsTrigger>
            <TabsTrigger value="sign-in" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">Sign In</TabsTrigger>
          </TabsList>

          <TabsContent value="role-selection" className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">How would you like to participate?</h3>
              <p className="text-gray-600">Select your primary role on the MANSA platform</p>
              {defaultRole && (
                <Badge className="mt-2 bg-amber-100 text-amber-800 border-amber-200">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Pre-selected based on your interest
                </Badge>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Card 
                className={`cursor-pointer transition-all hover:shadow-lg border-2 ${
                  selectedRole === 'investor' 
                    ? 'ring-2 ring-amber-500 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-500' 
                    : 'border-amber-200 hover:border-amber-300'
                } ${defaultRole === 'investor' ? 'shadow-lg' : ''}`}
                onClick={() => setSelectedRole('investor')}
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-3 relative">
                    <Users className="h-8 w-8 text-white" />
                    {selectedRole === 'investor' && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-amber-800">Investor / Supporter</CardTitle>
                  <CardDescription>
                    Invest in or donate to African businesses, from individuals to NGOs.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2 text-gray-700">
                    <li>• Equity investment or donations</li>
                    <li>• Form consortiums with other investors</li>
                    <li>• Individuals, NGOs, Charities welcome</li>
                    <li>• Track milestone progress & impact</li>
                  </ul>
                  <Badge className="mt-3 bg-green-100 text-green-800 border-green-200">
                    Open to All Nationalities
                  </Badge>
                </CardContent>
              </Card>

              <Card 
                className={`cursor-pointer transition-all hover:shadow-lg border-2 ${
                  selectedRole === 'entrepreneur' 
                    ? 'ring-2 ring-amber-500 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-500' 
                    : 'border-amber-200 hover:border-amber-300'
                } ${defaultRole === 'entrepreneur' ? 'shadow-lg' : ''}`}
                onClick={() => setSelectedRole('entrepreneur')}
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-3 relative">
                    <BookOpen className="h-8 w-8 text-white" />
                    {selectedRole === 'entrepreneur' && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-amber-800">Entrepreneur</CardTitle>
                  <CardDescription>
                    Showcase your business and secure funding from global supporters
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2 text-gray-700">
                    <li>• List business opportunities</li>
                    <li>• Receive competitive bids</li>
                    <li>• Milestone-based funding release</li>
                    <li>• Maintain business control</li>
                  </ul>
                  <Badge className="mt-3 bg-blue-100 text-blue-800 border-blue-200">
                    African Businesses Focus
                  </Badge>
                </CardContent>
              </Card>
            </div>

            {selectedRole && (
              <div className="text-center space-y-3">
                <div className="flex gap-3 justify-center">
                  <Button 
                    onClick={handleContinueToSignUp}
                    className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg"
                  >
                    Sign Up as {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={handleContinueToSignIn}
                    className="border-amber-500 text-amber-700 hover:bg-amber-50"
                  >
                    Sign In
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="sign-in" className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Sign In to Your Account</h3>
              <p className="text-gray-600">Choose your role and sign in</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
              <div className="bg-white/70 p-4 rounded-lg">
                <Label htmlFor="role" className="text-sm font-medium text-gray-700 mb-3 block">I am signing in as:</Label>
                <RadioGroup 
                  value={selectedRole || ''} 
                  onValueChange={(value) => setSelectedRole(value as 'investor' | 'entrepreneur')}
                  className="flex flex-row justify-center gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="investor" id="investor-signin" />
                    <Label htmlFor="investor-signin" className="text-sm">Investor / Supporter</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="entrepreneur" id="entrepreneur-signin" />
                    <Label htmlFor="entrepreneur-signin" className="text-sm">Entrepreneur</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  className="bg-white/70"
                />
              </div>
              
              <div>
                <Label htmlFor="password" className="text-gray-700">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="bg-white/70"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg"
                disabled={!selectedRole}
              >
                Sign In
              </Button>
            </form>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setCurrentTab("role-selection")}
                className="text-amber-600 hover:text-amber-700 text-sm font-medium"
              >
                Don't have an account? Sign up
              </button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
