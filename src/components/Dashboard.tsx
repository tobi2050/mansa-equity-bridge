
import { useState } from "react";
import EntrepreneurDashboard from "./EntrepreneurDashboard";
import InvestmentOpportunities from "./InvestmentOpportunities";
import BottomNavigation from "./BottomNavigation";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigation } from "@/contexts/NavigationContext";
import { DashboardHeader } from "./dashboard/DashboardHeader";
import { InvestorDashboardView } from "./dashboard/InvestorDashboardView";
import { EntrepreneurDashboardView } from "./dashboard/EntrepreneurDashboardView";

interface DashboardProps {
  userRole: 'investor' | 'entrepreneur';
  onLogout: () => void;
}

const Dashboard = ({ userRole, onLogout }: DashboardProps) => {
  const { logout } = useAuth();
  const { currentPage, navigateTo, goBack, canGoBack } = useNavigation();
  const [entrepreneurActiveTab, setEntrepreneurActiveTab] = useState('overview');

  const handleLogout = () => {
    logout();
    onLogout();
  };

  const renderCurrentView = () => {
    switch (currentPage) {
      case 'entrepreneur-dashboard':
        return (
          <EntrepreneurDashboard 
            activeTab={entrepreneurActiveTab}
            setActiveTab={setEntrepreneurActiveTab}
            onBack={() => navigateTo('dashboard')} 
          />
        );
      case 'investment-opportunities':
        return <InvestmentOpportunities onBack={() => navigateTo('dashboard')} />;
      case 'dashboard':
      default:
        if (userRole === 'entrepreneur') {
          return <EntrepreneurDashboardView onNavigate={navigateTo} />;
        }
        return <InvestorDashboardView onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader 
        userRole={userRole}
        onLogout={handleLogout}
        canGoBack={canGoBack}
        goBack={goBack}
      />

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-6 pb-20 md:pb-6">
        {renderCurrentView()}
      </div>

      {/* Bottom navigation for mobile */}
      <BottomNavigation userRole={userRole} />
    </div>
  );
};

export default Dashboard;
