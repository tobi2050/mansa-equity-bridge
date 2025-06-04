
import { ReactNode } from "react";
import BottomNavigation from "./BottomNavigation";

interface MobileLayoutProps {
  children: ReactNode;
  userRole: 'investor' | 'entrepreneur' | 'philanthropist';
}

const MobileLayout = ({ children, userRole }: MobileLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
      <BottomNavigation userRole={userRole} />
    </div>
  );
};

export default MobileLayout;
