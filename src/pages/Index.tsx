
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, CheckCircle, Shield } from "lucide-react";
import AuthModal from "@/components/AuthModal";
import Dashboard from "@/components/Dashboard";
import AdminLogin from "@/components/AdminLogin";
import AdminDashboard from "@/components/AdminDashboard";

const Index = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalTab, setAuthModalTab] = useState("role-selection");
  const [authModalDefaultRole, setAuthModalDefaultRole] = useState<'investor' | 'entrepreneur' | 'philanthropist' | undefined>(undefined);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userRole, setUserRole] = useState<'investor' | 'entrepreneur' | 'philanthropist' | null>(null);

  const handleLogin = (role: 'investor' | 'entrepreneur' | 'philanthropist') => {
    setUserRole(role);
    setIsLoggedIn(true);
    setShowAuthModal(false);
  };

  const handleAdminLogin = () => {
    setIsAdmin(true);
    setShowAdminLogin(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUserRole(null);
  };

  const handleGetStarted = () => {
    setAuthModalTab("role-selection");
    setAuthModalDefaultRole('investor'); // Highlight investor for "Start Investing Today"
    setShowAuthModal(true);
  };

  const handleListBusiness = () => {
    setAuthModalTab("role-selection");
    setAuthModalDefaultRole('entrepreneur'); // Highlight entrepreneur for "List Your Business"
    setShowAuthModal(true);
  };

  const handleSignIn = () => {
    setAuthModalTab("sign-in"); // Go directly to sign-in tab
    setAuthModalDefaultRole(undefined);
    setShowAuthModal(true);
  };

  // Secret admin access - triple click on logo
  const [logoClickCount, setLogoClickCount] = useState(0);
  const handleLogoClick = () => {
    setLogoClickCount(prev => prev + 1);
    if (logoClickCount === 2) {
      setShowAdminLogin(true);
      setLogoClickCount(0);
    }
    setTimeout(() => setLogoClickCount(0), 2000);
  };

  if (isAdmin) {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  if (isLoggedIn && userRole) {
    return <Dashboard userRole={userRole} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Header */}
      <header className="px-4 py-4 bg-white/95 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3" onClick={handleLogoClick}>
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center cursor-pointer">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">MANSA</h1>
              <p className="text-xs text-gray-600">Building Africa's Future</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline"
              onClick={handleSignIn}
              className="border-amber-500 text-amber-700 hover:bg-amber-50"
            >
              Sign In
            </Button>
            <Button 
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-12 md:py-20">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-amber-100 text-amber-800 border-amber-200">
            Democratizing African Investment
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Connect Global Capital with
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600"> African Innovation</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join a revolutionary platform that breaks elite monopolies on finance, creating transparent investment opportunities that reduce corruption and democratize access to capital across Africa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-4 text-lg"
            >
              Start Investing Today
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={handleListBusiness}
              className="border-amber-500 text-amber-700 hover:bg-amber-50 px-8 py-4 text-lg"
            >
              List Your Business
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 md:py-20 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Empowering African Entrepreneurship
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-amber-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-amber-800">For Investors</CardTitle>
                <CardDescription>
                  Discover vetted African businesses, form consortiums, and invest with confidence through milestone-based funding.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Minimum $20 investment
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Form investment consortiums
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Milestone-based funding
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-amber-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-amber-800">For Entrepreneurs</CardTitle>
                <CardDescription>
                  Showcase your business, compete for investment, and grow with global backing while maintaining control.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Competitive bidding system
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Flexible equity terms
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Progress-based funding
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-amber-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-amber-800">For Philanthropists</CardTitle>
                <CardDescription>
                  Support African businesses through donations without expecting financial returns, focusing on impact.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Impact-focused giving
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Track business progress
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    No equity expectations
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 bg-white/80 rounded-lg">
              <div className="text-3xl md:text-4xl font-bold text-amber-600 mb-2">$20</div>
              <div className="text-gray-600 text-sm md:text-base">Minimum Investment</div>
            </div>
            <div className="p-6 bg-white/80 rounded-lg">
              <div className="text-3xl md:text-4xl font-bold text-amber-600 mb-2">0.5%</div>
              <div className="text-gray-600 text-sm md:text-base">Business Fee</div>
            </div>
            <div className="p-6 bg-white/80 rounded-lg">
              <div className="text-3xl md:text-4xl font-bold text-amber-600 mb-2">2%</div>
              <div className="text-gray-600 text-sm md:text-base">Investor Fee</div>
            </div>
            <div className="p-6 bg-white/80 rounded-lg">
              <div className="text-3xl md:text-4xl font-bold text-amber-600 mb-2">5</div>
              <div className="text-gray-600 text-sm md:text-base">Milestone System</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 bg-gradient-to-r from-amber-500 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform African Business?
          </h3>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Join thousands of investors and entrepreneurs building Africa's economic future together.
          </p>
          <Button 
            size="lg"
            onClick={handleGetStarted}
            className="bg-white text-amber-600 hover:bg-gray-50 px-8 py-4 text-lg font-semibold"
          >
            Join MANSA Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">M</span>
                </div>
                <span className="text-xl font-bold">MANSA</span>
              </div>
              <p className="text-gray-400">
                Democratizing investment in African businesses through transparent, accessible capital.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li>How it Works</li>
                <li>Investor Guide</li>
                <li>Business Listings</li>
                <li>Success Stories</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Security</li>
                <li>Terms & Privacy</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Blog</li>
                <li>Newsletter</li>
                <li>Events</li>
                <li>Partners</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MANSA. Named after King Mansa Musa of Mali. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLogin}
        defaultTab={authModalTab}
        defaultRole={authModalDefaultRole}
      />
      
      {showAdminLogin && (
        <AdminLogin 
          onClose={() => setShowAdminLogin(false)}
          onLogin={handleAdminLogin}
        />
      )}
    </div>
  );
};

export default Index;
