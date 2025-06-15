import { useNavigate } from "react-router-dom";
import { useNavigation } from "@/contexts/NavigationContext";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Edit, MessageCircle, Share2, MapPin, Calendar, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

type ProfileHeaderProps = {
  profile: any;
  isOwnProfile: boolean;
  isFollowing: boolean;
  followerCount: number;
  followingCount: number;
  businesses?: any[];
};

export const ProfileHeader = ({ profile, isOwnProfile, isFollowing, followerCount, followingCount }: ProfileHeaderProps) => {
  const navigate = useNavigate();
  const { canGoBack, goBack } = useNavigation();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const handleFollow = async () => {
    if (!user) return;
    const { error } = await supabase.from('followers').insert({
      follower_id: user.id,
      following_id: profile.id,
    });
    if (error) {
      toast.error("Error following user.", { description: error.message });
      throw error;
    }
  };

  const handleUnfollow = async () => {
    if (!user) return;
    const { error } = await supabase.from('followers').delete()
      .eq('follower_id', user.id)
      .eq('following_id', profile.id);
    if (error) {
      toast.error("Error unfollowing user.", { description: error.message });
      throw error;
    }
  };

  const followMutation = useMutation({
    mutationFn: handleFollow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', profile.id] });
      toast.success(`You are now following ${profile.full_name}.`);
    },
  });

  const unfollowMutation = useMutation({
    mutationFn: handleUnfollow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', profile.id] });
      toast.info(`You have unfollowed ${profile.full_name}.`);
    },
  });

  const onFollowToggle = () => {
    if (isFollowing) {
      unfollowMutation.mutate();
    } else {
      followMutation.mutate();
    }
  };

  const gradientClass = profile.role === 'investor'
    ? 'from-blue-500 to-indigo-600'
    : 'from-amber-500 to-orange-600';

  return (
    <div>
      <div className={`h-36 md:h-48 bg-gradient-to-r ${gradientClass} relative`}>
        {canGoBack && (
          <Button
            variant="ghost"
            size="icon"
            onClick={goBack}
            className="absolute top-4 left-4 bg-black/20 hover:bg-black/40 text-white rounded-full z-10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        )}
        {profile.cover_image_url && (
          <img src={profile.cover_image_url} alt="Cover" className="w-full h-full object-cover" />
        )}
      </div>
      <div className="p-4 bg-card border-b">
        <div className="flex justify-between items-start -mt-12 md:-mt-16">
          <Avatar className="w-20 h-20 md:w-24 md:h-24 border-4 border-card">
            <AvatarImage src={profile.profile_image_url} alt={profile.full_name} />
            <AvatarFallback className="text-2xl font-bold">
              {profile.full_name?.split(' ').map((n: string) => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex gap-2 pt-12 md:pt-16">
            {isOwnProfile ? (
              <Button variant="outline" onClick={() => navigate('/complete-profile')}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <>
                <Button variant="outline" size="icon"><MessageCircle className="w-4 h-4" /></Button>
                <Button onClick={onFollowToggle} disabled={followMutation.isPending || unfollowMutation.isPending}>
                  {isFollowing ? 'Following' : 'Follow'}
                </Button>
                <Button variant="ghost" size="icon"><Share2 className="w-4 h-4" /></Button>
              </>
            )}
          </div>
        </div>

        <div className="mt-4">
          <div className="space-y-3">
             <div>
                <h1 className="text-2xl font-bold">{profile.full_name}</h1>
                <p className="text-sm text-muted-foreground">@{profile.full_name?.toLowerCase().replace(/\s/g, '')}{/* A temporary username convention */}</p>
             </div>
             <div className="flex items-center gap-2">
                <Badge variant={profile.role === 'investor' ? 'default' : 'secondary'} className="capitalize">
                    <User className="w-3 h-3 mr-1" />
                    {profile.role}
                </Badge>
             </div>
             <p className="pt-2 text-foreground">{profile.bio}</p>
             <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{profile.location || 'Not specified'}</span>
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />Joined {new Date(profile.created_at || profile.updated_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
             </div>
             <div className="flex items-center gap-4 pt-2 text-sm">
                <span className="hover:underline cursor-pointer"><span className="font-bold text-foreground">{followingCount}</span> Following</span>
                <span className="hover:underline cursor-pointer"><span className="font-bold text-foreground">{followerCount}</span> Followers</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
