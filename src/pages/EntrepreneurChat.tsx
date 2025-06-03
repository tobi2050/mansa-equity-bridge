
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Send, Search, MessageCircle, Users, Clock, MoreHorizontal } from "lucide-react";

const EntrepreneurChat = () => {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [message, setMessage] = useState("");

  const chats = [
    {
      id: 1,
      name: "Investment Consortium A",
      type: "group",
      participants: 8,
      lastMessage: "We're ready to proceed with the next milestone funding",
      lastTime: "2 min ago",
      unread: 3,
      avatar: "IC",
      status: "active"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      type: "direct",
      participants: 1,
      lastMessage: "Great progress on the Q3 milestones!",
      lastTime: "1 hour ago",
      unread: 0,
      avatar: "SJ",
      status: "active"
    },
    {
      id: 3,
      name: "EcoFarm Project Team",
      type: "group",
      participants: 5,
      lastMessage: "The new organic certification has been approved",
      lastTime: "3 hours ago",
      unread: 1,
      avatar: "EP",
      status: "active"
    },
    {
      id: 4,
      name: "Michael Chen",
      type: "direct",
      participants: 1,
      lastMessage: "Looking forward to our call tomorrow",
      lastTime: "1 day ago",
      unread: 0,
      avatar: "MC",
      status: "offline"
    }
  ];

  const messages = [
    {
      id: 1,
      sender: "Sarah Johnson",
      content: "Hi! I've reviewed your latest milestone report and I'm impressed with the progress.",
      time: "10:30 AM",
      isOwn: false
    },
    {
      id: 2,
      sender: "You",
      content: "Thank you Sarah! We're on track to complete the organic certification by next month.",
      time: "10:32 AM",
      isOwn: true
    },
    {
      id: 3,
      sender: "David Wilson",
      content: "The market expansion strategy looks solid. What's the timeline for the Lagos rollout?",
      time: "10:35 AM",
      isOwn: false
    },
    {
      id: 4,
      sender: "You",
      content: "We're planning to start the Lagos rollout in Q1 2025. The regulatory approvals are almost complete.",
      time: "10:38 AM",
      isOwn: true
    },
    {
      id: 5,
      sender: "Sarah Johnson",
      content: "Excellent! Keep us updated on the regulatory progress. We're ready to proceed with the next milestone funding.",
      time: "10:40 AM",
      isOwn: false
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(-1)}
              className="mr-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Chat</h1>
              <p className="text-xs text-gray-600">Connect with investors and team members</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-6 pb-20 md:pb-6">
        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Chat list */}
          <div className="lg:col-span-1">
            <Card className="h-full flex flex-col">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Conversations</CardTitle>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input placeholder="Search conversations..." className="pl-9" />
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-0">
                <div className="space-y-1">
                  {chats.map((chat) => (
                    <div
                      key={chat.id}
                      className={`p-4 cursor-pointer hover:bg-gray-50 border-l-4 transition-colors ${
                        selectedChat === chat.id 
                          ? 'bg-amber-50 border-amber-500' 
                          : 'border-transparent'
                      }`}
                      onClick={() => setSelectedChat(chat.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">{chat.avatar}</span>
                          </div>
                          {chat.type === "group" && (
                            <Users className="w-3 h-3 absolute -bottom-1 -right-1 bg-white rounded-full" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-sm truncate">{chat.name}</h3>
                            <div className="flex items-center space-x-1">
                              <span className="text-xs text-gray-500">{chat.lastTime}</span>
                              {chat.unread > 0 && (
                                <Badge className="bg-red-500 text-white text-xs px-1 min-w-[20px] h-5">
                                  {chat.unread}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 truncate mt-1">{chat.lastMessage}</p>
                          {chat.type === "group" && (
                            <div className="flex items-center mt-1">
                              <Users className="w-3 h-3 text-gray-400 mr-1" />
                              <span className="text-xs text-gray-500">{chat.participants} participants</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat window */}
          <div className="lg:col-span-2">
            {selectedChat ? (
              <Card className="h-full flex flex-col">
                <CardHeader className="pb-4 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {chats.find(c => c.id === selectedChat)?.avatar}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium">{chats.find(c => c.id === selectedChat)?.name}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <span>Active now</span>
                          {chats.find(c => c.id === selectedChat)?.type === "group" && (
                            <>
                              <span>•</span>
                              <span>{chats.find(c => c.id === selectedChat)?.participants} participants</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md ${msg.isOwn ? 'order-1' : 'order-2'}`}>
                        {!msg.isOwn && (
                          <div className="text-sm font-medium text-gray-600 mb-1">{msg.sender}</div>
                        )}
                        <div
                          className={`px-4 py-2 rounded-lg ${
                            msg.isOwn
                              ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          {msg.content}
                        </div>
                        <div className="text-xs text-gray-500 mt-1 text-right">
                          {msg.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
                
                <div className="p-4 border-t">
                  <div className="flex space-x-2">
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSendMessage}
                      className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">Select a conversation</h3>
                  <p className="text-gray-500">Choose a conversation from the list to start chatting</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntrepreneurChat;
