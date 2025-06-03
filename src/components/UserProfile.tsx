
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  MapPin, 
  Calendar, 
  TrendingUp, 
  Building2, 
  DollarSign,
  Users,
  Edit,
  Share2,
  MessageCircle,
  Star,
  ArrowLeft,
  Home
} from "lucide-react";

interface UserProfileProps {
  userRole: 'investor' | 'entrepreneur' | 'philanthropist';
  isOwnProfile?: boolean;
}

const UserProfile = ({ userRole, isOwnProfile = false }: UserProfileProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(userRole === 'investor' ? "overview" : "activity");
  const [isFollowing, setIsFollowing] = useState(false);

  const profileData = {
    name: "Adaora Okwu",
    role: userRole,
    location: "Lagos, Nigeria",
    joinDate: "January 2024",
    profileImage: null,
    bio: userRole === 'entrepreneur' 
      ? "Building the future of African agriculture through innovative farming solutions and sustainable practices."
      : "Passionate about supporting African entrepreneurs and building a stronger economic future for the continent.",
    completionPercentage: userRole === 'entrepreneur' ? 85 : 92,
    stats: userRole === 'entrepreneur' 
      ? {
          businessesLaunched: 3,
          totalFunding: "$45,000",
          investorsPartnered: 12,
          successfulMilestones: 8
        }
      : {
          totalInvested: "$125,000",
          businessesSupported: 18,
          activeInvestments: 7,
          portfolioValue: "$156,000"
        }
  };

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
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate('/feed')}>
              <TrendingUp className="w-4 h-4 mr-2" />
              Feed
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
                  {profileData.role.charAt(0).toUpperCase() + profileData.role.slice(1)}
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
                    <Users className="w-4 h-4 mr-2" />
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

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto px-4 -mt-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-4 bg-white border">
            {userRole === 'investor' && <TabsTrigger value="overview">Overview</TabsTrigger>}
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="portfolio">{userRole === 'entrepreneur' ? 'Businesses' : 'Investments'}</TabsTrigger>
            <TabsTrigger value="reviews" className="hidden md:block">Reviews</TabsTrigger>
          </TabsList>

          <div className="mt-6 space-y-6">
            {userRole === 'investor' && (
              <TabsContent value="overview" className="space-y-6">
                {/* Profile Completion */}
                {isOwnProfile && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        Profile Completion
                        <span className="text-sm font-normal">{profileData.completionPercentage}%</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Progress value={profileData.completionPercentage} className="mb-2" />
                      <p className="text-sm text-gray-600">
                        {profileData.completionPercentage < 80 
                          ? "Complete your profile to unlock all features" 
                          : "Great! Your profile is ready for business"}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(profileData.stats).map(([key, value]) => (
                    <Card key={key}>
                      <CardContent className="pt-6 text-center">
                        <div className="text-2xl font-bold text-amber-600">{value}</div>
                        <div className="text-xs text-gray-600 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Bio */}
                <Card>
                  <CardHeader>
                    <CardTitle>About</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{profileData.bio}</p>
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            <TabsContent value="activity" className="space-y-4">
              {/* Show stats for non-investor profiles */}
              {userRole !== 'investor' && (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(profileData.stats).map(([key, value]) => (
                      <Card key={key}>
                        <CardContent className="pt-6 text-center">
                          <div className="text-2xl font-bold text-amber-600">{value}</div>
                          <div className="text-xs text-gray-600 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>About</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{profileData.bio}</p>
                    </CardContent>
                  </Card>
                </>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-start space-x-3 pb-4 border-b last:border-b-0">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {userRole === 'entrepreneur' 
                            ? "Posted new milestone update for EcoFarm Project"
                            : "Invested in AgriTech Solutions"
                          }
                        </p>
                        <p className="text-xs text-gray-500">{i} days ago</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="portfolio" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {userRole === 'entrepreneur' ? 'My Businesses' : 'My Investments'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">
                            {userRole === 'entrepreneur' ? 'EcoFarm Nigeria' : 'TechStart Africa'}
                          </h4>
                          <Badge variant="outline" className="text-green-600">Active</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {userRole === 'entrepreneur' 
                            ? 'Sustainable agriculture solutions'
                            : '$5,000 invested • 8% equity'
                          }
                        </p>
                        <Progress value={65} className="h-2" />
                        <p className="text-xs text-gray-500 mt-1">
                          {userRole === 'entrepreneur' ? 'Milestone 3/5' : '65% milestone progress'}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Reviews & Ratings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">4.8/5 (24 reviews)</span>
                  </div>
                  
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="border-b pb-4 last:border-b-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">John Doe</p>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="w-3 h-3 fill-amber-400 text-amber-400" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">
                          {userRole === 'entrepreneur' 
                            ? "Great communication and delivered on all milestones as promised."
                            : "Professional investor with clear expectations and fair terms."
                          }
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfile;
