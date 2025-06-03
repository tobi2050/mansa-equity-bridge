
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, Users, TrendingUp, CheckCircle, X, MessageSquare } from "lucide-react";

const InvestmentOffers = () => {
  const offers = [
    {
      id: 1,
      investor: {
        name: "Nairobi Investment Group",
        lead: "John Kimani",
        initials: "NIG",
        type: "Consortium"
      },
      project: "EcoFarm Nigeria",
      amount: 25000,
      equity: 12,
      status: "pending",
      submittedAt: "2 days ago",
      terms: "5-year investment term with milestone-based releases",
      members: 4
    },
    {
      id: 2,
      investor: {
        name: "African Growth Partners",
        lead: "Adaora Okafor",
        initials: "AGP",
        type: "Fund"
      },
      project: "Solar Tech Project",
      amount: 50000,
      equity: 20,
      status: "pending",
      submittedAt: "1 week ago",
      terms: "3-year partnership with marketing support included",
      members: 1
    },
    {
      id: 3,
      investor: {
        name: "Global Impact Investors",
        lead: "Maria Fernandez",
        initials: "GII",
        type: "Individual"
      },
      project: "EcoFarm Nigeria",
      amount: 15000,
      equity: 8,
      status: "accepted",
      submittedAt: "2 weeks ago",
      terms: "Philanthropic investment with business mentorship",
      members: 1
    },
    {
      id: 4,
      investor: {
        name: "MENA Ventures",
        lead: "Ahmed Hassan",
        initials: "MV",
        type: "Fund"
      },
      project: "Digital Payment Platform",
      amount: 30000,
      equity: 15,
      status: "rejected",
      submittedAt: "3 weeks ago",
      terms: "Required majority stake and board control",
      members: 1
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Consortium': return <Users className="h-4 w-4" />;
      case 'Fund': return <TrendingUp className="h-4 w-4" />;
      default: return <DollarSign className="h-4 w-4" />;
    }
  };

  const OfferCard = ({ offer }: { offer: typeof offers[0] }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-gradient-to-br from-amber-500 to-orange-600 text-white text-sm">
                {offer.investor.initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{offer.investor.name}</CardTitle>
              <p className="text-sm text-gray-600">Led by {offer.investor.lead}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {getTypeIcon(offer.investor.type)}
                  <span className="ml-1">{offer.investor.type}</span>
                </Badge>
                {offer.investor.type === "Consortium" && (
                  <Badge variant="outline" className="text-xs">
                    {offer.members} members
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <Badge className={getStatusColor(offer.status)}>
            {offer.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Project:</span>
            <p className="font-medium">{offer.project}</p>
          </div>
          <div>
            <span className="text-gray-600">Investment:</span>
            <p className="font-medium">${offer.amount.toLocaleString()}</p>
          </div>
          <div>
            <span className="text-gray-600">Equity:</span>
            <p className="font-medium">{offer.equity}%</p>
          </div>
          <div>
            <span className="text-gray-600">Submitted:</span>
            <p className="font-medium">{offer.submittedAt}</p>
          </div>
        </div>

        <div>
          <span className="text-gray-600 text-sm">Terms:</span>
          <p className="text-sm mt-1">{offer.terms}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t">
          {offer.status === "pending" && (
            <>
              <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                <CheckCircle className="h-4 w-4 mr-2" />
                Accept Offer
              </Button>
              <Button size="sm" variant="outline" className="flex-1 text-red-600 hover:bg-red-50">
                <X className="h-4 w-4 mr-2" />
                Decline
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                <MessageSquare className="h-4 w-4 mr-2" />
                Negotiate
              </Button>
            </>
          )}
          {offer.status === "accepted" && (
            <Button size="sm" variant="outline" className="flex-1">
              View Agreement
            </Button>
          )}
          {offer.status === "rejected" && (
            <Button size="sm" variant="outline" className="flex-1" disabled>
              Offer Declined
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Investment Offers</h2>
        <p className="text-gray-600">Review and manage investment proposals from investors</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">
                {offers.filter(o => o.status === "pending").length}
              </div>
              <div className="text-sm text-gray-600">Pending Offers</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {offers.filter(o => o.status === "accepted").length}
              </div>
              <div className="text-sm text-gray-600">Accepted Offers</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                ${offers.filter(o => o.status === "accepted").reduce((sum, o) => sum + o.amount, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Accepted</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {offers.filter(o => o.status === "accepted").reduce((sum, o) => sum + o.equity, 0)}%
              </div>
              <div className="text-sm text-gray-600">Total Equity Given</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Offers Tabs */}
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pending">
            Pending ({offers.filter(o => o.status === "pending").length})
          </TabsTrigger>
          <TabsTrigger value="accepted">
            Accepted ({offers.filter(o => o.status === "accepted").length})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected ({offers.filter(o => o.status === "rejected").length})
          </TabsTrigger>
          <TabsTrigger value="all">
            All ({offers.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {offers.filter(o => o.status === "pending").map(offer => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </TabsContent>

        <TabsContent value="accepted" className="space-y-4">
          {offers.filter(o => o.status === "accepted").map(offer => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          {offers.filter(o => o.status === "rejected").map(offer => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          {offers.map(offer => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InvestmentOffers;
