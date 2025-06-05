
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Users, Bell, Send, Phone, Video, Archive } from "lucide-react";

const CommunicationHub = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const communicationStats = {
    unreadMessages: 7,
    activeConversations: 12,
    forumNotifications: 5,
    scheduledCalls: 3
  };

  const recentMessages = [
    {
      id: 1,
      from: "Sarah Okoye",
      message: "Thank you for your investment proposal...",
      time: "2h ago",
      type: "direct",
      unread: true
    },
    {
      id: 2,
      from: "Investment Group",
      message: "New milestone payment approved",
      time: "4h ago",
      type: "group",
      unread: true
    },
    {
      id: 3,
      from: "AgriTech Forum",
      message: "New discussion about sustainable farming",
      time: "1d ago",
      type: "forum",
      unread: false
    }
  ];

  const quickActions = [
    {
      title: "Send Message",
      description: "Start a new conversation",
      icon: Send,
      action: "message"
    },
    {
      title: "Schedule Call",
      description: "Set up a video or phone call",
      icon: Phone,
      action: "call"
    },
    {
      title: "Join Forum",
      description: "Participate in community discussions",
      icon: Users,
      action: "forum"
    },
    {
      title: "View Archive",
      description: "Access archived conversations",
      icon: Archive,
      action: "archive"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Communication Hub</h2>
          <p className="text-gray-600">Manage all your messages and conversations</p>
        </div>
        <Button className="bg-blue-500 hover:bg-blue-600">
          <MessageCircle className="w-4 h-4 mr-2" />
          New Message
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="forums">Forums</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Communication Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6 text-center">
                <MessageCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">{communicationStats.unreadMessages}</div>
                <div className="text-xs text-gray-600">Unread Messages</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">{communicationStats.activeConversations}</div>
                <div className="text-xs text-gray-600">Active Chats</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Bell className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-amber-600">{communicationStats.forumNotifications}</div>
                <div className="text-xs text-gray-600">Forum Alerts</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Phone className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-600">{communicationStats.scheduledCalls}</div>
                <div className="text-xs text-gray-600">Scheduled Calls</div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common communication tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <Button 
                    key={index}
                    variant="outline" 
                    className="h-auto p-4 flex flex-col gap-2"
                  >
                    <action.icon className="w-6 h-6" />
                    <div className="text-center">
                      <div className="font-medium text-sm">{action.title}</div>
                      <div className="text-xs text-gray-500">{action.description}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Messages */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Messages</CardTitle>
              <CardDescription>Your latest conversations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMessages.map((message) => (
                  <div key={message.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{message.from}</span>
                        <Badge variant={message.type === "direct" ? "default" : message.type === "group" ? "secondary" : "outline"}>
                          {message.type}
                        </Badge>
                        {message.unread && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                      </div>
                      <p className="text-sm text-gray-600 truncate">{message.message}</p>
                      <span className="text-xs text-gray-500">{message.time}</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages">
          <Card>
            <CardHeader>
              <CardTitle>Message Management</CardTitle>
              <CardDescription>Organize and manage your conversations</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Message management interface would be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forums">
          <Card>
            <CardHeader>
              <CardTitle>Forum Activity</CardTitle>
              <CardDescription>Your community forum participation</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Forum activity interface would be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunicationHub;
