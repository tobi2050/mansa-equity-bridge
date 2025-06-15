import { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  MapPin, 
  Calendar, 
  Edit,
  Share2,
  MessageCircle,
  ArrowLeft,
  Home
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import InvestorProfile from "./InvestorProfile";

interface UserProfileProps {
  userRole: 'investor' | 'entrepreneur';
  isOwnProfile?: boolean;
}

const UserProfile = ({ userRole, isOwnProfile = false }: UserProfileProps) => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);
  
  const profileData = {
    name: "Adaora Okwu",
    role: userRole,
    location: "Lagos, Nigeria",
    joinDate: "January 2024",
    profileImage: null,
    bio: userRole === 'entrepreneur' 
      ? "Building the future of African agriculture through innovative farming solutions and sustainable practices."
      : "Passionate about supporting high-impact African businesses with sustainable growth potential, as an individual, NGO, or investment firm."
  };

  if (userRole === 'entrepreneur') {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Header with Navigation */}
        <div className="bg-white border-b px-4 py-4 sticky top-0 z-10">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
                <Home className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </div>
          </div>
        </div>

        {/* Profile Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <Avatar className="w-20 h-20 md:w-24 md:h-24 border-4 border-white">
                <AvatarFallback className="bg-white text-amber-600 text-2xl font-bold">
                  {profileData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-white">
                <h1 className="text-2xl md:text-3xl font-bold">{profileData.name}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-white/20 text-white border-white/30">
                    <User className="w-3 h-3 mr-1" />
                    Entrepreneur
                  </Badge>
                </div>
                <div className="flex items-center gap-4 mt-2 text-sm opacity-90">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {profileData.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Joined {profileData.joinDate}
                  </span>
                </div>
              </div>
              
              <div className="flex gap-2">
                {isOwnProfile ? (
                  <Button variant="secondary" className="bg-white text-amber-600 hover:bg-gray-50">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button 
                      variant="secondary" 
                      className="bg-white text-amber-600 hover:bg-gray-50"
                      onClick={() => setIsFollowing(!isFollowing)}
                    >
                      <User className="w-4 h-4 mr-2" />
                      {isFollowing ? 'Following' : 'Follow'}
                    </Button>
                    <Button variant="secondary" className="bg-white text-amber-600 hover:bg-gray-50">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                    <Button variant="ghost" className="text-white border-white hover:bg-white/10">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Entrepreneur Profile Content */}
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{profileData.bio}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // For investor profiles
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header with Navigation */}
      <div className="bg-white border-b px-4 py-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              <Home className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
          </div>
          <div className="flex items-center gap-2">
            {!isOwnProfile && (
              <>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsFollowing(!isFollowing)}
                >
                  <User className="w-4 h-4 mr-2" />
                  {isFollowing ? 'Following' : 'Follow'}
                </Button>
                <Button variant="outline" size="sm">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message
                </Button>
              </>
            )}
            {isOwnProfile && (
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Profile Header */}
      <div className='bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-8'>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <Avatar className="w-20 h-20 md:w-24 md:h-24 border-4 border-white">
              <AvatarFallback className="bg-white text-blue-600 text-2xl font-bold">
                {profileData.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-white">
              <h1 className="text-2xl md:text-3xl font-bold">{profileData.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge className="bg-white/20 text-white border-white/30">
                  <User className="w-3 h-3 mr-1" />
                  Investor
                </Badge>
              </div>
              <div className="flex items-center gap-4 mt-2 text-sm opacity-90">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {profileData.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Joined {profileData.joinDate}
                </span>
              </div>
              <p className="mt-3 text-sm opacity-90">{profileData.bio}</p>
            </div>
          </div>
        </div>
      </div>

      <InvestorProfile isOwnProfile={isOwnProfile} />
    </div>
  );
};

export default UserProfile;
