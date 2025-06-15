
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bell, Users, ArrowLeft } from "lucide-react";
import SlideOutMenu from "@/components/SlideOutMenu";

interface DashboardHeaderProps {
  userRole: 'investor' | 'entrepreneur';
  onLogout: () => void;
  canGoBack: boolean;
  goBack: () => void;
}

export const DashboardHeader = ({ userRole, onLogout, canGoBack, goBack }: DashboardHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border-b px-4 py-4 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {canGoBack && (
            <Button
              variant="ghost"
              size="sm"
              onClick={goBack}
              className="mr-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
          )}
          <SlideOutMenu userRole={userRole} onLogout={onLogout} />
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-gray-900">MANSA</h1>
              <p className="text-xs text-gray-600 capitalize">{userRole} Dashboard</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" className="hidden md:flex">
            <Bell className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/profile')}
            className="hidden md:flex"
          >
            <Users className="w-4 h-4 mr-2" />
            Profile
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onLogout}
            className="hidden md:flex"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};
