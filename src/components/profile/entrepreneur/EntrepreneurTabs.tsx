
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import BusinessPortfolioList from "./BusinessPortfolioList";
import InvestorEngagementSection from "./InvestorEngagementSection";

type EntrepreneurTabsProps = {
  profile: any;
  businesses: any[];
  isOwnProfile?: boolean;
};

const EntrepreneurTabs = ({ profile, businesses, isOwnProfile }: EntrepreneurTabsProps) => {
  const navigate = useNavigate();

  return (
    <Tabs defaultValue="portfolio" className="mt-4">
      <div className="flex justify-between items-center border-b mb-4">
        <TabsList className="bg-transparent border-b-0 p-0">
          <TabsTrigger value="portfolio" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none">Portfolio</TabsTrigger>
          <TabsTrigger value="activity" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none">Investor Engagement</TabsTrigger>
        </TabsList>
        {isOwnProfile && (
          <Button variant="outline" size="sm" onClick={() => navigate('/create-business')}>
            <Plus className="w-4 h-4 mr-2" />
            Add Business
          </Button>
        )}
      </div>
      <TabsContent value="portfolio">
        <BusinessPortfolioList businesses={businesses} />
      </TabsContent>
      <TabsContent value="activity">
        <InvestorEngagementSection businesses={businesses} />
      </TabsContent>
    </Tabs>
  );
};

export default EntrepreneurTabs;
