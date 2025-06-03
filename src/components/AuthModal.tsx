import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Users, BookOpen, User } from "lucide-react";
import SignUpForm from "./SignUpForm";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (role: 'investor' | 'entrepreneur' | 'philanthropist') => void;
  defaultTab?: string;
  defaultRole?: 'investor' | 'entrepreneur' | 'philanthropist';
}

const AuthModal = ({ isOpen, onClose, onLogin, defaultTab = "role-selection", defaultRole }: AuthModalProps) => {
  const [selectedRole, setSelectedRole] = useState<'investor' | 'entrepreneur' | 'philanthropist' | null>(defaultRole || null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [currentTab, setCurrentTab] = useState(defaultTab);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole) {
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
      setIsSignUp(false);
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
        onSignUp={onLogin}
      />
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {currentTab === "role-selection" ? "Choose Your Role" : 
             currentTab === "sign-in" ? "Sign In" :
             (isSignUp ? "Join MANSA" : "Welcome Back")}
          </DialogTitle>
        </DialogHeader>

        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="role-selection">Choose Your Role</TabsTrigger>
            <TabsTrigger value="sign-in">Sign In</TabsTrigger>
            <TabsTrigger value="auth" disabled={!selectedRole}>
              {isSignUp ? "Sign Up" : "Sign In"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="role-selection" className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-2">How would you like to participate?</h3>
              <p className="text-gray-600">Select your primary role on the MANSA platform</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <Card 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedRole === 'investor' ? 'ring-2 ring-amber-500 bg-amber-50' : ''
                }`}
                onClick={() => setSelectedRole('investor')}
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-amber-800">Investor</CardTitle>
                  <CardDescription>
                    Invest in African businesses and earn returns through equity ownership
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2">
                    <li>• Minimum $20 investment</li>
                    <li>• Form consortiums with other investors</li>
                    <li>• Receive equity in businesses</li>
                    <li>• Track milestone progress</li>
                  </ul>
                  <Badge className="mt-3 bg-green-100 text-green-800">
                    Open to All Nationalities
                  </Badge>
                </CardContent>
              </Card>

              <Card 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedRole === 'entrepreneur' ? 'ring-2 ring-amber-500 bg-amber-50' : ''
                }`}
                onClick={() => setSelectedRole('entrepreneur')}
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-amber-800">Entrepreneur</CardTitle>
                  <CardDescription>
                    Showcase your business and secure funding from global investors
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2">
                    <li>• List business opportunities</li>
                    <li>• Receive competitive bids</li>
                    <li>• Milestone-based funding release</li>
                    <li>• Maintain business control</li>
                  </ul>
                  <Badge className="mt-3 bg-blue-100 text-blue-800">
                    African Businesses Focus
                  </Badge>
                </CardContent>
              </Card>

              <Card 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedRole === 'philanthropist' ? 'ring-2 ring-amber-500 bg-amber-50' : ''
                }`}
                onClick={() => setSelectedRole('philanthropist')}
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-amber-800">Philanthropist</CardTitle>
                  <CardDescription>
                    Support African businesses through donations without expecting returns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2">
                    <li>• Make impact-focused donations</li>
                    <li>• Support business growth</li>
                    <li>• No equity expectations</li>
                    <li>• Track social impact</li>
                  </ul>
                  <Badge className="mt-3 bg-purple-100 text-purple-800">
                    Impact-Focused Giving
                  </Badge>
                </CardContent>
              </Card>
            </div>

            {selectedRole && (
              <div className="text-center space-y-3">
                <div className="flex gap-3 justify-center">
                  <Button 
                    onClick={handleContinueToSignUp}
                    className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
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
              <h3 className="text-lg font-semibold mb-2">Sign In to Your Account</h3>
              <p className="text-gray-600">Choose your role and sign in</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
              <div>
                <Label htmlFor="role">I am signing in as:</Label>
                <RadioGroup value={selectedRole || ''} onValueChange={(value) => setSelectedRole(value as 'investor' | 'entrepreneur' | 'philanthropist')}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="investor" id="investor" />
                    <Label htmlFor="investor">Investor</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="entrepreneur" id="entrepreneur" />
                    <Label htmlFor="entrepreneur">Entrepreneur</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="philanthropist" id="philanthropist" />
                    <Label htmlFor="philanthropist">Philanthropist</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
                disabled={!selectedRole}
              >
                Sign In
              </Button>
            </form>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setCurrentTab("role-selection")}
                className="text-amber-600 hover:text-amber-700 text-sm"
              >
                Don't have an account? Sign up
              </button>
            </div>
          </TabsContent>

          <TabsContent value="auth" className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-2">
                {isSignUp ? "Create Your Account" : "Sign In to Your Account"}
              </h3>
              <p className="text-gray-600">
                You're signing in as a <Badge className="bg-amber-100 text-amber-800">{selectedRole}</Badge>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
              >
                Sign In
              </Button>
            </form>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowSignUpForm(true)}
                className="text-amber-600 hover:text-amber-700 text-sm"
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
