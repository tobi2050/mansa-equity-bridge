
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Send, Search, MessageCircle, Users, Bell, Archive } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";

const Messages = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const allConversations = [
    {
      id: 1,
      name: "Sarah Okoye",
      role: "Entrepreneur",
      lastMessage: "Thank you for your interest in EcoFarm Nigeria!",
      time: "2h ago",
      unread: 2,
      project: "EcoFarm Nigeria",
      avatar: "SO",
      type: "direct"
    },
    {
      id: 2,
      name: "Investment Group Chat",
      role: "Consortium",
      lastMessage: "Let's coordinate our investment strategy",
      time: "4h ago",
      unread: 5,
      project: "Multiple Projects",
      avatar: "IGC",
      type: "group"
    },
    {
      id: 3,
      name: "John Investor",
      role: "Investor",
      lastMessage: "I'm interested in co-investing",
      time: "1d ago",
      unread: 0,
      project: "Solar Tech Solutions",
      avatar: "JI",
      type: "direct"
    },
    {
      id: 4,
      name: "AgriTech Forum",
      role: "Forum",
      lastMessage: "New discussion about sustainable farming",
      time: "2d ago",
      unread: 3,
      project: "Agriculture Discussion",
      avatar: "ATF",
      type: "forum"
    }
  ];

  const filteredConversations = allConversations.filter(conv => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return conv.unread > 0;
    if (activeTab === "groups") return conv.type === "group" || conv.type === "forum";
    if (activeTab === "direct") return conv.type === "direct";
    return true;
  });

  const messages = selectedConversation ? [
    {
      id: 1,
      sender: "Sarah Okoye",
      content: "Hi! Thank you for showing interest in my EcoFarm Nigeria project.",
      time: "10:30 AM",
      isOwn: false
    },
    {
      id: 2,
      sender: "You",
      content: "Your project looks very promising! I'd love to learn more about your expansion plans.",
      time: "10:35 AM",
      isOwn: true
    },
    {
      id: 3,
      sender: "Sarah Okoye",
      content: "We're planning to expand to 3 new regions next year. Our current revenue is $50K monthly.",
      time: "10:40 AM",
      isOwn: false
    }
  ] : [];

  const selectedConv = allConversations.find(conv => conv.id === selectedConversation);

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
              <h1 className="text-xl font-bold text-gray-900">Messages</h1>
              <p className="text-xs text-gray-600">All your conversations in one place</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <div className={`space-y-4 ${selectedConversation ? 'hidden lg:block' : ''}`}>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
                <TabsTrigger value="direct">Direct</TabsTrigger>
                <TabsTrigger value="groups">Groups</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="space-y-2 mt-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">
                    {activeTab === "all" && "All Conversations"}
                    {activeTab === "unread" && "Unread Messages"}
                    {activeTab === "direct" && "Direct Messages"}
                    {activeTab === "groups" && "Groups & Forums"}
                  </h2>
                  <Badge variant="secondary">
                    {filteredConversations.filter(c => c.unread > 0).length} new
                  </Badge>
                </div>

                {filteredConversations.map((conversation) => (
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
                            <p className="font-medium text-gray-900 truncate flex items-center gap-2">
                              {conversation.name}
                              {conversation.type === "group" && <Users className="w-3 h-3" />}
                              {conversation.type === "forum" && <MessageCircle className="w-3 h-3" />}
                            </p>
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
              </TabsContent>
            </Tabs>
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
                    <CardTitle className="text-lg flex items-center gap-2">
                      {selectedConv?.name}
                      {selectedConv?.type === "group" && <Users className="w-4 h-4" />}
                      {selectedConv?.type === "forum" && <MessageCircle className="w-4 h-4" />}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">{selectedConv?.role}</Badge>
                      <span className="text-xs">{selectedConv?.project}</span>
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Archive className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Bell className="w-4 h-4" />
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
                  <p className="text-gray-600">Choose a conversation from the list to start messaging</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <BottomNavigation userRole="entrepreneur" />
    </div>
  );
};

export default Messages;
