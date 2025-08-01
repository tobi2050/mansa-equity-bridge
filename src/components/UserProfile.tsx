
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { ProfileHeader } from "./profile/ProfileHeader";
import InvestorProfile from "./InvestorProfile";
import EntrepreneurProfileContent from "./profile/EntrepreneurProfileContent";
import { Skeleton } from "@/components/ui/skeleton";

const UserProfile = () => {
  const { userId: profileIdFromUrl } = useParams();
  const { user } = useAuth();
  
  const profileId = profileIdFromUrl || user?.id;
  const isOwnProfile = !profileIdFromUrl || profileIdFromUrl === user?.id;

  const { data: profileData, isLoading, isError } = useQuery({
    queryKey: ['profile', profileId],
    queryFn: async () => {
      if (!profileId) return null;

      // 1. Fetch profile details
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', profileId)
        .single();
      
      if (profileError) {
        console.error("Error fetching profile:", profileError);
        throw profileError;
      }

      // 2. Fetch follower and following counts
      const { count: followerCount, error: followerError } = await supabase
        .from('followers')
        .select('*', { count: 'exact', head: true })
        .eq('following_id', profileId);
      
      if (followerError) console.error("Error fetching follower count:", followerError);

      const { count: followingCount, error: followingError } = await supabase
        .from('followers')
        .select('*', { count: 'exact', head: true })
        .eq('follower_id', profileId);
      
      if (followingError) console.error("Error fetching following count:", followingError);

      // 3. Check if current user is following this profile
      let isFollowing = false;
      if (user && !isOwnProfile) {
        const { data: followingData, error: followingCheckError } = await supabase
          .from('followers')
          .select('follower_id', { count: 'exact' })
          .eq('follower_id', user.id)
          .eq('following_id', profileId);
        
        if (followingCheckError) console.error("Error checking follow status:", followingCheckError);
        
        if (followingData && followingData.length > 0) {
          isFollowing = true;
        }
      }

      // 4. Fetch businesses and calculate stats if entrepreneur
      let businesses: any[] = [];
      let aggregatedStats = {
        totalCurrentFunding: 0,
        totalFundingGoal: 0,
        totalMonthlyRevenue: 0,
        activeCampaigns: 0,
      };

      if (profile && profile.role === 'entrepreneur') {
        const { data: businessData, error: businessError } = await supabase
          .from('businesses')
          .select('*')
          .eq('user_id', profileId)
          .order('created_at', { ascending: false });

        if (businessError) {
          console.error("Error fetching businesses:", businessError);
        } else {
          businesses = businessData || [];
          // Calculate aggregated stats
          businesses.forEach(b => {
            aggregatedStats.totalCurrentFunding += b.current_funding || 0;
            aggregatedStats.totalFundingGoal += b.funding_goal || 0;
            aggregatedStats.totalMonthlyRevenue += b.monthly_revenue || 0;
            if ((b.funding_goal || 0) > 0 && (b.current_funding || 0) < b.funding_goal) {
              aggregatedStats.activeCampaigns += 1;
            }
          });
        }
      }
      
      return { 
        ...profile,
        followerCount: followerCount || 0,
        followingCount: followingCount || 0,
        isFollowing,
        businesses,
        aggregatedStats,
      };
    },
    enabled: !!profileId,
  });

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton className="h-48 w-full" />
        <div className="flex items-start -mt-16 ml-4">
            <Skeleton className="h-24 w-24 rounded-full" />
        </div>
        <div className="space-y-2 pt-2">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  if (isError || !profileData) {
    return <div className="p-6 text-center">Profile not found or there was an error loading it.</div>;
  }
  
  return (
    <div className="min-h-screen bg-background pb-20">
      <ProfileHeader
        profile={profileData}
        businesses={profileData.businesses}
        isOwnProfile={isOwnProfile}
        isFollowing={profileData.isFollowing}
        followerCount={profileData.followerCount}
        followingCount={profileData.followingCount}
      />

      <div className="px-4">
        {profileData.role === 'investor' ? (
          <InvestorProfile 
            isOwnProfile={isOwnProfile} 
            profile={profileData}
            isLoading={isLoading}
          />
        ) : (
          <EntrepreneurProfileContent 
            isOwnProfile={isOwnProfile} 
            profile={profileData} 
            businesses={profileData.businesses || []}
          />
        )}
      </div>
    </div>
  );
};

export default UserProfile;
