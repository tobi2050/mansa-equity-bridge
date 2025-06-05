
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Send, Search, MessageCircle, Users, DollarSign, Phone, Video } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";

const InvestorChat = () => {
  const navigate = useNavigate();
  const userRole = 'investor' as const;
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const conversations = [
    {
      id: 1,
      name: "Sarah Okoye",
      role: "Entrepreneur",
      lastMessage: "Thank you for your investment proposal! I'd like to discuss the terms.",
      time: "1h ago",
      unread: 3,
      project: "EcoFarm Nigeria",
      avatar: "SO"
    },
    {
      id: 2,
      name: "Tech Innovators Consortium",
      role: "Consortium",
      lastMessage: "Our group is interested in co-investing. Let's coordinate.",
      time: "3h ago",
      unread: 1,
      project: "FinTech Mobile App",
      avatar: "TIC"
    },
    {
      id: 3,
      name: "Michael Banda",
      role: "Entrepreneur",
      lastMessage: "The milestone payment has been processed successfully.",
      time: "1d ago",
      unread: 0,
      project: "Solar Tech Solutions",
      avatar: "MB"
    },
    {
      id: 4,
      name: "Investment Advisory Group",
      role: "Consortium",
      lastMessage: "Due diligence report is ready for review.",
      time: "2d ago",
      unread: 2,
      project: "AgriTech Platform",
      avatar: "IAG"
    }
  ];

  const messages = selectedConversation ? [
    {
      id: 1,
      sender: "Sarah Okoye",
      content: "Thank you for your investment proposal for EcoFarm Nigeria. I'm excited about the potential partnership.",
      time: "2:30 PM",
      isOwn: false
    },
    {
      id: 2,
      sender: "You",
      content: "I'm impressed with your sustainable approach and market traction. I'd like to invest $25,000 for 15% equity.",
      time: "2:45 PM",
      isOwn: true
    },
    {
      id: 3,
      sender: "Sarah Okoye",
      content: "That's a fair proposal. Can we schedule a call to discuss the milestone structure and timeline?",
      time: "3:00 PM",
      isOwn: false
    },
    {
      id: 4,
      sender: "You",
      content: "Absolutely! I'm available this week. Let's also discuss the due diligence process.",
      time: "3:15 PM",
      isOwn: true
    }
  ] : [];

  const selectedConv = conversations.find(conv => conv.id === selectedConversation);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setNewMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b px-4 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/')}
              className="mr-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Investor Messages</h1>
              <p className="text-xs text-gray-600">Communicate with entrepreneurs and consortiums</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <div className={`space-y-4 ${selectedConversation ? 'hidden lg:block' : ''}`}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Conversations</h2>
              <Badge variant="secondary">{conversations.filter(c => c.unread > 0).length} new</Badge>
            </div>

            <div className="space-y-2">
              {conversations.map((conversation) => (
                <Card 
                  key={conversation.id}
                  className={`cursor-pointer transition-colors hover:bg-gray-50 ${
                    selectedConversation === conversation.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedConversation(conversation.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback>{conversation.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-gray-900 truncate">{conversation.name}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">{conversation.time}</span>
                            {conversation.unread > 0 && (
                              <Badge variant="destructive" className="text-xs">
                                {conversation.unread}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            {conversation.role}
                          </Badge>
                          <span className="text-xs text-gray-500">{conversation.project}</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Chat Window */}
          <div className={`lg:col-span-2 ${!selectedConversation ? 'hidden lg:block' : ''}`}>
            {selectedConversation ? (
              <Card className="h-full flex flex-col">
                {/* Chat Header */}
                <CardHeader className="flex flex-row items-center space-y-0 pb-4 border-b">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setSelectedConversation(null)}
                    className="lg:hidden mr-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <Avatar className="w-10 h-10 mr-3">
                    <AvatarFallback>{selectedConv?.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{selectedConv?.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">{selectedConv?.role}</Badge>
                      <span className="text-xs">{selectedConv?.project}</span>
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Video className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <DollarSign className="w-4 h-4 mr-2" />
                      Invest
                    </Button>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div 
                      key={message.id}
                      className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.isOwn 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.isOwn ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>

                {/* Message Input */}
                <div className="p-4 border-t">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleSendMessage}
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center">
                  <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a conversation</h3>
                  <p className="text-gray-600">Choose a conversation from the list to start chatting</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <BottomNavigation userRole={userRole} />
    </div>
  );
};

export default InvestorChat;
