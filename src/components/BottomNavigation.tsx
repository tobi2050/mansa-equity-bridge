
import { Home, Lightbulb, Plus, MessageCircle, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface BottomNavigationProps {
  userRole: 'investor' | 'entrepreneur' | 'philanthropist';
}

const BottomNavigation = ({ userRole }: BottomNavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getNavItems = () => {
    const baseItems = [
      { icon: Home, label: "Dashboard", path: "/" },
      { icon: Lightbulb, label: "Projects", path: userRole === 'entrepreneur' ? "/entrepreneur-projects" : "/investment-opportunities" },
      { icon: Plus, label: "Create", path: userRole === 'entrepreneur' ? "/entrepreneur-create" : "/create-post" },
      { icon: MessageCircle, label: "Chat", path: userRole === 'entrepreneur' ? "/entrepreneur-chat" : "/messages" },
      { icon: User, label: "Profile", path: "/profile" }
    ];
    return baseItems;
  };

  const navItems = getNavItems();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Button
              key={item.label}
              variant="ghost"
              size="sm"
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 px-2 py-3 ${
                isActive 
                  ? 'text-amber-600' 
                  : 'text-gray-600'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-amber-600' : 'text-gray-600'}`} />
              <span className={`text-xs ${isActive ? 'text-amber-600' : 'text-gray-600'}`}>
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
