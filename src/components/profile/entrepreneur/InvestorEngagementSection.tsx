
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, DollarSign, MessageCircle } from "lucide-react";
// Placeholder: Replace with real results from Supabase + relationships (followers, investors, etc)
const InvestorEngagementSection = ({ businesses }: { businesses: any[] }) => {
  // For now, count each business as 2 investors and 1 active chat/message
  const totalInvestors = businesses.length * 2;
  const messagesLast30 = businesses.length * 3;
  const fundingOffers = businesses.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Investors Engaged
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{totalInvestors}</div>
          <div className="text-xs text-muted-foreground">Total unique investors shown interest</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Messages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{messagesLast30}</div>
          <div className="text-xs text-muted-foreground">Investor business messages (last 30 days)</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Funding Offers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{fundingOffers}</div>
          <div className="text-xs text-muted-foreground">Pending funding offers from investors</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestorEngagementSection;
