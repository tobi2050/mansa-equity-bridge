
import { Home, Lightbulb, Plus, MessageCircle, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useNavigation } from "@/contexts/NavigationContext";

interface BottomNavigationProps {
  userRole: 'investor' | 'entrepreneur' | 'philanthropist';
}

const BottomNavigation = ({ userRole }: BottomNavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { navigateTo, currentPage } = useNavigation();

  const handleHomeClick = () => {
    navigateTo('dashboard');
  };

  const getNavItems = () => {
    const baseItems = [
      { 
        icon: Home, 
        label: "Dashboard", 
        action: handleHomeClick,
        isActive: currentPage === 'dashboard'
      },
      { 
        icon: Lightbulb, 
        label: "Projects", 
        action: () => navigate(userRole === 'entrepreneur' ? "/entrepreneur-projects" : "/investment-opportunities"),
        isActive: location.pathname === (userRole === 'entrepreneur' ? "/entrepreneur-projects" : "/investment-opportunities")
      },
      { 
        icon: Plus, 
        label: "Create", 
        action: () => navigate(userRole === 'entrepreneur' ? "/entrepreneur-create" : "/create-post"),
        isActive: location.pathname === (userRole === 'entrepreneur' ? "/entrepreneur-create" : "/create-post")
      },
      { 
        icon: MessageCircle, 
        label: "Chat", 
        action: () => navigate(userRole === 'entrepreneur' ? "/entrepreneur-chat" : "/messages"),
        isActive: location.pathname === (userRole === 'entrepreneur' ? "/entrepreneur-chat" : "/messages")
      },
      { 
        icon: User, 
        label: "Profile", 
        action: () => navigate("/profile"),
        isActive: location.pathname === "/profile"
      }
    ];
    return baseItems;
  };

  const navItems = getNavItems();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          
          return (
            <Button
              key={item.label}
              variant="ghost"
              size="sm"
              onClick={item.action}
              className={`flex flex-col items-center gap-1 px-2 py-3 ${
                item.isActive 
                  ? 'text-amber-600' 
                  : 'text-gray-600'
              }`}
            >
              <Icon className={`w-5 h-5 ${item.isActive ? 'text-amber-600' : 'text-gray-600'}`} />
              <span className={`text-xs ${item.isActive ? 'text-amber-600' : 'text-gray-600'}`}>
                {item.label}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
