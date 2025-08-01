import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  MoreHorizontal,
  Image as ImageIcon,
  Send,
  TrendingUp,
  Users,
  Bookmark,
  ArrowLeft,
  Plus
} from "lucide-react";
import BottomNavigation from "./BottomNavigation";

interface HomeFeedProps {
  userRole: 'investor' | 'entrepreneur';
}

const HomeFeed = ({ userRole }: HomeFeedProps) => {
  const navigate = useNavigate();
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Adaora Okwu",
      role: "entrepreneur",
      time: "2 hours ago",
      content: "Excited to announce that EcoFarm Nigeria has successfully completed Milestone 3! 🌱 We've now partnered with 50+ local farmers and our organic certification is in progress. Thanks to all our amazing investors for believing in sustainable agriculture.",
      likes: 24,
      comments: 8,
      shares: 3,
      isLiked: false,
      hasImage: true
    },
    {
      id: 2,
      author: "Kwame Asante",
      role: "investor",
      time: "5 hours ago",
      content: "Looking for innovative fintech startups in West Africa. Particularly interested in mobile payment solutions and microfinance platforms. DM me if you're building something exciting! 💰",
      likes: 18,
      comments: 12,
      shares: 7,
      isLiked: true,
      hasImage: false
    }
  ]);

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked }
        : post
    ));
  };

  const handlePost = () => {
    if (newPost.trim()) {
      const newPostObj = {
        id: Date.now(),
        author: "You",
        role: userRole,
        time: "Just now",
        content: newPost,
        likes: 0,
        comments: 0,
        shares: 0,
        isLiked: false,
        hasImage: false
      };
      setPosts([newPostObj, ...posts]);
      setNewPost("");
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'investor': return 'bg-green-100 text-green-800';
      case 'entrepreneur': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleUserClick = (author: string) => {
    navigate(`/profile/${author.toLowerCase().replace(' ', '-')}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header with Navigation */}
      <div className="bg-white border-b px-4 py-4 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Home Feed</h1>
              <p className="text-sm text-gray-600">Stay updated with your network</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(userRole === 'entrepreneur' ? '/entrepreneur-create' : '/create-post')}
            >
              <Plus className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigate('/profile')}>
              <Users className="w-4 h-4 mr-2" />
              Profile
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Create Post */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Share an update</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback>YU</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder={`What's happening with your ${userRole === 'entrepreneur' ? 'business' : 'investments'}?`}
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm">
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Photo
                </Button>
                <Button variant="ghost" size="sm">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Business Update
                </Button>
              </div>
              <Button 
                onClick={handlePost}
                disabled={!newPost.trim()}
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
              >
                <Send className="w-4 h-4 mr-2" />
                Post
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Trending Topics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Trending in African Business
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {['#AgriTech', '#SolarEnergy', '#FinTech', '#ECommerce', '#CleanWater', '#Education'].map((tag) => (
                <Badge key={tag} variant="outline" className="hover:bg-amber-50 cursor-pointer">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Posts Feed */}
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                {/* Post Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar 
                      className="w-10 h-10 cursor-pointer hover:ring-2 hover:ring-amber-500" 
                      onClick={() => handleUserClick(post.author)}
                    >
                      <AvatarFallback>
                        {post.author.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p 
                        className="font-medium text-gray-900 cursor-pointer hover:text-amber-600" 
                        onClick={() => handleUserClick(post.author)}
                      >
                        {post.author}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge className={getRoleColor(post.role)} variant="secondary">
                          {post.role}
                        </Badge>
                        <span className="text-xs text-gray-500">{post.time}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>

                {/* Post Content */}
                <p className="text-gray-800 mb-4 leading-relaxed">{post.content}</p>

                {/* Post Image Placeholder */}
                {post.hasImage && (
                  <div className="w-full h-48 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg mb-4 flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-amber-400" />
                  </div>
                )}

                {/* Post Actions */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex space-x-4">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleLike(post.id)}
                      className={post.isLiked ? "text-red-500" : ""}
                    >
                      <Heart className={`w-4 h-4 mr-1 ${post.isLiked ? 'fill-current' : ''}`} />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      {post.comments}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="w-4 h-4 mr-1" />
                      {post.shares}
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Bookmark className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center py-8">
          <Button variant="outline">Load More Posts</Button>
        </div>
      </div>

      {/* Bottom navigation for mobile */}
      <BottomNavigation userRole={userRole} />
    </div>
  );
};

export default HomeFeed;
