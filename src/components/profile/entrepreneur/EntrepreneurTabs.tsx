
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BusinessPortfolioList from "./BusinessPortfolioList";
import InvestorEngagementSection from "./InvestorEngagementSection";
import PerformanceAnalyticsSection from "./PerformanceAnalyticsSection";

type EntrepreneurTabsProps = {
  profile: any;
  businesses: any[];
  isOwnProfile?: boolean;
};

const EntrepreneurTabs = ({ profile, businesses, isOwnProfile }: EntrepreneurTabsProps) => {
  return (
    <Tabs defaultValue="portfolio" className="mt-4">
      <TabsList>
        <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
        <TabsTrigger value="activity">Investor Engagement</TabsTrigger>
        <TabsTrigger value="analytics">Performance</TabsTrigger>
      </TabsList>
      <TabsContent value="portfolio">
        <BusinessPortfolioList businesses={businesses} />
      </TabsContent>
      <TabsContent value="activity">
        <InvestorEngagementSection businesses={businesses} />
      </TabsContent>
      <TabsContent value="analytics">
        <PerformanceAnalyticsSection businesses={businesses} />
      </TabsContent>
    </Tabs>
  );
};

export default EntrepreneurTabs;
