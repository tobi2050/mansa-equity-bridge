
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { MessageSquare, Search, Send, Phone, Video } from "lucide-react";

const InvestorCommunications = () => {
  const conversations = [
    {
      id: 1,
      investor: {
        name: "John Kimani",
        initials: "JK",
        company: "Nairobi Investment Group"
      },
      lastMessage: "I'm interested in discussing the equity terms for your EcoFarm project. Can we schedule a call?",
      timestamp: "2 hours ago",
      unread: 2,
      project: "EcoFarm Nigeria"
    },
    {
      id: 2,
      investor: {
        name: "Adaora Syndicate",
        initials: "AS",
        company: "African Growth Partners"
      },
      lastMessage: "Thank you for the detailed business plan. Our consortium is ready to proceed with the investment.",
      timestamp: "5 hours ago",
      unread: 0,
      project: "Solar Tech Project"
    },
    {
      id: 3,
      investor: {
        name: "Maria Fernandez",
        initials: "MF",
        company: "Global Impact Fund"
      },
      lastMessage: "Could you provide more details about your milestone tracking system?",
      timestamp: "1 day ago",
      unread: 1,
      project: "Digital Payment Platform"
    },
    {
      id: 4,
      investor: {
        name: "Ahmed Hassan",
        initials: "AH",
        company: "MENA Ventures"
      },
      lastMessage: "We're impressed with your progress. Let's discuss the next funding round.",
      timestamp: "2 days ago",
      unread: 0,
      project: "EcoFarm Nigeria"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Investor Communications</h2>
          <p className="text-gray-600">Manage conversations with current and potential investors</p>
        </div>
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search conversations..." 
            className="pl-10 w-full sm:w-64"
          />
        </div>
      </div>

      {/* Communications List */}
      <div className="grid gap-4">
        {conversations.map((conversation) => (
          <Card key={conversation.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-gradient-to-br from-amber-500 to-orange-600 text-white">
                    {conversation.investor.initials}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-900 truncate">
                        {conversation.investor.name}
                      </h3>
                      {conversation.unread > 0 && (
                        <Badge className="bg-red-500 text-white text-xs px-2 py-1">
                          {conversation.unread}
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-1">{conversation.investor.company}</p>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {conversation.project}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-700 line-clamp-2">
                    {conversation.lastMessage}
                  </p>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Button size="sm" variant="outline">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Video className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Messages Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Message Summary
          </CardTitle>
          <CardDescription>
            Overview of your recent investor communications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">7</div>
              <div className="text-sm text-blue-700">Unread Messages</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">12</div>
              <div className="text-sm text-green-700">Active Conversations</div>
            </div>
            <div className="text-center p-4 bg-amber-50 rounded-lg">
              <div className="text-2xl font-bold text-amber-600">3</div>
              <div className="text-sm text-amber-700">Pending Responses</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common communication tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button variant="outline" className="h-auto p-4 justify-start">
              <Send className="h-5 w-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Send Update to All Investors</div>
                <div className="text-sm text-gray-500">Share progress with all stakeholders</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 justify-start">
              <MessageSquare className="h-5 w-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Schedule Investor Meeting</div>
                <div className="text-sm text-gray-500">Arrange calls with potential investors</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestorCommunications;
