
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Home, User, Settings, LogOut, MessageCircle, TrendingUp, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SlideOutMenuProps {
  userRole: 'investor' | 'entrepreneur';
  onLogout: () => void;
}

const SlideOutMenu = ({ userRole, onLogout }: SlideOutMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: User, label: "Profile", path: "/profile" },
    { icon: TrendingUp, label: "Feed", path: "/feed" },
    { 
      icon: Building2, 
      label: userRole === 'entrepreneur' ? "My Business" : "Opportunities", 
      path: userRole === 'entrepreneur' ? "/business-profile" : "/investment-opportunities" 
    },
    { icon: MessageCircle, label: "Messages", path: "/messages" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle className="text-left">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">MANSA</h1>
                <p className="text-xs text-gray-600 capitalize">{userRole}</p>
              </div>
            </div>
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col space-y-2 mt-8">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.label}
                variant="ghost"
                className="justify-start w-full h-12"
                onClick={() => handleNavigation(item.path)}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </Button>
            );
          })}
          
          <div className="border-t pt-4 mt-8">
            <Button
              variant="ghost"
              className="justify-start w-full h-12 text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={onLogout}
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SlideOutMenu;
