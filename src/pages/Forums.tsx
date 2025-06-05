
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus, Search, MessageCircle, Users, TrendingUp, Clock, Pin } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";

const Forums = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const forums = [
    {
      id: 1,
      title: "Sustainable Agriculture in Africa",
      description: "Discuss eco-friendly farming practices and sustainable agriculture solutions",
      category: "Agriculture",
      members: 234,
      posts: 89,
      lastActivity: "2h ago",
      isJoined: true,
      isPinned: true,
      creator: "Green Farm Collective",
      avatar: "GFC"
    },
    {
      id: 2,
      title: "FinTech Innovation Hub",
      description: "Share insights on financial technology and digital payment solutions",
      category: "Technology",
      members: 456,
      posts: 167,
      lastActivity: "4h ago",
      isJoined: true,
      isPinned: false,
      creator: "Tech Innovators",
      avatar: "TI"
    },
    {
      id: 3,
      title: "Women Entrepreneurs Network",
      description: "Supporting women-led businesses across Africa",
      category: "Networking",
      members: 678,
      posts: 234,
      lastActivity: "1d ago",
      isJoined: false,
      isPinned: false,
      creator: "WEN Foundation",
      avatar: "WEN"
    },
    {
      id: 4,
      title: "Renewable Energy Projects",
      description: "Collaborate on solar, wind, and renewable energy initiatives",
      category: "Energy",
      members: 189,
      posts: 76,
      lastActivity: "2d ago",
      isJoined: true,
      isPinned: false,
      creator: "Solar Solutions",
      avatar: "SS"
    },
    {
      id: 5,
      title: "Investment Strategies Africa",
      description: "Share investment insights and market analysis",
      category: "Investment",
      members: 567,
      posts: 145,
      lastActivity: "3d ago",
      isJoined: false,
      isPinned: false,
      creator: "Africa Capital",
      avatar: "AC"
    }
  ];

  const recentPosts = [
    {
      id: 1,
      title: "New sustainable farming technique reduces water usage by 40%",
      forum: "Sustainable Agriculture",
      author: "John Farmer",
      replies: 12,
      likes: 34,
      time: "2h ago"
    },
    {
      id: 2,
      title: "Mobile payment adoption in rural areas: case study",
      forum: "FinTech Innovation",
      author: "Sarah Tech",
      replies: 8,
      likes: 23,
      time: "4h ago"
    },
    {
      id: 3,
      title: "Securing funding for women-led startups",
      forum: "Women Entrepreneurs",
      author: "Maria Leader",
      replies: 15,
      likes: 45,
      time: "1d ago"
    }
  ];

  const filteredForums = forums.filter(forum => {
    const matchesSearch = forum.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         forum.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "joined") return forum.isJoined && matchesSearch;
    if (activeTab === "trending") return forum.posts > 100 && matchesSearch;
    return matchesSearch;
  });

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
              <h1 className="text-xl font-bold text-gray-900">Community Forums</h1>
              <p className="text-xs text-gray-600">Connect and collaborate with the community</p>
            </div>
          </div>
          <Button className="bg-blue-500 hover:bg-blue-600">
            <Plus className="w-4 h-4 mr-2" />
            Create Forum
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Search and Filters */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Search Forums</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Search forums..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-gray-700">Categories</h4>
                  {["Agriculture", "Technology", "Networking", "Energy", "Investment"].map(category => (
                    <Badge key={category} variant="outline" className="mr-2 mb-2 cursor-pointer hover:bg-gray-100">
                      {category}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Recent Posts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentPosts.map(post => (
                  <div key={post.id} className="border-b pb-3 last:border-b-0">
                    <h4 className="font-medium text-sm mb-1 line-clamp-2">{post.title}</h4>
                    <p className="text-xs text-gray-500 mb-1">{post.forum} • {post.author}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{post.replies} replies</span>
                      <span>{post.likes} likes</span>
                      <span>{post.time}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Forums List */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="all">All Forums</TabsTrigger>
                <TabsTrigger value="joined">My Forums</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab}>
                <div className="space-y-4">
                  {filteredForums.map((forum) => (
                    <Card key={forum.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4 flex-1">
                            <Avatar className="w-12 h-12">
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                                {forum.avatar}
                              </AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-lg font-semibold text-gray-900">{forum.title}</h3>
                                {forum.isPinned && <Pin className="w-4 h-4 text-amber-500" />}
                                {forum.isJoined && <Badge className="bg-green-100 text-green-800">Joined</Badge>}
                              </div>
                              
                              <p className="text-gray-600 mb-3">{forum.description}</p>
                              
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Users className="w-4 h-4" />
                                  <span>{forum.members} members</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MessageCircle className="w-4 h-4" />
                                  <span>{forum.posts} posts</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{forum.lastActivity}</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2 mt-3">
                                <Badge variant="outline">{forum.category}</Badge>
                                <span className="text-xs text-gray-500">Created by {forum.creator}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-2">
                            {forum.isJoined ? (
                              <Button variant="outline" size="sm">
                                View Forum
                              </Button>
                            ) : (
                              <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                                Join Forum
                              </Button>
                            )}
                            {forum.posts > 100 && (
                              <div className="flex items-center gap-1 text-xs text-amber-600">
                                <TrendingUp className="w-3 h-3" />
                                <span>Trending</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <BottomNavigation userRole="entrepreneur" />
    </div>
  );
};

export default Forums;
