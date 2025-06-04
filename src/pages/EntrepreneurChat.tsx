
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Send, Search, MessageCircle, Users, DollarSign } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";

const EntrepreneurChat = () => {
  const navigate = useNavigate();
  const userRole = 'entrepreneur' as const;
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const conversations = [
    {
      id: 1,
      name: "John Kimani",
      role: "Investor",
      lastMessage: "I'm interested in your EcoFarm project. Can we discuss the terms?",
      time: "2h ago",
      unread: 2,
      project: "EcoFarm Nigeria",
      avatar: "JK"
    },
    {
      id: 2,
      name: "African Investment Group",
      role: "Consortium",
      lastMessage: "Our consortium would like to invest $50K in your solar project",
      time: "5h ago",
      unread: 1,
      project: "Solar Tech Solutions",
      avatar: "AIG"
    },
    {
      id: 3,
      name: "Maria Santos",
      role: "Philanthropist",
      lastMessage: "Thank you for the update on the community impact!",
      time: "1d ago",
      unread: 0,
      project: "EcoFarm Nigeria",
      avatar: "MS"
    },
    {
      id: 4,
      name: "Tech Innovators Fund",
      role: "Investor",
      lastMessage: "We've approved milestone 2 payment. Congratulations!",
      time: "2d ago",
      unread: 0,
      project: "FinTech Mobile App",
      avatar: "TIF"
    }
  ];

  const messages = selectedConversation ? [
    {
      id: 1,
      sender: "John Kimani",
      content: "Hi! I've been reviewing your EcoFarm Nigeria project and I'm very impressed with your progress.",
      time: "10:30 AM",
      isOwn: false
    },
    {
      id: 2,
      sender: "You",
      content: "Thank you! We're excited about the potential impact we can make together.",
      time: "10:35 AM",
      isOwn: true
    },
    {
      id: 3,
      sender: "John Kimani",
      content: "I'm interested in investing $15,000 for 12% equity. Would you be open to discussing this?",
      time: "10:40 AM",
      isOwn: false
    },
    {
      id: 4,
      sender: "You",
      content: "That sounds like a great starting point. I'd love to schedule a call to discuss the details.",
      time: "11:15 AM",
      isOwn: true
    }
  ] : [];

  const selectedConv = conversations.find(conv => conv.id === selectedConversation);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Add message sending logic here
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
              <h1 className="text-xl font-bold text-gray-900">Messages</h1>
              <p className="text-xs text-gray-600">Chat with investors and supporters</p>
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
                    selectedConversation === conversation.id ? 'ring-2 ring-amber-500' : ''
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
                      <DollarSign className="w-4 h-4 mr-2" />
                      Investment
                    </Button>
                    <Button variant="outline" size="sm">
                      <Users className="w-4 h-4" />
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
                            ? 'bg-amber-500 text-white' 
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.isOwn ? 'text-amber-100' : 'text-gray-500'
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
                      className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
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

      {/* Bottom navigation for mobile */}
      <BottomNavigation userRole={userRole} />
    </div>
  );
};

export default EntrepreneurChat;
