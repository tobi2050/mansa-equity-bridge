
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import EntrepreneurHeroSection from "./entrepreneur/EntrepreneurHeroSection";
import EntrepreneurTabs from "./entrepreneur/EntrepreneurTabs";
import { Skeleton } from "@/components/ui/skeleton";

interface EntrepreneurProfileContentProps {
  isOwnProfile?: boolean;
}

const EntrepreneurProfileContent = ({ isOwnProfile }: EntrepreneurProfileContentProps) => {
  const { user } = useAuth();

  // Fetch entrepreneur's businesses
  const { data: businesses, isLoading: loadingBusinesses } = useQuery({
    queryKey: ["entrepreneur-businesses", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("businesses")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (error) {
        console.error("Error fetching businesses:", error);
        return [];
      }
      return data || [];
    },
    enabled: !!user,
  });

  // Fetch trust/verification data from profiles table
  const { data: profile, isLoading: loadingProfile } = useQuery({
    queryKey: ["entrepreneur-profile", user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      if (error) {
        console.error("Error fetching profile:", error);
        return null;
      }
      return data;
    },
    enabled: !!user,
  });

  if (loadingProfile || loadingBusinesses) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-16 w-2/3" />
        <Skeleton className="h-56 w-full" />
      </div>
    );
  }

  if (!profile) {
    return <div className="p-4 text-gray-500">Could not load entrepreneur data.</div>;
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <EntrepreneurHeroSection profile={profile} businesses={businesses} isOwnProfile={isOwnProfile} />
      <EntrepreneurTabs
        profile={profile}
        businesses={businesses}
        isOwnProfile={isOwnProfile}
      />
    </div>
  );
};

export default EntrepreneurProfileContent;
